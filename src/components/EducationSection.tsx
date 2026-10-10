import { useTranslation } from "react-i18next";
import hseLogo from "@/assets/images/hse.svg";
import innopolisLogo from "@/assets/images/innopolis.svg";

// `compact` (used by the AI CV) keeps only the degree, institution and dates
const EducationSection = ({ compact = false }: { compact?: boolean }) => {
  const { t } = useTranslation();
  const listClass = compact ? "space-y-3 print:space-y-2" : "space-y-4 print:space-y-2";
  // The logo is centred on the degree and institution; a description goes below them, in the text column
  const entryClass = "grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3";
  const logoClass = "h-10 w-10 print:h-8 print:w-8";
  // In `compact`, the dates wrap below the title, still at the right, only when both can't fit on one line
  const headerClass = compact ? "flex flex-wrap items-baseline justify-between gap-x-4" : "flex justify-between";
  const titleClass = compact ? "flex-1 font-medium text-gray-900 print:text-sm" : "font-medium text-gray-900 print:text-sm";
  const dateClass = compact ? "ml-auto whitespace-nowrap text-sm text-gray-600 print:text-xs" : "text-sm text-gray-600 print:text-xs";

  return (
    <div className="print:break-inside-avoid">
      <h3 className="text-xl font-bold text-gray-800 mb-3 print:text-base print:mb-2">
        {t("education.sectionTitle")}
      </h3>
      <div className={listClass}>
        <div className={entryClass}>
          <img src={innopolisLogo} alt="" className={logoClass} />
          <div>
            <div className={headerClass}>
              <h4 className={titleClass}>
                {t("education.mastersDegree.title")}
              </h4>
              <span className={dateClass}>2024</span>
            </div>
            <p className="text-gray-700 print:text-xs">
              {t("education.mastersDegree.institution")}
            </p>
          </div>
          {!compact && (
            <p className="col-start-2 text-sm text-gray-600 mt-1 print:text-xs print:mt-0">
              {t("education.mastersDegree.description")}
            </p>
          )}
        </div>
        <div className={entryClass}>
          <img src={hseLogo} alt="" className={logoClass} />
          <div>
            <div className={headerClass}>
              <h4 className={titleClass}>
                {t("education.bachelorsDegree.title")}
              </h4>
              <span className={dateClass}>2022</span>
            </div>
            <p className="text-gray-700 print:text-xs">
              {t("education.bachelorsDegree.institution")}
            </p>
          </div>
          {!compact && (
            <p className="col-start-2 text-sm text-gray-600 mt-1 print:text-xs print:mt-0">
              {t("education.bachelorsDegree.description")}
            </p>
          )}
        </div>
        <div className={entryClass}>
          <img src={innopolisLogo} alt="" className={logoClass} />
          <div>
            <div className={headerClass}>
              <h4 className={titleClass}>
                {t("education.professionalDevelopment.title")}
              </h4>
              <span className={dateClass}>2023-2024</span>
            </div>
            <p className="text-gray-700 print:text-xs">
              {t("education.professionalDevelopment.institution")}
            </p>
          </div>
          {!compact && (
            <p className="col-start-2 text-sm text-gray-600 mt-1 print:text-xs print:mt-0">
              {t("education.professionalDevelopment.description")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationSection;