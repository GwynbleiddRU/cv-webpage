
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowDownToLine, Github, Mail, Phone } from "lucide-react";
import CvHeader from "@/components/CvHeader";
import ProfileSection from "@/components/ProfileSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
// import { useReactToPrint } from "@/hooks/useReactToPrint";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useReactToPrint } from "@/lib/print";

const Index = () => {
  const { t, i18n } = useTranslation();
  const cvRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => cvRef.current,
    documentTitle: t("index.documentTitle"),
  });

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ru" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto mb-8">
      <div className="flex flex-wrap justify-between items-start mb-6">
        <div className="flex-1 min-w-[200px]">
          <h1 className="text-2xl font-bold text-gray-900">{t("index.welcomeTitle")}</h1>
          <p className="text-sm text-gray-500">{t("index.welcomeSubtitle")}</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <Button onClick={toggleLanguage} variant="outline" className="w-full sm:w-auto">
            {i18n.language === "en" ? "🇷🇺 Русский" : "🇬🇧 English"}
          </Button>
          <Button onClick={handlePrint} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            {t("index.downloadButton")}
          </Button>
        </div>
      </div>


        <Card className="p-0 overflow-hidden">
          <div
            ref={cvRef}
            className="bg-white p-8 print:p-5 shadow-sm"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            <CvHeader />
            <Separator className="my-5 print:my-3" />

            <ProfileSection />
            <Separator className="my-5 print:my-3" />

            <EducationSection />
            <Separator className="my-5 print:my-3" />

            <ExperienceSection />
            <Separator className="my-5 print:my-3" />

            <SkillsSection />
            <Separator className="my-5 print:my-3" />

            <ProjectsSection />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
