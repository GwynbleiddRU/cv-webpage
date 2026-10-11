import type { jsPDF } from 'jspdf';
import fontUrl from '@/assets/fonts/NotoSans-Regular-subset.ttf?url';

// html2pdf turns the CV into page images, so on its own the PDF has no text for recruiting
// software, search or copy-paste. The overlay puts the same text over the images as an invisible
// layer, the way searchable scans do, and adds the links, both taken from the final page layout.

// Positions are in CSS px from the top-left corner of the page's content area.
interface TextRun { page: number; x: number; baseline: number; width: number; fontSize: number; text: string }
interface LinkArea { page: number; x: number; y: number; width: number; height: number; url: string }
export interface Overlay { runs: TextRun[]; links: LinkArea[] }

// Maps the CSS px of the rendered container onto the PDF page, in mm.
export interface PageMapping { mmPerPx: number; marginLeft: number; marginTop: number }

const FONT_FILE = 'NotoSans-Regular-subset.ttf';
const FONT_NAME = 'NotoSansOverlay';

// Noto Sans has no arrows, so the text layer spells them in ASCII and they still extract
const asciiArrows = (text: string) => text.replace(/→/g, '->').replace(/←/g, '<-');

// Fonts are read as binary strings, which jsPDF recognises by the TrueType signature.
export const loadOverlayFont = async () => {
  const response = await fetch(fontUrl);
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${fontUrl}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  return Array.from(bytes, byte => String.fromCharCode(byte)).join('');
};

const blockOf = (el: Element) => {
  while (el.parentElement && /^(inline|contents)$/.test(getComputedStyle(el).display)) el = el.parentElement;
  return el;
};

// Joins the words of each line into one run per block and font size, in document order, which is
// the order PDF text extraction (and so a recruiting system) reads them in. The items of a
// `[data-pdf-list]` element (such as tags) are read as one comma-separated list, a run per line.
export const readOverlay = (root: HTMLElement, pageHeight: number): Overlay => {
  const origin = root.getBoundingClientRect();
  // Text boxes can stick out of their line box, so the page is picked by the box's middle
  const place = (rect: DOMRect) => {
    const top = rect.top - origin.top;
    const page = Math.floor((top + rect.height / 2) / pageHeight);
    return { page, x: rect.left - origin.left, top: top - page * pageHeight, bottom: rect.bottom - origin.top - page * pageHeight };
  };

  const runs: (TextRun & { block: Element; top: number; item?: Element })[] = [];
  const range = document.createRange();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  // Whether the text has white space between the last word read and the next one. Words also get a
  // space when they are visibly apart (such as a number and its margin), but that gap alone misses
  // many real spaces in Safari, whose system font has narrow ones.
  let spaced = false;
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const style = getComputedStyle(node.parentElement);
    if (style.visibility !== 'visible') continue;
    const fontSize = parseFloat(style.fontSize);
    const list = node.parentElement.closest('[data-pdf-list]');
    const block = list ?? blockOf(node.parentElement);
    const item = list && Array.from(list.children).find(child => child.contains(node));

    for (const token of node.textContent.matchAll(/\s+|\S+/g)) {
      const word = token[0];
      if (/^\s/.test(word)) {
        spaced = true;
        continue;
      }
      range.setStart(node, token.index);
      range.setEnd(node, token.index + word.length);
      const rect = range.getClientRects()[0];
      if (!rect?.width) continue;
      const { page, x, top, bottom } = place(rect);
      const run = runs.at(-1);
      const sameBlock = run && run.block === block;
      const sameLine = sameBlock && run.fontSize === fontSize && run.page === page &&
        Math.abs(run.top - top) < fontSize / 2 && x >= run.x + run.width - 1;
      const nextItem = sameBlock && list && run.item !== item;
      if (sameLine) {
        const apart = spaced || x - (run.x + run.width) > fontSize * 0.15;
        run.text += (nextItem ? ', ' : apart ? ' ' : '') + word;
        run.width = x + rect.width - run.x;
      } else {
        if (nextItem) run.text += ',';  // The list goes on in the next line
        // UI fonts put the baseline about 0.24em above the bottom of the text box
        runs.push({ page, x, baseline: bottom - fontSize * 0.24, width: rect.width, fontSize, text: word, block, top, item });
      }
      if (item) runs.at(-1).item = item;
      spaced = false;
    }
  }

  const links = Array.from(root.querySelectorAll<HTMLAnchorElement>('a[href]'), link =>
    Array.from(link.getClientRects(), rect => {
      const { page, x, top } = place(rect);
      return { page, x, y: top, width: rect.width, height: rect.height, url: link.href };
    })
  ).flat();

  return { runs, links };
};

// Writes the text layer (skipped when `font` is null) and the links
export const writeOverlay = (pdf: jsPDF, { runs, links }: Overlay, map: PageMapping, font: string | null) => {
  const pageCount = pdf.getNumberOfPages();
  const toPage = (page: number) => {
    if (page >= pageCount) return false;
    pdf.setPage(page + 1);
    return true;
  };
  const mm = (px: number) => px * map.mmPerPx;

  if (font) {
    pdf.addFileToVFS(FONT_FILE, font);
    pdf.addFont(FONT_FILE, FONT_NAME, 'normal');
    pdf.setFont(FONT_NAME, 'normal');
  }
  for (const run of font ? runs : []) {
    if (!toPage(run.page)) continue;
    const text = asciiArrows(run.text);
    pdf.setFontSize(mm(run.fontSize) * 72 / 25.4);
    pdf.text(text, map.marginLeft + mm(run.x), map.marginTop + mm(run.baseline), {
      renderingMode: 'invisible',
      horizontalScale: mm(run.width) / pdf.getTextWidth(text),  // Spans the same width as the visible text
    });
  }

  for (const link of links) {
    if (!toPage(link.page)) continue;
    pdf.link(map.marginLeft + mm(link.x), map.marginTop + mm(link.y), mm(link.width), mm(link.height), { url: link.url });
  }
  pdf.setPage(pageCount);
};
