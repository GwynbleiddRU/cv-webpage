import { useTranslation } from "react-i18next";
import { Separator } from "@/components/ui/separator";
import CvHeader from "@/components/CvHeader";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";

type Skill = { title: string; main: string; extra: string[] };
type Area = { title: string; text: string };
type Competency = { title: string; text: string };

const AiCv = () => {
  const { t } = useTranslation();
  const intro = t("ai.intro", { returnObjects: true }) as string[];
  const skills = t("ai.skills", { returnObjects: true }) as Skill[];
  const areas = t("ai.areas", { returnObjects: true }) as Area[];
  const steps = t("ai.steps", { returnObjects: true }) as string[];
  const competencies = t("ai.competencies", { returnObjects: true }) as Competency[];
  const value = t("ai.value", { returnObjects: true }) as string[];

  return (
    <>
      <CvHeader variant="ai" />
      <Separator className="my-5 print:my-3 dense:my-4" />

      <section className="print:break-inside-avoid">
        <h3 className="text-xl font-bold text-gray-800 mb-3 print:text-base print:mb-2 dense:text-[17px] dense:leading-6 dense:mb-2">{t("ai.introTitle")}</h3>
        <div className="space-y-2 text-gray-700 dense:space-y-1.5">
          {intro.map((paragraph) => (
            <p key={paragraph} className="print:text-sm">{paragraph}</p>
          ))}
        </div>
      </section>
      <Separator className="my-5 print:my-3 dense:my-4" />

      <EducationSection brief />
      <Separator className="my-5 print:my-3 dense:my-4" />

      <ExperienceSection brief />
      <Separator className="my-5 print:my-3 dense:my-4" />

      <section className="cv-full-only cv-pdf-split">
        <h3 className="text-xl font-bold text-gray-800 mb-3 print:text-base print:mb-2">{t("ai.skillsTitle")}</h3>
        <div className="cv-pdf-split space-y-4">
          {skills.map((skill) => (
            <div key={skill.title} className="print:break-inside-avoid">
              <h4 className="font-medium text-gray-900">{skill.title}</h4>
              <p className="mt-1 text-gray-700 print:text-sm">{skill.main}</p>
              <ul className="m-0 mt-2.5 list-none space-y-1.5 rounded-r-md border-l-[3px] border-blue-500 bg-blue-50/70 py-2.5 pl-3.5 pr-4 text-sm leading-normal text-[#1e3a5f] print:text-xs">
                {skill.extra.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="flex h-[1.5em] shrink-0 items-center" aria-hidden="true">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <Separator className="cv-full-only my-5 print:my-3" />

      <section className="cv-full-only print:break-inside-avoid">
        <h3 className="text-xl font-bold text-gray-800 mb-3 print:text-base print:mb-2">{t("ai.areasTitle")}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
          {areas.map((area) => (
            <p key={area.title} className="print:text-sm">
              <span className="font-semibold text-gray-900">{area.title}.</span> {area.text}
            </p>
          ))}
        </div>
      </section>
      <Separator className="cv-full-only my-5 print:my-3" />

      <section className="cv-full-only cv-pdf-split">
        <h3 className="text-xl font-bold text-gray-800 mb-3 print:text-base print:mb-2">{t("ai.methodTitle")}</h3>
        <ol className="cv-pdf-split list-none space-y-2 pl-0 text-gray-700">
          {steps.map((step, index) => (
            <li key={step} className="print:text-sm">
              <span className="mr-1.5 font-semibold text-blue-700">{index + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
        <p className="mt-3 border-l-[3px] border-blue-300 bg-slate-50 px-3 py-2.5 text-gray-700 print:text-sm">
          {t("ai.example")}
        </p>
      </section>
      <Separator className="cv-full-only my-5 print:my-3" />

      {/* Compact PDF only: the essentials of the three sections above */}
      <section className="cv-compact-only hidden cv-pdf-split">
        <h3 className="text-xl font-bold text-gray-800 mb-3 print:text-base print:mb-2 dense:text-[17px] dense:leading-6 dense:mb-2">{t("ai.competenciesTitle")}</h3>
        <ul className="cv-pdf-split space-y-1.5 text-gray-700">
          {competencies.map((item) => (
            <li key={item.title} className="flex gap-2.5">
              <span className="flex h-[1.45em] shrink-0 items-center" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              </span>
              <span>
                <span className="font-semibold text-gray-900">{item.title}</span> — {item.text}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-3 space-y-1.5 rounded-r-md border-l-[3px] border-blue-500 bg-blue-50/70 py-2 pl-3.5 pr-4 text-[#1e3a5f]">
          {/* A no-break space keeps each arrow at the end of its line, never at the start of the next */}
          <p><span className="font-semibold">{t("ai.approachLabel")}</span> {t("ai.approach").replace(/ →/g, " →")}</p>
          <p><span className="font-semibold">{t("ai.areasLabel")}</span> {t("ai.areasBrief")}</p>
        </div>
      </section>
      <Separator className="cv-compact-only hidden my-5 print:my-3 dense:my-4" />

      <section className="print:break-inside-avoid">
        <h3 className="text-xl font-bold text-gray-800 mb-3 print:text-base print:mb-2 dense:text-[17px] dense:leading-6 dense:mb-2">{t("ai.valueTitle")}</h3>
        <p className="text-gray-700 print:text-sm">{t("ai.valueLead")}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700 dense:mt-1.5 dense:space-y-0.5">
          {value.map((item) => (
            <li key={item} className="print:text-sm">{item}</li>
          ))}
        </ul>
        <p className="mt-3 text-gray-700 print:text-sm dense:mt-2">{t("ai.close")}</p>
      </section>
    </>
  );
};

export default AiCv;
