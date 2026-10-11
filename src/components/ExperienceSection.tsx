import { useTranslation } from "react-i18next";
import { LOGOS } from "@/lib/logos";

// Text in the experience.<key>.* translations. A job without `dates` takes them from the translations
// (the current one: "present"); a job with `achievements` there lists them.
const JOBS: { key: string; logo: string; dates?: string }[] = [
  { key: "uralEnergo", logo: LOGOS.uralEnergo },
  { key: "tuneLike", logo: LOGOS.tuneLike, dates: "01/09/2022 - 29/08/2024" },
  { key: "gazstroyprom", logo: LOGOS.gazstroyprom, dates: "07/05/2023 - 08/07/2023" },
];

// `brief` (used by the AI CV) keeps only the company, dates and role, with lighter company names
const ExperienceSection = ({ brief = false }: { brief?: boolean }) => {
  const { t, i18n } = useTranslation();
  const listClass = brief ? "cv-pdf-split space-y-3 print:space-y-2 dense:space-y-2" : "cv-pdf-split space-y-4 print:space-y-2 dense:space-y-3";
  // In the PDF an entry may break between its parts; its head (logo, company, dates and role) stays with the description
  const entryClass = "cv-pdf-split";
  // The logo is centred on the company and role; the details are indented to line up with them
  const headClass = "cv-pdf-keep grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 dense:gap-x-2.5";
  const logoClass = "h-10 w-10 print:h-8 print:w-8 dense:h-8 dense:w-8";
  const detailsClass = "cv-pdf-split pl-[3.25rem] space-y-2 text-gray-700 print:space-y-1 dense:pl-[2.625rem] dense:space-y-1";
  // In `brief`, the dates wrap below the company, still at the right, only when both can't fit on one line
  const headerClass = brief ? "flex flex-wrap items-baseline justify-between gap-x-4" : "flex justify-between mb-1 print:mb-0 dense:mb-0";
  const dateClass = brief
    ? "ml-auto whitespace-nowrap text-sm text-gray-600 print:text-xs dense:text-[13px]"
    : "text-sm text-gray-600 print:text-xs dense:text-[13px]";
  const companyClass = brief
    ? "flex-1 font-medium text-gray-900 print:text-sm"
    : "font-bold text-lg text-gray-900 print:text-base dense:text-[15px] dense:leading-snug";
  const positionClass = brief ? "italic text-gray-700 print:text-sm" : "italic text-gray-700 mb-1 print:text-sm print:mb-0 dense:mb-0.5";
  // Never the first line of a PDF page, cut off from the rest of the entry
  const technologiesClass = "cv-pdf-keep-prev text-sm mt-1 print:text-[10px] print:mt-0 dense:text-[12.5px] dense:text-gray-600";

  return (
    <div className="cv-pdf-split print:break-inside-avoid">
      <h3 className="text-xl font-bold text-gray-800 mb-3 print:text-base print:mb-2 dense:text-[17px] dense:leading-6 dense:mb-2">
        {t("experience.sectionTitle")}
      </h3>
      <div className={listClass}>
        {JOBS.map(({ key, logo, dates }) => (
          <div key={key} className={entryClass}>
            <div className={headClass}>
              <img src={logo} alt="" className={logoClass} />
              <div>
                <div className={headerClass}>
                  <h4 className={companyClass}>{t(`experience.${key}.company`)}</h4>
                  <span className={dateClass}>{dates ?? t(`experience.${key}.dates`)}</span>
                </div>
                <p className={positionClass}>{t(`experience.${key}.position`)}</p>
              </div>
            </div>
            {!brief && (
              <div className={detailsClass}>
                <p className="print:text-xs">{t(`experience.${key}.description`)}</p>
                {i18n.exists(`experience.${key}.achievements`) && (
                  <div className="cv-pdf-split">
                    <p className="cv-pdf-keep font-medium print:text-xs">{t(`experience.${key}.keyAchievements`)}</p>
                    <ul className="cv-pdf-split list-disc list-inside space-y-1 pl-2 print:space-y-0 print:text-xs dense:list-outside dense:space-y-0.5 dense:pl-5">
                      {(t(`experience.${key}.achievements`, { returnObjects: true }) as string[]).map((achievement) => (
                        <li key={achievement}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className={technologiesClass}>{t(`experience.${key}.technologiesUsed`)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
