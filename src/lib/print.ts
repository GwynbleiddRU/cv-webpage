import html2pdf from 'html2pdf.js';

interface PrintOptions {
  content: () => HTMLElement | null;
  documentTitle?: string;
}

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
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    const clonedElement = contentElement.cloneNode(true) as HTMLElement;

    // Force desktop layout for PDF rendering
    clonedElement.querySelectorAll('.cv-header').forEach(el => {
      el.classList.remove('flex-col', 'items-center');
      el.classList.add('flex-row', 'items-start', 'justify-between');
    });

    clonedElement.querySelectorAll('.cv-header .gap-4').forEach(el => {
      el.classList.remove('gap-4');
      el.classList.add('gap-[1rem]');
    });

    html2pdf().from(clonedElement).set(opt).save();
  };

  return handlePrint;
};
