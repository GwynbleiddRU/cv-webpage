import html2pdf from 'html2pdf.js';
import { loadOverlayFont, readOverlay, writeOverlay, type Overlay, type PageMapping } from '@/lib/pdfOverlay';

// `full` is the CV as on the site. `compact` drops `.cv-full-only` elements, shows the
// `.cv-compact-only` ones (hidden on the site) and turns on the `dense:` styles.
export type PdfVariant = 'full' | 'compact';

// A horizontal <Separator /> between sections
const DIVIDER = '[role="none"][data-orientation="horizontal"]';

// Moves every element that a page break would cut onto the next page, like html2pdf's
// "avoid-all" mode, except that a `.cv-pdf-split` container may break between its children,
// a heading or `.cv-pdf-keep` element moves together with the block that follows it, and a
// `.cv-pdf-keep-prev` element never starts a page without the block before it.
// Every page after the first starts with a copy of `pageHeader`, which also replaces a
// divider that would open the page.
const paginate = (root: HTMLElement, pageHeight: number, pageHeader: Element | null) => {
  const origin = root.getBoundingClientRect().top;
  const topOf = (el: Element) => el.getBoundingClientRect().top - origin;
  const pageOf = (y: number) => Math.floor(y / pageHeight);
  const firstBlock = (el: Element | null) => {
    while (el?.classList.contains('cv-pdf-split')) el = el.firstElementChild;
    return el;
  };
  // The last element that must stay on the same page as `el`, following chains of kept blocks
  const keptUntil = (el: Element): Element => {
    const next = (/^H[1-6]$/.test(el.tagName) || el.classList.contains('cv-pdf-keep')) && firstBlock(el.nextElementSibling);
    return next ? keptUntil(next) : el;
  };
  // The unbreakable block right before `el`, looking out of and into split containers;
  // null when `el` opens the CV or follows a page header
  const blockBefore = (el: Element): Element | null => {
    let node = el;
    while (!node.previousElementSibling) {
      node = node.parentElement;
      if (!node?.classList.contains('cv-pdf-split')) return null;
    }
    let prev = node.previousElementSibling;
    while (prev.classList.contains('cv-pdf-split') && prev.lastElementChild) prev = prev.lastElementChild;
    return prev.classList.contains('cv-pdf-page-start') ? null : prev;
  };
  // The first block of the kept chain that ends with `el`
  const keptFrom = (el: Element) => {
    let start = el;
    for (let prev = blockBefore(start); prev; prev = blockBefore(start)) {
      const end = keptUntil(prev);
      if (end !== start && !(start.compareDocumentPosition(end) & Node.DOCUMENT_POSITION_FOLLOWING)) break;
      start = prev;
    }
    return start;
  };

  // Header copies are wrapped in flow-root blocks so their margins count towards their height.
  const headerBlock = () => {
    const block = document.createElement('div');
    block.className = 'cv-pdf-page-start';
    block.style.display = 'flow-root';
    if (pageHeader) block.append(pageHeader.cloneNode(true));
    return block;
  };
  // Measured inside the CV element, so the variant's styles apply to it
  const cv = root.firstElementChild ?? root;
  const probe = cv.appendChild(headerBlock());
  const contentHeight = pageHeight - probe.getBoundingClientRect().height;
  probe.remove();

  // The CV's content box: page headers span it even when inserted into an indented container
  const cvBox = cv.getBoundingClientRect();
  const cvStyle = getComputedStyle(cv);
  const contentLeft = cvBox.left + parseFloat(cvStyle.borderLeftWidth) + parseFloat(cvStyle.paddingLeft);
  const contentRight = cvBox.right - parseFloat(cvStyle.borderRightWidth) - parseFloat(cvStyle.paddingRight);

  // Inserts a block before `el` that ends the current page and puts the header at the top of `page`.
  // Maps each page to its header's page-number slot; the first page has no header.
  const pagesWithHeader = new Map<number, Element | null>([[0, null]]);
  const startPage = (el: Element, page: number) => {
    const block = headerBlock();
    block.style.marginTop = '0';
    block.style.marginBottom = `-${getComputedStyle(el).marginTop}`;  // Same gap below the header on every page
    if (/grid/.test(getComputedStyle(el.parentElement).display)) block.style.gridColumn = '1 / -1';  // A row of its own
    el.before(block);
    const { left, right } = block.getBoundingClientRect();
    block.style.marginLeft = `${contentLeft - left}px`;
    block.style.marginRight = `${right - contentRight}px`;
    const gap = page * pageHeight - topOf(block);
    if (gap >= 0) block.style.paddingTop = `${gap}px`;
    else block.style.marginTop = `${gap}px`;  // Only blank margin lies between the page break and `el`
    pagesWithHeader.set(page, block.querySelector('.cv-pdf-page-number'));
  };

  const bottomOf = (el: Element) =>
    Math.max(el.getBoundingClientRect().bottom, keptUntil(el).getBoundingClientRect().bottom) - origin;

  root.querySelectorAll('*').forEach(el => {
    const page = pageOf(topOf(el));
    const opensPage = !pagesWithHeader.has(page) ||
      pageOf(el.getBoundingClientRect().bottom - origin) !== page;
    if (opensPage && el.matches(DIVIDER)) {
      el.remove();
      return;
    }

    // Would `el` end on a later page than the block before it? Then that block, with
    // everything kept with it, goes to the next page as well.
    const before = el.classList.contains('cv-pdf-keep-prev') && blockBefore(el);
    if (before && pageOf(bottomOf(el)) !== pageOf(topOf(before))) {
      const start = keptFrom(before);
      const startPageIndex = pageOf(topOf(start));
      if (startPageIndex === pageOf(topOf(before)) && bottomOf(el) - topOf(start) <= contentHeight) {
        startPage(start, startPageIndex + 1);
      }
    }

    const elPage = pageOf(topOf(el));
    if (!pagesWithHeader.has(elPage)) startPage(el, elPage);
    if (el.classList.contains('cv-pdf-split')) return;

    const top = topOf(el);
    const bottom = bottomOf(el);
    if (pageOf(top) !== pageOf(bottom) && bottom - top <= contentHeight) {
      startPage(el, pageOf(top) + 1);
    }
  });

  // Counted the way html2pdf counts the pages it slices from the rendered canvas
  const pageCount = Math.ceil(Math.ceil(root.getBoundingClientRect().height) / pageHeight);
  pagesWithHeader.forEach((slot, page) => {
    if (slot) slot.textContent = `${page + 1} / ${pageCount}`;
  });
};

// Saves the CV in `source` as an A4 PDF called `<fileName>.pdf`
export const exportPdf = (source: HTMLElement, variant: PdfVariant, fileName: string) => {
  const opt = {
      margin: [10, 10, 10, 10],  // Page margin (top, left, bottom, right)
      filename: `${fileName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,  // Higher scale for better image quality
        useCORS: true,
        letterRendering: true,
        logging: false
      },
      jsPDF: { 
        unit: 'mm', 
        format: [210, 297],  // A4 size in mm: width: 210mm, height: 297mm
        orientation: 'portrait',  // Portrait orientation
      },
      pagebreak: { mode: [] },  // Page breaks are placed by paginate()
      enableLinks: false  // Links are added by writeOverlay(), from the layout after paginate()
  };

  const clonedElement = source.cloneNode(true) as HTMLElement;
  clonedElement.style.paddingBottom = '0';
  if (variant === 'compact') {
    clonedElement.classList.add('cv-dense');
    clonedElement.querySelectorAll('.cv-full-only').forEach(el => el.remove());
    clonedElement.querySelectorAll('.cv-compact-only').forEach(el => el.classList.remove('hidden'));
  } else {
    clonedElement.querySelectorAll('.cv-compact-only').forEach(el => el.remove());
  }
  clonedElement.querySelectorAll('.cv-project-card').forEach((el, index) => {
    if (index >= 4) el.remove();
  });

  // Force desktop layout for PDF rendering
  clonedElement.querySelectorAll('.cv-header').forEach(el => {
    el.classList.remove('flex-col', 'items-center');
    el.classList.add('flex-row', 'items-start', 'justify-between');
  });

  clonedElement.querySelectorAll('.cv-header .gap-4').forEach(el => {
    el.classList.remove('gap-4');
    el.classList.add('gap-[1rem]');
  });

  const pageHeader = clonedElement.querySelector('.cv-pdf-page-header');
  pageHeader?.remove();
  pageHeader?.classList.remove('hidden');

  const font = loadOverlayFont();
  let overlay: Overlay;
  let mapping: PageMapping;

  html2pdf()
    .from(clonedElement)
    .set(opt)
    .toContainer()
    .then(function () {
      // Page size as html2pdf slices the canvas in toPdf(), converted back to CSS pixels
      const { scale } = this.opt.html2canvas;
      const canvasWidth = Math.floor(Math.ceil(this.prop.container.getBoundingClientRect().width) * scale);
      const pageHeight = Math.floor(canvasWidth * this.prop.pageSize.inner.ratio) / scale;
      paginate(this.prop.container, pageHeight, pageHeader);

      overlay = readOverlay(this.prop.container, pageHeight);
      mapping = {
        mmPerPx: this.prop.pageSize.inner.width / (canvasWidth / scale),
        marginLeft: this.opt.margin[1],
        marginTop: this.opt.margin[0],
      };
    })
    .toPdf()
    .then(async function () {
      writeOverlay(this.prop.pdf, overlay, mapping, await font);
    })
    .save();
};
