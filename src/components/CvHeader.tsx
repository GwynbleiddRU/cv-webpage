
import { Mail, Phone, Github, Globe } from "lucide-react";

const CvHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 print:gap-2">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 print:text-xl">Georgiy Nosachev</h1>
        <h2 className="text-xl font-semibold text-blue-700 mt-1 print:text-base print:mt-0">Fullstack Developer</h2>
      </div>
      
      <div className="flex flex-col gap-2 print:gap-1 items-start">

        <div className="flex items-center">
          <Globe className="h-4 w-4 text-gray-500 print:h-3 print:w-3 mt-0 min-w-[16px]" />
          <a href="https://gwynbleiddru.github.io/portfolio/" className="text-sm text-gray-700 hover:text-blue-600 print:text-xs ml-2">
            portfolio website
          </a>
        </div>

        <div className="flex items-center">
          <Phone className="h-4 w-4 text-gray-500 print:h-3 print:w-3 mt-0 min-w-[16px]" />
          <a href="tel:+79991250666" className="text-sm text-gray-700 hover:text-blue-600 print:text-xs ml-2">
            +7 (999) 125-06-66
          </a>
        </div>
        
        <div className="flex items-center">
          <Mail className="h-4 w-4 text-gray-500 print:h-3 print:w-3 mt-0 min-w-[16px]" />
          <a href="mailto:nosachev.george@mail.ru" className="text-sm text-gray-700 hover:text-blue-600 print:text-xs ml-2">
            nosachev.george@mail.ru
          </a>
        </div>
        
        {/* <div className="flex items-center">
          <Github className="h-4 w-4 text-gray-500 print:h-3 print:w-3 mt-0 min-w-[16px]" />
          <a 
            href="https://github.com/GwynbleiddRU" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-700 hover:text-blue-600 print:text-xs ml-2"
          >
            github.com/GwynbleiddRU
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default CvHeader;
