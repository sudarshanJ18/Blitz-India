import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  IconClipboardText,
  IconCalendarStats,
  IconSettings,
  IconChecklist,
  IconShieldCheck,
  IconClock,
  IconUsers
} from "@tabler/icons-react";

const processSteps = [
  {
    id: 1,
    icon: IconClipboardText,
    color: 'bg-orange-500',
    overview: {
      title: 'Initial Consultation',
      description: 'Discuss project requirements, timeline, and specific needs to understand your goals.'
    }
  },
  {
    id: 2,
    icon: IconCalendarStats,
    color: 'bg-gray-500',
    overview: {
      title: 'Project Planning',
      description: 'Team creates a detailed project plan with milestones, deliverables, and quality checkpoints.'
    }
  },
  {
    id: 3,
    icon: IconSettings,
    color: 'bg-orange-600',
    overview: {
      title: 'Execution & Development',
      description: 'Begin the engineering work using industry-standard tools and best practices.'
    }
  },
  {
    id: 4,
    icon: IconChecklist,
    color: 'bg-gray-600',
    overview: {
      title: 'Quality Assurance',
      description: 'Every deliverable goes through rigorous quality checks and validation processes.'
    }
  }
];

const ServicesProcess = () => {
  return (
    <section className="relative z-20 py-4 lg:py-8 bg-white font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-left">
            Service Process
          </h2>
        </div>

        {/* Alternating Left-Right Layout */}
        <div className="relative mt-8 px-4 sm:px-6 lg:px-8">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-gray-400 to-orange-600 hidden lg:block"></div>

          <div className="space-y-3 lg:space-y-5">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              const IconComponent = step.icon;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col lg:flex-row items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } gap-4 lg:gap-8`}
                >
                  {/* Left Content - Even steps show on left, odd steps show on right */}
                  <div className={`lg:w-1/2 ${isEven ? 'lg:pr-4' : 'lg:pl-4'}`}>
                    <div className="bg-white p-5 rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:border-orange-200 group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center text-white shadow-lg`}>
                          <IconComponent size={20} />
                        </div>
                        <span className="text-xl font-bold text-gray-500">Step {step.id}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                        {step.overview.title}
                      </h3>
                      <p className="text-xl text-gray-600 leading-relaxed">
                        {step.overview.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Timeline Dot */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full border-4 border-white bg-orange-500 shadow-lg z-10"></div>

                  {/* Right Spacer - For alternating layout */}
                  <div className="lg:w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Simple List - Reduced spacing */}
        <div className="lg:hidden mt-6 space-y-3 px-4">
          {processSteps.map((step, index) => {
            const IconComponent = step.icon;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-5 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center text-white shadow-lg`}>
                    <IconComponent size={20} />
                  </div>
                  <span className="text-2xl font-bold text-gray-500">Step {step.id}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.overview.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {step.overview.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom features section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8">
          <div className="text-center p-4 rounded-lg bg-white border border-gray-200 hover:shadow-xl hover:border-orange-200 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-500 transition-colors duration-300">
              <IconShieldCheck className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-lg font-bold text-black mb-2 group-hover:text-orange-600 transition-colors duration-300">Quality Assurance</h3>
            <p className="text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Every project undergoes multiple quality checks to ensure accuracy and reliability.</p>
          </div>

          <div className="text-center p-4 rounded-lg bg-white border border-gray-200 hover:shadow-xl hover:border-gray-300 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-600 transition-colors duration-300">
              <IconClock className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-lg font-bold text-black mb-2 group-hover:text-gray-700 transition-colors duration-300">Timely Delivery</h3>
            <p className="text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300">We adhere to strict timelines and provide regular updates throughout the project.</p>
          </div>

          <div className="text-center p-4 rounded-lg bg-white border border-gray-200 hover:shadow-xl hover:border-orange-200 hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-500 transition-colors duration-300">
              <IconUsers className="w-5 h-5 text-orange-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-lg font-bold text-black mb-2 group-hover:text-orange-600 transition-colors duration-300">Expert Support</h3>
            <p className="text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Our team of experienced engineers is available for consultation and support.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesProcess;