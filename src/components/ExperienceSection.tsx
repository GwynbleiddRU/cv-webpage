import { useTranslation } from "react-i18next";

const ExperienceSection = () => {
  const { t } = useTranslation();
  
  return (
    <div className="print:break-inside-avoid">
      <h3 className="text-xl font-semibold text-gray-800 mb-3 print:text-base print:mb-2">
        {t("experience.sectionTitle")}
      </h3>
      <div className="space-y-4 print:space-y-2">
        <div>
          <div className="flex justify-between mb-1 print:mb-0">
            <h4 className="font-bold text-lg text-gray-900 print:text-base">
              {t("experience.tuneLike.company")}
            </h4>
            <span className="text-sm text-gray-600 print:text-xs">01/09/2022 - 29/08/2024</span>
          </div>
          <p className="italic text-gray-700 mb-1 print:text-sm print:mb-0">
            {t("experience.tuneLike.position")}
          </p>
          <div className="space-y-2 text-gray-700 print:space-y-1">
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
        </div>
        <div>
          <div className="flex justify-between mb-1 print:mb-0">
            <h4 className="font-bold text-lg text-gray-900 print:text-base">
              {t("experience.gazstroyprom.company")}
            </h4>
            <span className="text-sm text-gray-600 print:text-xs">07/05/2023 - 08/07/2023</span>
          </div>
          <p className="italic text-gray-700 mb-1 print:text-sm print:mb-0">
            {t("experience.gazstroyprom.position")}
          </p>
          <div className="space-y-2 text-gray-700 print:space-y-1">
            <p className="print:text-xs">
              {t("experience.gazstroyprom.description")}
            </p>
            <p className="text-sm mt-1 print:text-[10px] print:mt-0">
              {t("experience.gazstroyprom.technologiesUsed")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;