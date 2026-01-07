import React from 'react';
import { Link } from 'react-router-dom';
import { teamMembers } from '../../assets/assets';

const LeadershipTeam = () => {

  return (
    <section className="min-h-screen flex items-center py-16 md:py-20 lg:py-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 uppercase leading-tight">
            MEET OUR
            <br />
            <span className="text-orange-600">LEADERSHIP</span>
            <br />
            TEAM
          </h2>
        </div>

        <div className="mb-12 md:mb-16">
          
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group"
            >
              <div className="relative overflow-hidden mb-4 md:mb-6 bg-gray-900">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-72 sm:h-80 md:h-96 object-cover group-hover:opacity-90 transition-all duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase">
                    {member.name}
                  </h3>
                  <p className="text-orange-600 font-bold text-base md:text-lg">
                    {member.role}
                  </p>
                  <p className="text-gray-300 text-xs md:text-sm mt-1">
                    {member.experience} | {member.education}
                  </p>
                </div>
              </div>

              <div>
                
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;