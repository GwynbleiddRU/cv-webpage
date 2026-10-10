import { useTranslation } from "react-i18next";
import hseLogo from "@/assets/images/hse.svg";
import innopolisLogo from "@/assets/images/innopolis.svg";

// `brief` (used by the AI CV) keeps only the degree, institution and dates; the compact PDF drops
// the descriptions (`cv-full-only`) in either case
const EducationSection = ({ brief = false }: { brief?: boolean }) => {
  const { t } = useTranslation();
  const listClass = brief ? "cv-pdf-split space-y-3 print:space-y-2 dense:space-y-2" : "cv-pdf-split space-y-4 print:space-y-2 dense:space-y-2";
  // The logo is centred on the degree and institution; a description goes below them, in the text column
  const entryClass = "grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 dense:gap-x-2.5";
  const logoClass = "h-10 w-10 print:h-8 print:w-8 dense:h-8 dense:w-8";
  // In `brief`, the dates wrap below the title, still at the right, only when both can't fit on one line
  const headerClass = brief ? "flex flex-wrap items-baseline justify-between gap-x-4" : "flex justify-between";
  const titleClass = brief ? "flex-1 font-medium text-gray-900 print:text-sm" : "font-medium text-gray-900 print:text-sm";
  const dateClass = brief
    ? "ml-auto whitespace-nowrap text-sm text-gray-600 print:text-xs dense:text-[13px]"
    : "text-sm text-gray-600 print:text-xs dense:text-[13px]";

  return (
    <div className="cv-pdf-split print:break-inside-avoid">
      <h3 className="text-xl font-bold text-gray-800 mb-3 print:text-base print:mb-2 dense:text-[17px] dense:leading-6 dense:mb-2">
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
            <p className="text-gray-700 print:text-xs dense:text-[13px]">
              {t("education.mastersDegree.institution")}
            </p>
          </div>
          {!brief && (
            <p className="cv-full-only col-start-2 text-sm text-gray-600 mt-1 print:text-xs print:mt-0">
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
            <p className="text-gray-700 print:text-xs dense:text-[13px]">
              {t("education.bachelorsDegree.institution")}
            </p>
          </div>
          {!brief && (
            <p className="cv-full-only col-start-2 text-sm text-gray-600 mt-1 print:text-xs print:mt-0">
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
            <p className="text-gray-700 print:text-xs dense:text-[13px]">
              {t("education.professionalDevelopment.institution")}
            </p>
          </div>
          {!brief && (
            <p className="cv-full-only col-start-2 text-sm text-gray-600 mt-1 print:text-xs print:mt-0">
              {t("education.professionalDevelopment.description")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EducationSection;