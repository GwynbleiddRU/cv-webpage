
import { cn } from "@/lib/utils";

const SkillsSection = () => {
  const renderSkillBar = (level: number) => {
    const bars = [];
    for (let i = 0; i < 5; i++) {
      bars.push(
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
      );
    }
    return <div className="flex space-x-1 print:space-x-0.5" style={{display: "flex", gap: "0.25rem"}}>{bars}</div>;
  };

  return (
    <div className="print:break-inside-avoid">
      <h3 className="text-xl font-semibold text-gray-800 mb-3 print:text-base print:mb-2">Technical Skills</h3>
      
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:gap-2"
        style={{
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "0.5rem"
        }}
      >
        <div>
          <h4 className="font-medium text-gray-900 mb-2 print:text-sm print:mb-1">Backend Development</h4>
          <div className="space-y-2 print:space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 print:text-xs">.NET C#</span>
              {renderSkillBar(5)}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 print:text-xs">REST API</span>
              {renderSkillBar(5)}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 print:text-xs">Requests & BS</span>
              {renderSkillBar(4)}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 print:text-xs">Python</span>
              {renderSkillBar(3)}
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2 print:text-sm print:mb-1">Frontend Development</h4>
          <div className="space-y-2 print:space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 print:text-xs">HTML+CSS</span>
              {renderSkillBar(4)}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 print:text-xs">Angular</span>
              {renderSkillBar(3)}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 print:text-xs">React</span>
              {renderSkillBar(3)}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 print:text-xs">Flutter</span>
              {renderSkillBar(2)}
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2 print:text-sm print:mb-1">Database & DevOps</h4>
          <div className="space-y-2 print:space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 print:text-xs">MongoDB</span>
              {renderSkillBar(4)}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 print:text-xs">MSSQL</span>
              {renderSkillBar(3)}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 print:text-xs">Docker</span>
              {renderSkillBar(4)}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 print:text-xs">Ubuntu/Nginx</span>
              {renderSkillBar(3)}
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-2 print:text-sm print:mb-1">Specialized Skills</h4>
          <div className="space-y-1 text-gray-700 print:space-y-0.5">
            <p className="print:text-xs">• Building projects from scratch</p>
            <p className="print:text-xs">• High-load system architecture and optimization</p>
            <p className="print:text-xs">• Database design and query optimization</p>
            <p className="print:text-xs">• Prompt engineering and AI tools expertise</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
