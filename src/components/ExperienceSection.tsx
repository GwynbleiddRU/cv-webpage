import { useTranslation } from "react-i18next";
import gazstroypromLogo from "@/assets/images/gazstroyprom.svg";
import tuneLikeLogo from "@/assets/images/tunelike.svg";
import uralEnergoLogo from "@/assets/images/ural-energo.svg";

// `compact` (used by the AI CV) keeps only the company, dates and role, with lighter company names
const ExperienceSection = ({ compact = false }: { compact?: boolean }) => {
  const { t } = useTranslation();
  const listClass = compact ? "space-y-3 print:space-y-2" : "space-y-4 print:space-y-2";
  // The logo is centred on the company and role; the details go below them, in the text column
  const entryClass = "grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3";
  const logoClass = "h-10 w-10 print:h-8 print:w-8";
  // In `compact`, the dates wrap below the company, still at the right, only when both can't fit on one line
  const headerClass = compact ? "flex flex-wrap items-baseline justify-between gap-x-4" : "flex justify-between mb-1 print:mb-0";
  const dateClass = compact ? "ml-auto whitespace-nowrap text-sm text-gray-600 print:text-xs" : "text-sm text-gray-600 print:text-xs";
  const companyClass = compact ? "flex-1 font-medium text-gray-900 print:text-sm" : "font-bold text-lg text-gray-900 print:text-base";
  const positionClass = compact ? "italic text-gray-700 print:text-sm" : "italic text-gray-700 mb-1 print:text-sm print:mb-0";

  return (
    <div className="print:break-inside-avoid">
      <h3 className="text-xl font-bold text-gray-800 mb-3 print:text-base print:mb-2">
        {t("experience.sectionTitle")}
      </h3>
      <div className={listClass}>
        <div className={entryClass}>
          <img src={uralEnergoLogo} alt="" className={logoClass} />
          <div>
            <div className={headerClass}>
              <h4 className={companyClass}>
                {t("experience.uralEnergo.company")}
              </h4>
              <span className={dateClass}>{t("experience.uralEnergo.dates")}</span>
            </div>
            <p className={positionClass}>
              {t("experience.uralEnergo.position")}
            </p>
          </div>
          {!compact && (
            <div className="col-start-2 space-y-2 text-gray-700 print:space-y-1">
              <p className="print:text-xs">
                {t("experience.uralEnergo.description")}
              </p>
              <p className="text-sm mt-1 print:text-[10px] print:mt-0">
                {t("experience.uralEnergo.technologiesUsed")}
              </p>
            </div>
          )}
        </div>
        <div className={entryClass}>
          <img src={tuneLikeLogo} alt="" className={logoClass} />
          <div>
            <div className={headerClass}>
              <h4 className={companyClass}>
                {t("experience.tuneLike.company")}
              </h4>
              <span className={dateClass}>01/09/2022 - 29/08/2024</span>
            </div>
            <p className={positionClass}>
              {t("experience.tuneLike.position")}
            </p>
          </div>
          {!compact && (
            <div className="col-start-2 space-y-2 text-gray-700 print:space-y-1">
              <p className="print:text-xs">
                {t("experience.tuneLike.description")}
              </p>
              <div>
                <p className="font-medium print:text-xs">
                  {t("experience.tuneLike.keyAchievements")}
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 print:space-y-0 print:text-xs">
                  {(t("experience.tuneLike.achievements", { returnObjects: true }) as string[]).map((achievement, index) => (
                    <li key={index}>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm mt-1 print:text-[10px] print:mt-0">
                {t("experience.tuneLike.technologiesUsed")}
              </p>
            </div>
          )}
        </div>
        <div className={entryClass}>
          <img src={gazstroypromLogo} alt="" className={logoClass} />
          <div>
            <div className={headerClass}>
              <h4 className={companyClass}>
                {t("experience.gazstroyprom.company")}
              </h4>
              <span className={dateClass}>07/05/2023 - 08/07/2023</span>
            </div>
            <p className={positionClass}>
              {t("experience.gazstroyprom.position")}
            </p>
          </div>
          {!compact && (
            <div className="col-start-2 space-y-2 text-gray-700 print:space-y-1">
              <p className="print:text-xs">
                {t("experience.gazstroyprom.description")}
              </p>
              <p className="text-sm mt-1 print:text-[10px] print:mt-0">
                {t("experience.gazstroyprom.technologiesUsed")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;