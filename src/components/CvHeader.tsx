import { Mail, Phone, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

type CvHeaderProps = {
  variant?: "developer" | "ai";
};

const CvHeader = ({ variant = "developer" }: CvHeaderProps) => {
  const { t } = useTranslation();
  const isAi = variant === "ai";
  const role = isAi ? t("ai.role") : t("header.prefix");

  return (
    <div className="cv-lang-row">
      <div className="cv-header flex flex-col md:flex-row justify-between items-start gap-4 print:gap-2">
        <div>
          <h1 className={isAi
            ? "text-[26px] font-bold text-gray-900 leading-tight print:text-xl"
            : "text-3xl font-bold text-gray-900 print:text-xl"
          }>
            {t("header.name")}
          </h1>
          <h2 className={isAi
            ? "text-[17px] font-semibold text-blue-700 mt-0.5 leading-snug print:text-base print:mt-0"
            : "text-xl font-semibold text-blue-700 mt-1 print:text-base print:mt-0"
          }>
            {role}
          </h2>
          {isAi && (
            <p className="text-[13px] leading-snug text-gray-500 mt-1 print:text-xs print:mt-0">
              {t("ai.tagline")}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 print:gap-1 items-start min-w-0 md:min-w-[210px]">
          <div className="flex items-center">
            <Globe className="h-4 w-4 text-gray-500 print:h-3 print:w-3 mt-0 min-w-[16px]" />
            <a href="https://gwynbleiddru.github.io/portfolio/" className="text-sm text-gray-700 hover:text-blue-600 print:text-xs ml-2">
              {t("header.portfolio")}
            </a>
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 text-gray-500 print:h-3 print:w-3 mt-0 min-w-[16px]" />
            <a href="tel:+79991250666" className="text-sm text-gray-700 hover:text-blue-600 print:text-xs ml-2">
              +7 (999) 125-06-66
            </a>
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 text-gray-500 print:h-3 print:w-3 mt-0 min-w-[16px]" />
            <a href="mailto:nosachev.george@mail.ru" className="text-sm text-gray-700 hover:text-blue-600 print:text-xs ml-2">
              nosachev.george@mail.ru
            </a>
          </div>
        </div>
      </div>
      <p className="cv-langs">
        {t("header.languages")}
      </p>

      {/* Header of every PDF page after the first, placed there by lib/print.ts */}
      <div className="cv-pdf-page-header hidden">
        <div className="mb-5 flex items-baseline gap-3 border-b border-gray-200 pb-2">
          <span className="text-lg font-bold leading-tight text-gray-900">{t("header.name")}</span>
          <span className="text-sm font-semibold leading-snug text-blue-700">{role}</span>
          <span className="cv-pdf-page-number ml-auto text-sm tabular-nums text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default CvHeader;
