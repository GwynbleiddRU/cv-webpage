import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

// Group titles in skills.categories.<key>; levels out of 5
const GROUPS: { key: string; skills: [name: string, level: number][] }[] = [
  { key: "backend", skills: [[".NET C#", 5], ["REST API", 5], ["Requests & BS", 4], ["Python", 3]] },
  { key: "frontend", skills: [["HTML+CSS", 5], ["Angular", 4], ["React", 4], ["Flutter", 3]] },
  { key: "database", skills: [["MongoDB", 5], ["MSSQL", 3], ["Docker", 4], ["Ubuntu/Nginx", 4]] },
];

const groupTitleClass = "font-medium text-gray-900 mb-2 print:text-sm print:mb-1";

const SkillBar = ({ level }: { level: number }) => (
  <div className="flex space-x-1 print:space-x-0.5" style={{display: "flex", gap: "0.25rem"}}>
    {[0, 1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className={cn(
          "h-2 w-6 rounded-sm",
          i < level ? "bg-blue-600" : "bg-gray-200",
          "print:h-1 print:w-4"
        )}
        style={{
          height: "0.5rem",
          width: "1.5rem",
          borderRadius: "0.125rem",
          backgroundColor: i < level ? "#2563eb" : "#e5e7eb" // Ensure colors show in PDF
        }}
      ></div>
    ))}
  </div>
);

const SkillsSection = ({ className }: { className?: string }) => {
  const { t } = useTranslation();

  return (
    <div className={cn("print:break-inside-avoid", className)}>
      <h3 className="text-xl font-bold text-gray-800 mb-3 print:text-base print:mb-2">
        {t("skills.sectionTitle")}
      </h3>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:gap-2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "0.5rem"
        }}
      >
        {GROUPS.map(({ key, skills }) => (
          <div key={key}>
            <h4 className={groupTitleClass}>{t(`skills.categories.${key}`)}</h4>
            <div className="space-y-2 print:space-y-1">
              {skills.map(([name, level]) => (
                <div key={name} className="flex justify-between items-center">
                  <span className="text-gray-700 print:text-xs">{name}</span>
                  <SkillBar level={level} />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h4 className={groupTitleClass}>{t("skills.categories.specialized")}</h4>
          <div className="space-y-1 text-gray-700 print:space-y-0.5">
            {(t("skills.specializedSkills", { returnObjects: true }) as string[]).map((skill) => (
              <p key={skill} className="print:text-xs">• {skill}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
