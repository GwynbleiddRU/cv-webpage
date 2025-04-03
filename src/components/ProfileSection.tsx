
import { cn } from "@/lib/utils";

const ProfileSection = () => {
  return (
    <div className="print:break-inside-avoid">
      <h3 className="text-xl font-semibold text-gray-800 mb-3 print:text-base print:mb-2">Professional Profile</h3>
      
      <div className="space-y-2 text-gray-700 print:space-y-1">
        <p className="print:text-sm">
          Experienced Fullstack Developer with strong software engineering knowledge and extensive 
          practical experience in developing robust, full-featured applications. Focused on creating 
          efficient, high-performance systems with expertise in API development and high-load system 
          architecture.
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
            <h4 className="font-medium text-gray-900 mb-1 print:text-sm print:mb-0">Technical Expertise</h4>
            <ul className="list-disc list-inside space-y-1 pl-2 print:space-y-0 print:text-xs">
              <li>Designing and developing RESTful API architectures</li>
              <li>Building high-load system backends with efficient optimization</li>
              <li>Full-cycle application development from concept to deployment</li>
              <li>Database design and optimization for performance</li>
              {/* <li>Implementing ML/AI technologies in production systems</li> */}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-1 print:text-sm print:mb-0">Professional Skills</h4>
            <ul className="list-disc list-inside space-y-1 pl-2 print:space-y-0 print:text-xs">
              <li>Independent project management and technical leadership</li>
              <li>Implementing complex algorithms and data structures</li>
              <li>System architecture design and optimization</li>
              <li>Cross-platform application development</li>
              <li>Technical mentorship and team guidance</li>
            </ul>
          </div>
        </div>
        
        <p className="mt-2 print:text-xs print:mt-1">
          Currently enhancing expertise in Microservice Communication Patterns (MCP) to further optimize 
          development processes with AI integration. Proficient in English (C1) and bit Spanish (A2).
        </p>
      </div>
    </div>
  );
};

export default ProfileSection;
