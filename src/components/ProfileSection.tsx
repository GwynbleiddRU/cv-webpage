import { useTranslation } from "react-i18next";

const ProfileSection = () => {
  const { t } = useTranslation();
  
  return (
    <div className="print:break-inside-avoid">
      <h3 className="text-xl font-semibold text-gray-800 mb-3 print:text-base print:mb-2">
        {t("profile.sectionTitle")}
      </h3>
      <div className="space-y-2 text-gray-700 print:space-y-1">
        <p className="print:text-sm">
          {t("profile.description")}
        </p>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 print:gap-2 mt-3 print:mt-1"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "0.5rem",
            marginTop: "0.25rem"
          }}
        >
          <div>
            <h4 className="font-medium text-gray-900 mb-1 print:text-sm print:mb-0">
              {t("profile.technicalExpertise.title")}
            </h4>
            <ul className="list-disc list-inside space-y-1 pl-2 print:space-y-0 print:text-xs">
              {(t("profile.technicalExpertise.points", { returnObjects: true }) as string[]).map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-1 print:text-sm print:mb-0">
              {t("profile.professionalSkills.title")}
            </h4>
            <ul className="list-disc list-inside space-y-1 pl-2 print:space-y-0 print:text-xs">
              {(t("profile.professionalSkills.points", { returnObjects: true }) as string[]).map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-2 print:text-xs print:mt-1">
          {t("profile.additionalInfo")}
        </p>
      </div>
    </div>
  );
};

export default ProfileSection;