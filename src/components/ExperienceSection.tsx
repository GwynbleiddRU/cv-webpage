
const ExperienceSection = () => {
  return (
    <div className="print:break-inside-avoid">
      <h3 className="text-xl font-semibold text-gray-800 mb-3 print:text-base print:mb-2">Professional Experience</h3>
      
      <div className="space-y-4 print:space-y-2">
        <div>
          <div className="flex justify-between mb-1 print:mb-0">
            <h4 className="font-bold text-lg text-gray-900 print:text-base">TuneLike</h4>
            <span className="text-sm text-gray-600 print:text-xs">01/09/2022 - 29/08/2024</span>
          </div>
          
          <p className="italic text-gray-700 mb-1 print:text-sm print:mb-0">CTO, Fullstack Developer & Project Manager</p>
          
          <div className="space-y-2 text-gray-700 print:space-y-1">
            <p className="print:text-xs">
              Designed and developed an innovative platform for finding events and connecting
              people based on musical preferences, enabling social interactions among event participants.
            </p>
            
            <div>
              <p className="font-medium print:text-xs">Key Achievements:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 print:space-y-0 print:text-xs">
                <li>
                  Implemented a sophisticated algorithm that creates psychological profiles by analyzing 
                  acoustic properties and lyrics of user-selected tracks
                </li>
                <li>
                  Independently handled all aspects of development including project management, 
                  backend and frontend implementation
                </li>
                <li>
                  Managed the complete product lifecycle from concept to launch, including mentorship 
                  of junior developers
                </li>
                <li>
                  Developed a scalable architecture capable of handling increasing user loads
                </li>
              </ul>
            </div>
            
            <p className="text-sm mt-1 print:text-[10px] print:mt-0">
              Technologies used: .NET Core, C#, Python, Angular, MongoDB, Docker, RESTful APIs, 
              Machine Learning algorithms for audio analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
