import React from 'react';

import { processSteps } from './processSteps.js';

const ServiceProcess = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Process</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We follow a systematic approach to ensure quality and timely delivery of your projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {processSteps.map(({ id, detail }) => (
            <div key={id} className="relative">
              <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {String(id).padStart(2, '0')}
                  </div>
<h3 className="text-2xl font-semibold text-gray-900 mb-4">{detail.title}</h3>
<p className="text-xl sm:text-2xl font-medium text-gray-600 leading-relaxed">{detail.description}</p>
                </div>
              </div>

              {id < processSteps.length && (
                <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-blue-600"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;