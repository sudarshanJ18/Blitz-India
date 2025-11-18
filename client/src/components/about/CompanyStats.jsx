import React from 'react';

const CompanyStats = () => {
  const stats = [
    {
      value: "200+",
      label: "Projects Completed",
      description: "Successfully delivered over 200 engineering projects across various industries."
    },
    {
      value: "98%",
      label: "Client Satisfaction",
      description: "Maintaining a 98% client satisfaction rate through quality, speed, and communication."
    },
    {
      value: "15+",
      label: "Industries Served",
      description: "Expertise spanning automotive, aerospace, medical, energy, and more."
    },
    {
      value: "50+",
      label: "Expert Engineers",
      description: "A dedicated team of over 50 skilled engineers and technical specialists."
    },
    {
      value: "24/7",
      label: "Global Support",
      description: "Providing round-the-clock support to our clients across different time zones."
    },
    {
      value: "10+",
      label: "Years of Excellence",
      description: "A decade of experience in delivering high-quality engineering solutions."
    }
  ];

  return (
    <section className="min-h-screen flex items-center py-16 md:py-20 lg:py-24 bg-gray-800 text-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bold Title */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-tight">
            ACHIEVEMENTS
            <br />
            IN <span className="text-orange-600">NUMBERS</span>
          </h2>
        </div>

        <div className="mb-10 md:mb-12">
          <p className="text-base md:text-lg text-gray-300 max-w-4xl leading-relaxed">
            We are proud of the impact we've made. Our growth and success are a testament to our commitment to 
            excellence and the trust our clients place in us.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border-l-4 border-orange-600 pl-4 md:pl-6 py-3 md:py-4 group hover:border-white transition-colors duration-300"
            >
              <div className="text-5xl sm:text-6xl md:text-7xl font-black text-orange-600 mb-2 md:mb-3 group-hover:text-white transition-colors duration-300">
                {stat.value}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 uppercase">
                {stat.label}
              </h3>
              <p className="text-base sm:text-lg font-medium text-gray-400 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyStats;