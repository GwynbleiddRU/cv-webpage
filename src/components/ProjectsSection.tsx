import { useTranslation } from "react-i18next";
import { ArrowUpRight, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const ProjectsSection = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  
  return (
    <div className={cn("print:break-inside-avoid", className)}>
      <h3 className="text-xl font-bold text-gray-800 mb-3 print:text-base dense:text-[17px] dense:leading-6 dense:mb-2">
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
        <a href="https://github.com/GwynbleiddRU/teach-studio" target="_blank" rel="noopener noreferrer" className={cn(
          "cv-project-card border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow dense:flex dense:flex-col dense:px-3 dense:py-2.5",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm dense:text-[14.5px] dense:font-semibold dense:leading-5">
            {t("projects.teachStudio.title")}
            <ArrowUpRight className="hidden dense:ml-0.5 dense:inline-block dense:h-3.5 dense:w-3.5 dense:align-[-2px] dense:text-gray-400" aria-hidden="true" />
          </h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0 dense:text-[12.5px] dense:leading-[18px] dense:text-gray-500">
            {t("projects.teachStudio.subtitle")}
          </p>
          <p className="text-gray-700 text-sm print:text-xs dense:text-[13px] dense:leading-[19px]">
            {t("projects.teachStudio.description")}
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px] dense:mt-auto dense:pt-1.5">
            {t("projects.teachStudio.technologies")}
          </p>
        </a>

        <a href="https://chem-school.ru" target="_blank" rel="noopener noreferrer" className={cn(
          "cv-project-card border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow dense:flex dense:flex-col dense:px-3 dense:py-2.5",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm dense:text-[14.5px] dense:font-semibold dense:leading-5">
            {t("projects.chemSchool.title")}
            <ArrowUpRight className="hidden dense:ml-0.5 dense:inline-block dense:h-3.5 dense:w-3.5 dense:align-[-2px] dense:text-gray-400" aria-hidden="true" />
          </h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0 dense:text-[12.5px] dense:leading-[18px] dense:text-gray-500">
            {t("projects.chemSchool.subtitle")}
          </p>
          <p className="text-gray-700 text-sm print:text-xs dense:text-[13px] dense:leading-[19px]">
            {t("projects.chemSchool.description")}
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px] dense:mt-auto dense:pt-1.5">
            {t("projects.chemSchool.technologies")}
          </p>
        </a>

        <a href="https://github.com/GwynbleiddRU/anonymizer" target="_blank" rel="noopener noreferrer" className={cn(
          "cv-project-card border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow dense:flex dense:flex-col dense:px-3 dense:py-2.5",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm dense:text-[14.5px] dense:font-semibold dense:leading-5">
            {t("projects.anonymizer.title")}
            <ArrowUpRight className="hidden dense:ml-0.5 dense:inline-block dense:h-3.5 dense:w-3.5 dense:align-[-2px] dense:text-gray-400" aria-hidden="true" />
          </h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0 dense:text-[12.5px] dense:leading-[18px] dense:text-gray-500">
            {t("projects.anonymizer.subtitle")}
          </p>
          <p className="text-gray-700 text-sm print:text-xs dense:text-[13px] dense:leading-[19px]">
            {t("projects.anonymizer.description")}
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px] dense:mt-auto dense:pt-1.5">
            {t("projects.anonymizer.technologies")}
          </p>
        </a>

        <a href="https://github.com/food-plan/food-plan-front" target="_blank" rel="noopener noreferrer" className={cn(
          "cv-project-card border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow dense:flex dense:flex-col dense:px-3 dense:py-2.5",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm dense:text-[14.5px] dense:font-semibold dense:leading-5">
            {t("projects.foodCalendar.title")}
            <ArrowUpRight className="hidden dense:ml-0.5 dense:inline-block dense:h-3.5 dense:w-3.5 dense:align-[-2px] dense:text-gray-400" aria-hidden="true" />
          </h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0 dense:text-[12.5px] dense:leading-[18px] dense:text-gray-500">
            {t("projects.foodCalendar.subtitle")}
          </p>
          <p className="text-gray-700 text-sm print:text-xs dense:text-[13px] dense:leading-[19px]">
            {t("projects.foodCalendar.description")}
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px] dense:mt-auto dense:pt-1.5">
            {t("projects.foodCalendar.technologies")}
          </p>
        </a>

        <a href="https://github.com/TuneLike/tunelike-api" target="_blank" rel="noopener noreferrer" className={cn(
          "cv-project-card border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow dense:flex dense:flex-col dense:px-3 dense:py-2.5",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm dense:text-[14.5px] dense:font-semibold dense:leading-5">
            {t("projects.tuneLike.title")}
            <ArrowUpRight className="hidden dense:ml-0.5 dense:inline-block dense:h-3.5 dense:w-3.5 dense:align-[-2px] dense:text-gray-400" aria-hidden="true" />
          </h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0 dense:text-[12.5px] dense:leading-[18px] dense:text-gray-500">
            {t("projects.tuneLike.subtitle")}
          </p>
          <p className="text-gray-700 text-sm print:text-xs dense:text-[13px] dense:leading-[19px]">
            {t("projects.tuneLike.description")}
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px] dense:mt-auto dense:pt-1.5">
            {t("projects.tuneLike.technologies")}
          </p>
        </a>

        <a href="https://github.com/GwynbleiddRU/api-moducart" target="_blank" rel="noopener noreferrer" className={cn(
          "cv-project-card border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow dense:flex dense:flex-col dense:px-3 dense:py-2.5",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm dense:text-[14.5px] dense:font-semibold dense:leading-5">
            {t("projects.moduCart.title")}
            <ArrowUpRight className="hidden dense:ml-0.5 dense:inline-block dense:h-3.5 dense:w-3.5 dense:align-[-2px] dense:text-gray-400" aria-hidden="true" />
          </h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0 dense:text-[12.5px] dense:leading-[18px] dense:text-gray-500">
            {t("projects.moduCart.subtitle")}
          </p>
          <p className="text-gray-700 text-sm print:text-xs dense:text-[13px] dense:leading-[19px]">
            {t("projects.moduCart.description")}
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px] dense:mt-auto dense:pt-1.5">
            {t("projects.moduCart.technologies")}
          </p>
        </a>
        
        <div className={cn(
          "cv-project-card border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow dense:flex dense:flex-col dense:px-3 dense:py-2.5",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm dense:text-[14.5px] dense:font-semibold dense:leading-5">
            {t("projects.playlistEngine.title")}
            <ArrowUpRight className="hidden dense:ml-0.5 dense:inline-block dense:h-3.5 dense:w-3.5 dense:align-[-2px] dense:text-gray-400" aria-hidden="true" />
          </h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0 dense:text-[12.5px] dense:leading-[18px] dense:text-gray-500">
            {t("projects.playlistEngine.subtitle")}
          </p>
          <p className="text-gray-700 text-sm print:text-xs dense:text-[13px] dense:leading-[19px]">
            {t("projects.playlistEngine.description")}
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px] dense:mt-auto dense:pt-1.5">
            {t("projects.playlistEngine.technologies")}
          </p>
        </div>
        
        <a href="https://github.com/GwynbleiddRU/Nodes" target="_blank" rel="noopener noreferrer" className={cn(
          "cv-project-card border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow dense:flex dense:flex-col dense:px-3 dense:py-2.5",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm dense:text-[14.5px] dense:font-semibold dense:leading-5">
            {t("projects.diagramEditor.title")}
            <ArrowUpRight className="hidden dense:ml-0.5 dense:inline-block dense:h-3.5 dense:w-3.5 dense:align-[-2px] dense:text-gray-400" aria-hidden="true" />
          </h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0 dense:text-[12.5px] dense:leading-[18px] dense:text-gray-500">
            {t("projects.diagramEditor.subtitle")}
          </p>
          <p className="text-gray-700 text-sm print:text-xs dense:text-[13px] dense:leading-[19px]">
            {t("projects.diagramEditor.description")}
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px] dense:mt-auto dense:pt-1.5">
            {t("projects.diagramEditor.technologies")}
          </p>
        </a>
        
        <a href="https://github.com/GwynbleiddRU/3DStruct" target="_blank" rel="noopener noreferrer" className={cn(
          "cv-project-card border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow dense:flex dense:flex-col dense:px-3 dense:py-2.5",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm dense:text-[14.5px] dense:font-semibold dense:leading-5">
            {t("projects.graphicsEditor.title")}
            <ArrowUpRight className="hidden dense:ml-0.5 dense:inline-block dense:h-3.5 dense:w-3.5 dense:align-[-2px] dense:text-gray-400" aria-hidden="true" />
          </h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0 dense:text-[12.5px] dense:leading-[18px] dense:text-gray-500">
            {t("projects.graphicsEditor.subtitle")}
          </p>
          <p className="text-gray-700 text-sm print:text-xs dense:text-[13px] dense:leading-[19px]">
            {t("projects.graphicsEditor.description")}
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px] dense:mt-auto dense:pt-1.5">
            {t("projects.graphicsEditor.technologies")}
          </p>
        </a>
        
        <a href="https://www.youtube.com/watch?v=VNeDhh1Ge9U" target="_blank" rel="noopener noreferrer" className={cn(
          "cv-project-card border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow dense:flex dense:flex-col dense:px-3 dense:py-2.5",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm dense:text-[14.5px] dense:font-semibold dense:leading-5">
            {t("projects.manufacturingSystem.title")}
            <ArrowUpRight className="hidden dense:ml-0.5 dense:inline-block dense:h-3.5 dense:w-3.5 dense:align-[-2px] dense:text-gray-400" aria-hidden="true" />
          </h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0 dense:text-[12.5px] dense:leading-[18px] dense:text-gray-500">
            {t("projects.manufacturingSystem.subtitle")}
          </p>
          <p className="text-gray-700 text-sm print:text-xs dense:text-[13px] dense:leading-[19px]">
            {t("projects.manufacturingSystem.description")}
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px] dense:mt-auto dense:pt-1.5">
            {t("projects.manufacturingSystem.technologies")}
          </p>
        </a>
      </div>
      
      {/* One line in the compact PDF */}
      <div className="mt-4 print:mt-2 text-center dense:mt-3">
        <p className="text-gray-700 text-sm print:text-xs dense:inline dense:text-[13px]">
          {t("projects.githubInfo")}
        </p>
        <a
          href="https://github.com/GwynbleiddRU"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center mt-1 dense:mt-0 dense:ml-1.5 dense:align-bottom"
        >
          <Github className="h-4 w-4 mr-1 print:h-3 print:w-3 dense:h-3.5 dense:w-3.5" />
          <span className="print:text-xs dense:text-[13px]">github.com/GwynbleiddRU</span>
        </a>
      </div>
    </div>
  );
};

export default ProjectsSection;