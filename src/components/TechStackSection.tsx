import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

type StackGroup = { title: string; items: string[] };

// Compact PDF only: the stack by area, standing in for Technical Skills.
// Each row is a subgrid, so the PDF can break between rows and the labels still share one column;
// `data-pdf-list` makes each row's tags read as a comma-separated list in the PDF's text layer.
const TechStackSection = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const groups = t("stack.groups", { returnObjects: true }) as StackGroup[];

  return (
    <section className={cn("cv-pdf-split print:break-inside-avoid", className)}>
      <h3 className="text-xl font-bold text-gray-800 mb-3 print:text-base print:mb-2 dense:text-[17px] dense:leading-6 dense:mb-2">
        {t("stack.sectionTitle")}
      </h3>
      {/* Areas sit further apart than the wrapped lines of one area's tags, so each group reads as one */}
      <dl className="cv-pdf-split grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-2.5">
        {groups.map((group) => (
          <div key={group.title} className="col-span-2 grid grid-cols-subgrid items-baseline">
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">{group.title}</dt>
            <dd>
              <ul data-pdf-list className="flex flex-wrap gap-x-1.5 gap-y-1">
                {group.items.map((item) => (
                  <li key={item} className="rounded-md border border-blue-100 bg-blue-50 px-2 py-px text-[12.5px] leading-5 text-[#1e3a5f]">
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default TechStackSection;
