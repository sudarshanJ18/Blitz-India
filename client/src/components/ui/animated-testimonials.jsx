import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { teamMembers } from '../../assets/assets.js';
import { team } from '../../assets/assets.js';

const TeamSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const teamImages = [team.team1, team.team2, team.team3];

  const testimonials = teamMembers.slice(0, 3).map((member, index) => ({
    quote: member.bio,
    name: member.name,
    designation: member.role,
    src: teamImages[index] || member.image,
    expertise: member.expertise,
    experience: member.experience,
    id: member.id
  }));

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-left">
            Meet Our People
          </h2>
        </div>

        {/* Manual Animated Testimonials Layout */}
        <div className="relative h-[500px] mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                index === activeIndex
                  ? 'opacity-100 translate-x-0'
                  : index < activeIndex
                  ? 'opacity-0 -translate-x-10'
                  : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Image Section */}
                <div className="lg:w-1/3">
                  <div className="relative">
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      className="w-64 h-64 rounded-2xl object-cover shadow-2xl mx-auto"
                    />
                    <div className="absolute -bottom-4 -right-4 bg-[#4A5568] text-white px-4 py-2 rounded-lg shadow-lg">
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <p className="text-sm opacity-90">{testimonial.designation}</p>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-2/3">
                  <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-[#4A5568]">
                    {/* Expertise badges */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {testimonial.expertise.slice(0, 3).map((skill, skillIndex) => (
                          <span 
                            key={skillIndex} 
                            className="px-3 py-1 bg-[#4A5568] text-white text-sm rounded-full font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quote */}
                    <blockquote className="text-gray-700 text-xl leading-relaxed mb-6 italic">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Experience */}
                    <div className="mb-6">
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {testimonial.experience}
                      </span>
                    </div>

                    {/* Profile link */}
                    <Link
                      to={`/about#${testimonial.id}`}
                      className="inline-flex items-center text-[#4A5568] hover:text-[#2D3748] font-medium transition-colors duration-200"
                    >
                      View Full Profile
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mb-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-[#4A5568] scale-125' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Full Team CTA */}
        <div className="text-center">
          <Link
            to="/about"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#4A5568] hover:bg-[#2D3748] transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Meet the Full Team
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;