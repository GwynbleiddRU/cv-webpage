import { useTranslation } from "react-i18next";
import { ArrowUpRight, Github } from "lucide-react";
import { cn } from "@/lib/utils";

// Text in the projects.<key>.* translations. Newest first: the PDF keeps the first four cards.
// A project without a URL is shown without a link.
const PROJECTS: { key: string; url?: string }[] = [
  { key: "teachStudio", url: "https://github.com/GwynbleiddRU/teach-studio" },
  { key: "chemSchool", url: "https://chem-school.ru" },
  { key: "anonymizer", url: "https://github.com/GwynbleiddRU/anonymizer" },
  { key: "foodCalendar", url: "https://github.com/food-plan/food-plan-front" },
  { key: "tuneLike", url: "https://github.com/TuneLike/tunelike-api" },
  { key: "moduCart", url: "https://github.com/GwynbleiddRU/api-moducart" },
  { key: "playlistEngine" },
  { key: "diagramEditor", url: "https://github.com/GwynbleiddRU/Nodes" },
  { key: "graphicsEditor", url: "https://github.com/GwynbleiddRU/3DStruct" },
  { key: "manufacturingSystem", url: "https://www.youtube.com/watch?v=VNeDhh1Ge9U" },
];

const cardClass = cn(
  "cv-project-card border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow dense:flex dense:flex-col dense:px-3 dense:py-2.5",
  "print:break-inside-avoid"
);

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
        {PROJECTS.map(({ key, url }) => {
          const content = (
            <>
              <h4 className="font-medium text-gray-900 print:text-sm dense:text-[14.5px] dense:font-semibold dense:leading-5">
                {t(`projects.${key}.title`)}
                {/* In the compact PDF, marks the card as a link */}
                {url && <ArrowUpRight className="hidden dense:ml-0.5 dense:inline-block dense:h-3.5 dense:w-3.5 dense:align-[-2px] dense:text-gray-400" aria-hidden="true" />}
              </h4>
              <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0 dense:text-[12.5px] dense:leading-[18px] dense:text-gray-500">
                {t(`projects.${key}.subtitle`)}
              </p>
              <p className="text-gray-700 text-sm print:text-xs dense:text-[13px] dense:leading-[19px]">
                {t(`projects.${key}.description`)}
              </p>
              <p className="text-xs text-gray-500 mt-1 print:text-[10px] dense:mt-auto dense:pt-1.5">
                {t(`projects.${key}.technologies`)}
              </p>
            </>
          );
          return url ? (
            <a key={key} href={url} target="_blank" rel="noopener noreferrer" className={cardClass}>{content}</a>
          ) : (
            <div key={key} className={cardClass}>{content}</div>
          );
        })}
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
