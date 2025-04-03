
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
import { useReactToPrint } from "@/hooks/useReactToPrint";
import { useRef } from "react";

const Index = () => {
  const cvRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => cvRef.current,
    documentTitle: 'Georgiy_Nosachev_CV',
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome to my CV (updated 03.04.25)</h1>
          <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
        
        <Card className="p-0 overflow-hidden">
          <div 
            ref={cvRef} 
            className="bg-white p-8 print:p-5 shadow-sm"
            style={{maxWidth: "800px", margin: "0 auto"}}
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
