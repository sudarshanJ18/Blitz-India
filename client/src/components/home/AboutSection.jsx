import React, { useState } from 'react';
import { values } from "../../assets/assets";


const ImageComponent = ({ src, alt }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
      <img
        src={src}
        alt={alt}
        className="relative z-10 w-full h-48 object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 border-2 border-white/20 group-hover:border-blue-300/30"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

const AboutSection = () => {
  
  const images = [
    {
      src: values.about1,
      alt: "Engineering Design"
    },
    {
      src: values.about2,
      alt: "Technical Analysis"
    },
    {
      src: values.about3,
      alt: "Quality Assurance"
    }
  ];

  return (
    <section className="py-12 bg-white-50 white:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          
          <div className="relative">
            
            <div className="grid grid-cols-2 gap-4 relative z-10">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={index === 0 ? "col-span-2" : "col-span-1"}
                >
                  <ImageComponent
                    src={image.src}
                    alt={image.alt}
                  />
                </div>
              ))}
            </div>
          </div>

          
          <div className="space-y-6">
            <div className="space-y-6">
              <h2 className="font-serif font-bold leading-tight tracking-tight text-black dark:text-black 
              text-3xl sm:text-4xl lg:text-5xl">

                Engineering Excellence
                <span className="block mt-2">
                  Global Presence
                </span>
              </h2>


              <div className="space-y-5">
                <p className="text-base sm:text-lg font-medium text-black-600 white:text-gray-300 leading-relaxed tracking-wide">
                  Accelerating innovation with cutting-edge engineering solutions,
                  rigorous quality standards, and seamless global delivery from India's
                  premier technical hub.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default AboutSection;