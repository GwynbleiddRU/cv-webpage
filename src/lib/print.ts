import html2pdf from 'html2pdf.js';

interface PrintOptions {
  content: () => HTMLElement | null;
  documentTitle?: string;
}

// Moves every element that a page break would cut onto the next page, like html2pdf's
// "avoid-all" mode, except that a `.cv-pdf-split` container may break between its children
// and a heading moves together with the block that follows it. Every page after the first
// starts with a copy of `pageHeader`.
const paginate = (root: HTMLElement, pageHeight: number, pageHeader: Element | null) => {
  const origin = root.getBoundingClientRect().top;
  const topOf = (el: Element) => el.getBoundingClientRect().top - origin;
  const firstBlock = (el: Element | null) => {
    while (el?.classList.contains('cv-pdf-split')) el = el.firstElementChild;
    return el;
  };

  // Header copies are wrapped in flow-root blocks so their margins count towards their height.
  const headerBlock = () => {
    const block = document.createElement('div');
    block.style.display = 'flow-root';
    if (pageHeader) block.append(pageHeader.cloneNode(true));
    return block;
  };
  const probe = root.appendChild(headerBlock());
  const contentHeight = pageHeight - probe.getBoundingClientRect().height;
  probe.remove();

  // Inserts a block before `el` that ends the current page and puts the header at the top of `page`.
  // Maps each page to its header's page-number slot; the first page has no header.
  const pagesWithHeader = new Map<number, Element | null>([[0, null]]);
  const startPage = (el: Element, page: number) => {
    const block = headerBlock();
    block.style.marginTop = '0';
    block.style.marginBottom = `-${getComputedStyle(el).marginTop}`;  // Same gap below the header on every page
    el.before(block);
    const gap = page * pageHeight - topOf(block);
    if (gap >= 0) block.style.paddingTop = `${gap}px`;
    else block.style.marginTop = `${gap}px`;  // Only blank margin lies between the page break and `el`
    pagesWithHeader.set(page, block.querySelector('.cv-pdf-page-number'));
  };

  root.querySelectorAll('*').forEach(el => {
    const page = Math.floor(topOf(el) / pageHeight);
    if (!pagesWithHeader.has(page)) startPage(el, page);
    if (el.classList.contains('cv-pdf-split')) return;

    const end = (/^H[1-6]$/.test(el.tagName) && firstBlock(el.nextElementSibling)) || el;
    const top = topOf(el);
    const bottom = end.getBoundingClientRect().bottom - origin;
    if (Math.floor(top / pageHeight) !== Math.floor(bottom / pageHeight) && bottom - top <= contentHeight) {
      startPage(el, Math.floor(top / pageHeight) + 1);
    }
  });

  // Counted the way html2pdf counts the pages it slices from the rendered canvas
  const pageCount = Math.ceil(Math.ceil(root.getBoundingClientRect().height) / pageHeight);
  pagesWithHeader.forEach((slot, page) => {
    if (slot) slot.textContent = `${page + 1} / ${pageCount}`;
  });
};

export const useReactToPrint = (options: PrintOptions) => {
  const { content, documentTitle = 'Document' } = options;

  const handlePrint = () => {
    const contentElement = content();
    if (!contentElement) {
      console.error("Content to print is not available");
      return;
    }

    const opt = {
        margin: [10, 10, 10, 10],  // Page margin (top, left, bottom, right)
        filename: `${documentTitle}.pdf`,
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
        pagebreak: { mode: [] }  // Page breaks are placed by paginate()
    };

    const clonedElement = contentElement.cloneNode(true) as HTMLElement;
    clonedElement.style.paddingBottom = '0';
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

    html2pdf()
      .from(clonedElement)
      .set(opt)
      .toContainer()
      .then(function () {
        // Page height as html2pdf slices the canvas in toPdf(), converted back to CSS pixels
        const { scale } = this.opt.html2canvas;
        const canvasWidth = Math.floor(Math.ceil(this.prop.container.getBoundingClientRect().width) * scale);
        const pageHeight = Math.floor(canvasWidth * this.prop.pageSize.inner.ratio) / scale;
        paginate(this.prop.container, pageHeight, pageHeader);
      })
      .save();
  };

  return handlePrint;
};
