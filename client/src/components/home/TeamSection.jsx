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

  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-left">
            Meet Our Team
          </h2>
        </div>

        {/* Animated Testimonials Layout */}
        <div className="relative h-[600px] mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === activeIndex
                  ? 'opacity-100 translate-x-0 scale-100'
                  : 'opacity-0 translate-x-full scale-95 pointer-events-none'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-center gap-12 h-full">
                {/* Image Section */}
                <div className="lg:w-2/5 flex justify-center">
                  <div className="relative">
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      className="w-80 h-80 rounded-2xl object-cover shadow-2xl border-4 border-[#4A5568]"
                    />
                    <div className="absolute -bottom-6 -right-6 bg-[#4A5568] text-white px-6 py-3 rounded-xl shadow-2xl border-2 border-white">
                      <h3 className="font-bold text-xl">{testimonial.name}</h3>
                      <p className="text-base sm:text-lg md:text-xl opacity-100 mt-1">{testimonial.designation}</p>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-3/5">
                  <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-[#4A5568] relative">
                    {/* Quote icon */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#4A5568] rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                      </svg>
                    </div>

                    {/* Quote */}
                    <blockquote className="text-gray-700 text-xl leading-relaxed mb-6 border-l-4 border-[#4A5568] pl-4 italic">
                      {testimonial.quote}
                    </blockquote>

                    {/* Experience & Profile */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl text-gray-500 bg-gray-100 px-4 py-2 rounded-full font-medium">
                          {testimonial.experience}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;