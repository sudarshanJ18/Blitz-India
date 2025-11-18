import React from 'react';

const CompanyCapabilities = () => {
  const capabilities = [
    {
      title: "Advanced CAD/CAM",
      description: "Utilizing industry-leading software like CATIA, SolidWorks, and AutoCAD for precise 2D drafting and 3D modeling.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
        </svg>
      )
    },
    {
      title: "FEA & CFD Analysis",
      description: "Performing complex structural and fluid dynamics simulations with ANSYS, Abaqus, and OpenFOAM to optimize designs.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Reverse Engineering",
      description: "Equipped with 3D scanners and CMM machines to accurately capture and replicate existing components.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M4 14v5h5m11-5h-5v5M15 4h5v5" />
        </svg>
      )
    },
    {
      title: "Rapid Prototyping",
      description: "In-house FDM and SLA 3D printers for quick and cost-effective prototype development and validation.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Quality Assurance Lab",
      description: "A dedicated lab with advanced metrology tools to ensure all products meet stringent quality standards.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Secure Data Infrastructure",
      description: "Robust and secure IT infrastructure to protect client intellectual property and project data.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ];

  return (
    <section className="min-h-screen flex items-center py-16 md:py-20 lg:py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bold Title */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-800 uppercase leading-tight">
            TECHNICAL
            <br />
            <span className="text-orange-600">CAPABILITIES</span>
            <br />
            & INFRASTRUCTURE
          </h2>
        </div>

        <div className="mb-10 md:mb-12">
          {/* <p className="text-base md:text-lg text-gray-500 max-w-4xl leading-relaxed">
            We invest in the latest technology and infrastructure to provide our clients with state-of-the-art 
            engineering solutions and ensure the highest levels of quality and security.
          </p> */}
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="group"
            >
              <div className="bg-gray-800 p-5 md:p-6 mb-4 hover:bg-orange-600 transition-colors duration-300">
                <div className="flex items-center justify-center">
                  {capability.icon}
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-gray-800 mb-3 uppercase">
                {capability.title}
              </h3>
              <p className="text-base sm:text-lg font-medium text-gray-500 leading-relaxed">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyCapabilities;