
const EducationSection = () => {
  return (
    <div className="print:break-inside-avoid">
      <h3 className="text-xl font-semibold text-gray-800 mb-3 print:text-base print:mb-2">Education</h3>
      
      <div className="space-y-4 print:space-y-2">
        <div>
          <div className="flex justify-between">
            <h4 className="font-medium text-gray-900 print:text-sm">Master's Degree, Technological Entrepreneurship</h4>
            <span className="text-sm text-gray-600 print:text-xs">2024</span>
          </div>
          <p className="text-gray-700 print:text-xs">Innopolis University</p>
          <p className="text-sm text-gray-600 mt-1 print:text-xs print:mt-0">
            Gained expertise in implementing high-load projects and acquired business management 
            experience in the IT sector
          </p>
        </div>
        
        <div>
          <div className="flex justify-between">
            <h4 className="font-medium text-gray-900 print:text-sm">Bachelor's Degree, Software Engineering</h4>
            <span className="text-sm text-gray-600 print:text-xs">2022</span>
          </div>
          <p className="text-gray-700 print:text-xs">Higher School of Economics, Perm</p>
          <p className="text-sm text-gray-600 mt-1 print:text-xs print:mt-0">
            Acquired core knowledge in OOP, client-server architecture, and database management. 
            Implemented various projects including machine learning and computer graphics applications
          </p>
        </div>
        
        <div>
          <div className="flex justify-between">
            <h4 className="font-medium text-gray-900 print:text-sm">Professional Development, AI Architecture</h4>
            <span className="text-sm text-gray-600 print:text-xs">2023-2024</span>
          </div>
          <p className="text-gray-700 print:text-xs">Innopolis University</p>
          <p className="text-sm text-gray-600 mt-1 print:text-xs print:mt-0">
            Enhanced skills in statistical analysis and implementation of machine learning 
            models in real-world projects
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationSection;
