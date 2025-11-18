import React from 'react';

const CompanyValues = () => {
  const values = [
    {
      title: "Excellence",
      description: "We are committed to delivering the highest quality in everything we do, from engineering design to client service.",
      icon: (
        <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    },
    {
      title: "Innovation",
      description: "We embrace creativity and continuously seek innovative solutions to complex engineering challenges.",
      icon: (
        <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.636 6.364l.707-.707M12 21v-1m-6.364-1.636l.707-.707" />
        </svg>
      )
    },
    {
      title: "Integrity",
      description: "We conduct our business with the utmost integrity, ensuring transparency, honesty, and ethical practices.",
      icon: (
        <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.752z" />
        </svg>
      )
    },
    {
      title: "Collaboration",
      description: "We believe in the power of teamwork, fostering a collaborative environment both internally and with our clients.",
      icon: (
        <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Customer Focus",
      description: "Our clients are at the heart of everything we do. We are dedicated to understanding their needs and exceeding their expectations.",
      icon: (
        <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Continuous Learning",
      description: "We are committed to continuous learning and development, staying at the forefront of engineering technologies and practices.",
      icon: (
        <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" />
        </svg>
      )
    }
  ];

  return (
    <section className="min-h-screen flex items-center py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bold Title */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-800 uppercase leading-tight">
            OUR CORE
            <br />
            <span className="text-orange-600">VALUES</span>
          </h2>
        </div>

        <div className="mb-10 md:mb-12">
          <p className="text-base md:text-lg text-gray-500 max-w-4xl leading-relaxed">
            The principles that guide our decisions, actions, and culture. These values are the foundation of our 
            commitment to our clients, our team, and our community.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {values.map((value, index) => (
            <div
              key={index}
              className="group"
            >
              <div className="mb-4 md:mb-6">
                {value.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-gray-800 mb-3 md:mb-4 uppercase group-hover:text-orange-600 transition-colors duration-300">
                {value.title}
              </h3>
              <p className="text-base sm:text-lg font-medium text-gray-500 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyValues;