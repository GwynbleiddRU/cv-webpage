import { useTranslation } from "react-i18next";

const EducationSection = () => {
  const { t } = useTranslation();
  
  return (
    <div className="print:break-inside-avoid">
      <h3 className="text-xl font-semibold text-gray-800 mb-3 print:text-base print:mb-2">
        {t("education.sectionTitle")}
      </h3>
      <div className="space-y-4 print:space-y-2">
        <div>
          <div className="flex justify-between">
            <h4 className="font-medium text-gray-900 print:text-sm">
              {t("education.mastersDegree.title")}
            </h4>
            <span className="text-sm text-gray-600 print:text-xs">2024</span>
          </div>
          <p className="text-gray-700 print:text-xs">
            {t("education.mastersDegree.institution")}
          </p>
          <p className="text-sm text-gray-600 mt-1 print:text-xs print:mt-0">
            {t("education.mastersDegree.description")}
          </p>
        </div>
        <div>
          <div className="flex justify-between">
            <h4 className="font-medium text-gray-900 print:text-sm">
              {t("education.bachelorsDegree.title")}
            </h4>
            <span className="text-sm text-gray-600 print:text-xs">2022</span>
          </div>
          <p className="text-gray-700 print:text-xs">
            {t("education.bachelorsDegree.institution")}
          </p>
          <p className="text-sm text-gray-600 mt-1 print:text-xs print:mt-0">
            {t("education.bachelorsDegree.description")}
          </p>
        </div>
        <div>
          <div className="flex justify-between">
            <h4 className="font-medium text-gray-900 print:text-sm">
              {t("education.professionalDevelopment.title")}
            </h4>
            <span className="text-sm text-gray-600 print:text-xs">2023-2024</span>
          </div>
          <p className="text-gray-700 print:text-xs">
            {t("education.professionalDevelopment.institution")}
          </p>
          <p className="text-sm text-gray-600 mt-1 print:text-xs print:mt-0">
            {t("education.professionalDevelopment.description")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationSection;