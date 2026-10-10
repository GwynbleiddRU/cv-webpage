import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ArrowDownToLine, ChevronDown } from "lucide-react";
import CvHeader from "@/components/CvHeader";
import ProfileSection from "@/components/ProfileSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import TechStackSection from "@/components/TechStackSection";
import AiCv from "@/components/AiCv";
import { useEffect, useRef, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { exportPdf, type PdfVariant } from "@/lib/print";
import { cn } from "@/lib/utils";

const Index = () => {
  const { t, i18n } = useTranslation();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const isAi = hash === "#ai";

  const openProfile = (nextHash: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (hash !== nextHash) navigate({ hash: nextHash });
  };
  const cvRef = useRef<HTMLDivElement>(null);

  const downloadPdf = (variant: PdfVariant) => {
    if (!cvRef.current) return;
    const titleKey = variant === "compact" ? "documentTitleCompact" : "documentTitle";
    exportPdf(cvRef.current, variant, t(`${isAi ? "ai" : "index"}.${titleKey}`));
  };

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith("ru") ? "en" : "ru";
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    document.title = t(isAi ? "ai.documentTitle" : "index.documentTitle");
    window.scrollTo(0, 0);
  }, [isAi, i18n.language, t]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "border-b-2 border-transparent pb-0.5 text-[15px] font-medium text-gray-500 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
      isActive && "border-blue-700 font-semibold text-blue-700"
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto mb-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <nav aria-label={t("index.navLabel")} className="flex flex-wrap items-baseline gap-x-[22px] gap-y-2">
            <a href="#developer" onClick={openProfile("#developer")} aria-current={isAi ? undefined : "page"} className={linkClass({ isActive: !isAi })}>
              {t("index.developerLink")}
            </a>
            <a href="#ai" onClick={openProfile("#ai")} aria-current={isAi ? "page" : undefined} className={linkClass({ isActive: isAi })}>
              {t("index.aiLink")}
            </a>
          </nav>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <Button onClick={toggleLanguage} variant="outline" className="w-full sm:w-auto">
              {i18n.language.startsWith("ru") ? (
                <>
                  <span className="fi fi-gb mr-2" aria-hidden="true" />
                  English
                </>
              ) : (
                <>
                  <span className="fi fi-ru mr-2" aria-hidden="true" />
                  Русский
                </>
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                  <ArrowDownToLine className="mr-2 h-4 w-4" />
                  {t("index.downloadButton")}
                  <ChevronDown className="ml-1.5 h-4 w-4 opacity-80" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[15rem]">
                {(["full", "compact"] as const).map((variant) => (
                  <DropdownMenuItem key={variant} onSelect={() => downloadPdf(variant)} className="flex-col items-start gap-0.5 py-2">
                    <span className="font-medium">{t(`index.export.${variant}`)}</span>
                    <span className="text-xs text-muted-foreground">{t(`index.export.${variant}Hint`)}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Card className="p-0 overflow-hidden">
          <div
            ref={cvRef}
            className="bg-white p-8 print:p-5 shadow-sm"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            {isAi ? (
              <AiCv />
            ) : (
              <>
                <CvHeader />
                <Separator className="my-5 print:my-3 dense:my-4" />
                <ProfileSection />
                <Separator className="my-5 print:my-3 dense:my-4" />
                <EducationSection />
                <Separator className="my-5 print:my-3 dense:my-4" />
                <ExperienceSection />
                <Separator className="my-5 print:my-3 dense:my-4" />
                <SkillsSection className="cv-full-only" />
                <TechStackSection className="cv-compact-only hidden" />
                <Separator className="my-5 print:my-3 dense:my-4" />
                <ProjectsSection />
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
