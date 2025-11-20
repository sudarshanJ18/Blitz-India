import React from 'react';
import { abouthero } from '../../assets/assets';

const CompanyStory = () => {
  return (
    <section className="min-h-screen flex items-center py-16 md:py-20 lg:py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bold Title Section */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-800 uppercase leading-tight">
            OUR JOURNEY:
            <br />
            FROM <span className="text-orange-600">VISION</span>
            <br />
            TO GLOBAL <span className="text-orange-600">IMPACT</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left Column - Story */}
          <div className="space-y-4 md:space-y-6">
            <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed">
              Founded in 2014, Blitz India Engineering started with a vision to bridge the gap between innovative ideas 
              and tangible product realities. Our journey began in Pune, the automotive hub of India, with a small but 
              highly skilled team of engineers passionate about solving complex design and manufacturing challenges.
            </p>
            <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed">
              In our early years, we focused on providing specialized 2D drafting and 3D modeling services to local 
              automotive clients. Our commitment to quality, speed, and precision quickly earned us a reputation for 
              excellence, leading to rapid growth and expansion into new industries, including aerospace, medical, and 
              renewable energy.
            </p>
            <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed">
            Today, Blitz India Engineering is a globally recognized engineering partner with a diverse portfolio of 
            successful projects and a team of over 50 dedicated professionals. We have expanded our capabilities to 
            include advanced FEA/CFD analysis, reverse engineering, and prototype development, offering end-to-end 
            solutions to clients worldwide.
          </p>
          </div>

          {/* Right Column - Image & Mission */}
          <div className="space-y-6 md:space-y-8">
            <div className="relative overflow-hidden bg-gray-900">
              <img
                src={abouthero.abouthero} 
                alt="Blitz India Engineering Office"
                className="w-full h-64 md:h-80 lg:h-96 object-cover hover:opacity-90 transition-all duration-500"
              />
              {/* High contrast overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20 pointer-events-none"></div>
            </div>
            <div className="bg-gray-800 text-white p-6 md:p-8">
              <h4 className="text-xl md:text-2xl font-bold mb-3 text-orange-600 uppercase">Our Mission</h4>
              <p className="text-sm md:text-base leading-relaxed text-gray-300">
                To be a trusted global partner for engineering solutions, driving innovation and excellence.
              </p>
              
            </div>
          </div>
        </div>

        {/* Additional Content */}
        <div className="mt-12 md:mt-16">
          {/* <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed">
            Today, Blitz India Engineering is a globally recognized engineering partner with a diverse portfolio of 
            successful projects and a team of over 50 dedicated professionals. We have expanded our capabilities to 
            include advanced FEA/CFD analysis, reverse engineering, and prototype development, offering end-to-end 
            solutions to clients worldwide.
          </p> */}
        </div>

        {/* Milestones */}
        <div className="mt-12 md:mt-16 lg:mt-20 border-t border-gray-300 pt-8 md:pt-12">
          <h3 className="text-3xl md:text-4xl font-black text-gray-800 mb-8 md:mb-12 uppercase">KEY <span className="text-orange-600">MILESTONES</span></h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div className="flex gap-3 md:gap-4">
              <span className="text-4xl md:text-5xl font-black text-orange-600 flex-shrink-0">2014</span>
              <p className="text-base sm:text-lg text-gray-500 font-medium pt-1 md:pt-2">Company founded in Pune, India</p>
            </div>
            {/* <div className="flex gap-3 md:gap-4"> */}
              {/* <span className="text-4xl md:text-5xl font-black text-orange-600 flex-shrink-0">2017</span> */}
              {/* <p className="text-base sm:text-lg text-gray-500 font-medium pt-1 md:pt-2">Expanded into aerospace and medical sectors</p> */}
            {/* </div> */}
            {/* <div className="flex gap-3 md:gap-4"> */}
              {/* <span className="text-4xl md:text-5xl font-black text-orange-600 flex-shrink-0">2020</span> */}
              {/* <p className="text-base sm:text-lg text-gray-500 font-medium pt-1 md:pt-2">Achieved ISO 9001:2015 certification</p> */}
            {/* </div> */}
            <div className="flex gap-3 md:gap-4">
              <span className="text-4xl md:text-5xl font-black text-orange-600 flex-shrink-0">2023</span>
              <p className="text-base sm:text-lg text-gray-500 font-medium pt-1 md:pt-2">Expanded to serve clients in 15+ countries</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;