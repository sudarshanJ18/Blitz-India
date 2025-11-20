import React from "react";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";

// Your processSteps data structure
const processSteps = [
  {
    id: 1,
    icon: '📋',
    color: 'bg-orange-500',
    overview: {
      title: 'Initial Consultation',
      description: 'Discuss project requirements, timeline, and specific needs to understand your goals.'
    }
  },
  {
    id: 2,
    icon: '🎨',
    color: 'bg-gray-500',
    overview: {
      title: 'Project Planning',
      description: 'Team creates a detailed project plan with milestones, deliverables, and quality checkpoints.'
    }
  },
  {
    id: 3,
    icon: '⚙️',
    color: 'bg-orange-600',
    overview: {
      title: 'Execution & Development',
      description: 'Begin the engineering work using industry-standard tools and best practices.'
    }
  },
  {
    id: 4,
    icon: '✅',
    color: 'bg-gray-600',
    overview: {
      title: 'Quality Assurance',
      description: 'Every deliverable goes through rigorous quality checks and validation processes.'
    }
  }
];

const ServicesProcess = () => {
  const features = [
    {
      title: processSteps[0].overview.title,
      description: processSteps[0].overview.description,
      
      className: "col-span-1 lg:col-span-4 border-b lg:border-r border-gray-200",
    },
    {
      title: processSteps[1].overview.title,
      description: processSteps[1].overview.description,
      
      className: "border-b col-span-1 lg:col-span-2 border-gray-200",
    },
    {
      title: processSteps[2].overview.title,
      description: processSteps[2].overview.description,
     
      className: "col-span-1 lg:col-span-3 lg:border-r border-gray-200",
    },
    {
      title: processSteps[3].overview.title,
      description: processSteps[3].overview.description,
   
      className: "col-span-1 lg:col-span-3 border-b lg:border-none border-gray-200",
    },
  ];

  return (
    <section className="relative z-20 py-8 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-left">
            Service Process
          </h2>
          
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-6 mt-8 xl:border rounded-md border-gray-200 bg-white">
            {features.map((feature) => (
              <FeatureCard key={feature.title} className={feature.className}>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
                <div className="h-full w-full">{feature.skeleton}</div>
              </FeatureCard>
            ))}
          </div>
        </div>

        {/* Bottom features section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center p-5 rounded-lg bg-white border border-gray-200 hover:shadow-xl hover:border-orange-200 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 transition-colors duration-300">
              <svg className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-black mb-2 group-hover:text-orange-600 transition-colors duration-300">Quality Assurance</h3>
            <p className="text-lg text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Every project undergoes multiple quality checks to ensure accuracy and reliability.</p>
          </div>

          <div className="text-center p-5 rounded-lg bg-white border border-gray-200 hover:shadow-xl hover:border-gray-300 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-600 transition-colors duration-300">
              <svg className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-black mb-2 group-hover:text-gray-700 transition-colors duration-300">Timely Delivery</h3>
            <p className="text-lg text-gray-600 group-hover:text-gray-700 transition-colors duration-300">We adhere to strict timelines and provide regular updates throughout the project.</p>
          </div>

          <div className="text-center p-5 rounded-lg bg-white border border-gray-200 hover:shadow-xl hover:border-orange-200 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 transition-colors duration-300">
              <svg className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-black mb-2 group-hover:text-orange-600 transition-colors duration-300">Expert Support</h3>
            <p className="text-lg text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Our team of experienced engineers is available for consultation and support.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ children, className }) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden bg-white hover:bg-gray-50 transition-all duration-300 group cursor-pointer`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }) => {
  return (
    <p className="max-w-5xl mx-auto text-left tracking-tight text-black text-2xl md:text-3xl md:leading-snug group-hover:text-orange-600 transition-colors duration-300">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }) => {
  return (
    <p className={cn(
      "text-lg md:text-xl max-w-4xl text-left mx-auto",
      "text-gray-600 text-center font-normal",
      "text-left max-w-sm mx-0 md:text-lg my-2 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed"
    )}>
      {children}
    </p>
  );
};

export default ServicesProcess;