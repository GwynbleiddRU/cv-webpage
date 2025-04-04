import { Github } from "lucide-react";
import { cn } from "@/lib/utils";

const ProjectsSection = () => {
  return (
    <div className="print:break-inside-avoid">
      <h3 className="text-xl font-semibold text-gray-800 mb-3 print:text-base">Notable Projects</h3>
      
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 print:gap-2"
        style={{
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "0.5rem"
        }}
      >
        <a href="https://github.com/TuneLike/tunelike-api" target="_blank" rel="noopener noreferrer" className={cn(
          "border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm">TuneLike - Social Music Platform API</h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0">Secure API for a social platform</p>
          <p className="text-gray-700 text-sm print:text-xs">
            A feature-rich API supporting authentication, real-time chat, intelligent dating, 
            event discovery, and analytics-driven recommendations.
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px]">
            Technologies: C#, ASP.NET Core, SignalR, MongoDB, Nginx, JWT Authentication
          </p>
        </a>

        <a href="https://github.com/GwynbleiddRU/api-moducart" target="_blank" rel="noopener noreferrer" className={cn(
          "border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm">ModuCart - Modular E-Commerce API</h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0">Scalable e-commerce platform with microservices</p>
          <p className="text-gray-700 text-sm print:text-xs">
            A modular and secure e-commerce system leveraging ASP.NET Core, Ocelot API Gateway, 
            JWT authentication, and Consul for service discovery and load balancing.
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px]">
            Technologies: C#, .NET 9, ASP.NET Core, MongoDB, Docker, Kubernetes
          </p>
        </a>
        
        <div className={cn(
          "border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm">Playlist Recommendation Engine</h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0">Based on user biometric indicators</p>
          <p className="text-gray-700 text-sm print:text-xs">
            Application that analyzes user biometric data to recommend personalized playlists, 
            enhancing user experience through intelligent content matching.
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px]">
            Technologies: Xamarin, ASP.NET Core, Java, Python
          </p>
        </div>
        
        <a href="https://github.com/GwynbleiddRU/Nodes" target="_blank" rel="noopener noreferrer" className={cn(
          "border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm">Diagram Editor & Constructor</h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0">Visual design tool</p>
          <p className="text-gray-700 text-sm print:text-xs">
            Developed a sophisticated editor for creating and manipulating diagrams and flowcharts
            with an intuitive user interface and extensive functionality.
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px]">
            Technologies: .NET, C#, WPF
          </p>
        </a>
        
        <a href="https://github.com/GwynbleiddRU/3DStruct" target="_blank" rel="noopener noreferrer" className={cn(
          "border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm">2D/3D Graphics Editor</h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0">With matrix transformation capabilities</p>
          <p className="text-gray-700 text-sm print:text-xs">
            Created a specialized editor for 2D and 3D graphics manipulation, implementing
            complex matrix transformations and rendering algorithms.
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px]">
            Technologies: OpenGL, WinForms
          </p>
        </a>
        
        <a href="https://www.youtube.com/watch?v=VNeDhh1Ge9U" target="_blank" rel="noopener noreferrer" className={cn(
          "border border-gray-200 rounded-lg p-3 print:p-2 hover:shadow-md transition-shadow",
          "print:break-inside-avoid"
        )}>
          <h4 className="font-medium text-gray-900 print:text-sm">Manufacturing Database System</h4>
          <p className="text-sm text-gray-600 mb-1 print:text-xs print:mb-0">With automated calculations and reporting</p>
          <p className="text-gray-700 text-sm print:text-xs">
            Built a comprehensive database system for manufacturing environments featuring
            automated calculations, custom report generation, and optimized database queries.
          </p>
          <p className="text-xs text-gray-500 mt-1 print:text-[10px]">
            Technologies: MSSQL, EF/ADO.NET, MS Office integration
          </p>
        </a>
      </div>
      
      <div className="mt-4 print:mt-2 text-center">
        <p className="text-gray-700 text-sm print:text-xs">
          More detailed project information and code samples at GitHub:
        </p>
        <a 
          href="https://github.com/GwynbleiddRU" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center mt-1"
        >
          <Github className="h-4 w-4 mr-1 print:h-3 print:w-3" />
          <span className="print:text-xs">github.com/GwynbleiddRU</span>
        </a>
      </div>
    </div>
  );
};

export default ProjectsSection;
