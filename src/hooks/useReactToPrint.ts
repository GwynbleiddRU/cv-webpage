
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
      margin: [10, 10, 10, 10],
      filename: `${documentTitle}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
        logging: false
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Clone the element to avoid modifying the original DOM
    const clonedElement = contentElement.cloneNode(true) as HTMLElement;
    
    // Apply specific styles for PDF export
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @media print {
        body { margin: 0; padding: 0; }
        
        /* Grid layouts for PDF */
        .grid { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
        .grid-cols-1 { display: grid !important; }
        .grid-cols-2 { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
        .sm\\:grid-cols-2 { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
        
        /* Fix spacing for contact info */
        .flex.items-center { display: flex !important; align-items: center !important; }
        .h-4.w-4 { height: 16px !important; width: 16px !important; margin-top: 0 !important; }
        .ml-2 { margin-left: 8px !important; }
        
        /* Skill bars */
        .space-x-1 > * + * { margin-left: 4px !important; }
        .bg-blue-600 { background-color: #2563eb !important; }
        .bg-gray-200 { background-color: #e5e7eb !important; }
        .text-blue-700 { color: #1d4ed8 !important; }
        .rounded-sm { border-radius: 0.125rem !important; }
        .h-2 { height: 0.5rem !important; }
        .w-6 { width: 1.5rem !important; }
      }
    `;
    clonedElement.appendChild(styleElement);
    
    html2pdf().from(clonedElement).set(opt).save();
  };

  return handlePrint;
};
