import { useTranslation } from "react-i18next";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";

const ProjectsSection = () => {
  const { t } = useTranslation();
  
  return (
    <div className="print:break-inside-avoid">
      <h3 className="text-xl font-semibold text-gray-800 mb-3 print:text-base">
        {t("projects.sectionTitle")}
      </h3>
      
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 print:gap-2"
        style={{
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "0.5rem"
        }}
      >
        <a href="https://github.com/TuneLike/tunelike-api" target="_blank" rel="noopener noreferrer" className={cn(
          "border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm">
            {t("projects.tuneLike.title")}
          </h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0">
            {t("projects.tuneLike.subtitle")}
          </p>
          <p className="text-gray-700 text-sm print:text-xs">
            {t("projects.tuneLike.description")}
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px]">
            {t("projects.tuneLike.technologies")}
          </p>
        </a>

        <a href="https://github.com/GwynbleiddRU/api-moducart" target="_blank" rel="noopener noreferrer" className={cn(
          "border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm">
            {t("projects.moduCart.title")}
          </h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0">
            {t("projects.moduCart.subtitle")}
          </p>
          <p className="text-gray-700 text-sm print:text-xs">
            {t("projects.moduCart.description")}
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px]">
            {t("projects.moduCart.technologies")}
          </p>
        </a>
        
        <div className={cn(
          "border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm">
            {t("projects.playlistEngine.title")}
          </h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0">
            {t("projects.playlistEngine.subtitle")}
          </p>
          <p className="text-gray-700 text-sm print:text-xs">
            {t("projects.playlistEngine.description")}
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px]">
            {t("projects.playlistEngine.technologies")}
          </p>
        </div>
        
        <a href="https://github.com/GwynbleiddRU/Nodes" target="_blank" rel="noopener noreferrer" className={cn(
          "border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm">
            {t("projects.diagramEditor.title")}
          </h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0">
            {t("projects.diagramEditor.subtitle")}
          </p>
          <p className="text-gray-700 text-sm print:text-xs">
            {t("projects.diagramEditor.description")}
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px]">
            {t("projects.diagramEditor.technologies")}
          </p>
        </a>
        
        <a href="https://github.com/GwynbleiddRU/3DStruct" target="_blank" rel="noopener noreferrer" className={cn(
          "border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm">
            {t("projects.graphicsEditor.title")}
          </h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0">
            {t("projects.graphicsEditor.subtitle")}
          </p>
          <p className="text-gray-700 text-sm print:text-xs">
            {t("projects.graphicsEditor.description")}
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px]">
            {t("projects.graphicsEditor.technologies")}
          </p>
        </a>
        
        <a href="https://www.youtube.com/watch?v=VNeDhh1Ge9U" target="_blank" rel="noopener noreferrer" className={cn(
          "border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm">
            {t("projects.manufacturingSystem.title")}
          </h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0">
            {t("projects.manufacturingSystem.subtitle")}
          </p>
          <p className="text-gray-700 text-sm print:text-xs">
            {t("projects.manufacturingSystem.description")}
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px]">
            {t("projects.manufacturingSystem.technologies")}
          </p>
        </a>
      </div>
      
      <div className="mt-4 print:mt-2 text-center">
        <p className="text-gray-700 text-sm print:text-xs">
          {t("projects.githubInfo")}
        </p>
        <a 
          href="https://github.com/GwynbleiddRU" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center mt-1"
        >
          <Github className="h-4 w-4 mr-1 print:h-3 print:w-3" />
          <span className="print:text-xs">github.com/GwynbleiddRU</span>
        </a>
      </div>
    </div>
  );
};

export default ProjectsSection;