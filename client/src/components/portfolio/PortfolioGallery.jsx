import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets.js';
import styled from 'styled-components';

const PortfolioGallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'automotive', name: 'Automotive' },
    { id: 'aerospace', name: 'Aerospace' },
    { id: 'manufacturing', name: 'Manufacturing' },
    { id: 'energy', name: 'Energy' },
    { id: 'medical', name: 'Medical' }
  ];

  // Sample portfolio projects (you can replace with actual data from assets)
  const projects = [
    {
      id: 1,
      title: 'Automotive Chassis Design',
      category: 'automotive',
      description: 'Complete chassis design and analysis for electric vehicle platform',
      image: assets.project1,
      client: 'Tesla Motors',
      year: '2023',
      services: ['2D Drafting', 'FEA Analysis', '3D Modeling'],
      challenge: 'Design a lightweight yet strong chassis for electric vehicle platform',
      solution: 'Used advanced FEA analysis and topology optimization to achieve 25% weight reduction',
      results: '25% weight reduction, 30% cost savings, improved safety ratings'
    },
    {
      id: 2,
      title: 'Aerospace Component Analysis',
      category: 'aerospace',
      description: 'CFD analysis for aircraft wing components',
      image: assets.project2,
      client: 'Boeing',
      year: '2023',
      services: ['CFD Analysis', '3D Modeling', 'Technical Documentation'],
      challenge: 'Optimize wing design for improved fuel efficiency',
      solution: 'Comprehensive CFD analysis with multiple design iterations',
      results: '15% improvement in aerodynamic efficiency'
    },
    {
      id: 3,
      title: 'Medical Device Prototype',
      category: 'medical',
      description: '3D modeling and prototyping for surgical instrument',
      image: assets.project3,
      client: 'Medtronic',
      year: '2022',
      services: ['3D Modeling', 'Prototype Development', 'Reverse Engineering'],
      challenge: 'Create ergonomic design for minimally invasive surgical tool',
      solution: 'Iterative design process with surgeon feedback and 3D printing',
      results: '50% improvement in surgeon comfort, reduced procedure time by 20%'
    },
    {
      id: 4,
      title: 'Energy Turbine Design',
      category: 'energy',
      description: 'Wind turbine blade design and optimization',
      image: assets.team,
      client: 'Siemens Gamesa',
      year: '2022',
      services: ['FEA Analysis', 'Design Optimization', '2D Drafting'],
      challenge: 'Maximize energy capture while minimizing material costs',
      solution: 'Advanced aerodynamic modeling and material optimization',
      results: '20% increase in energy output, 15% reduction in material costs'
    },
    {
      id: 5,
      title: 'Manufacturing Line Design',
      category: 'manufacturing',
      description: 'Complete production line layout and optimization',
      image: assets.cfd,
      client: 'General Motors',
      year: '2021',
      services: ['2D Drafting', 'Process Optimization', 'Technical Documentation'],
      challenge: 'Redesign production line for 30% capacity increase',
      solution: 'Lean manufacturing principles with advanced simulation',
      results: '35% capacity increase, 25% reduction in cycle time'
    },
    {
      id: 6,
      title: 'Robotics Arm Development',
      category: 'manufacturing',
      description: 'Industrial robot arm design and kinematic analysis',
      image: assets.fea,
      client: 'ABB Robotics',
      year: '2021',
      services: ['3D Modeling', 'FEA Analysis', 'Kinematic Simulation'],
      challenge: 'Design lightweight robot arm with extended reach',
      solution: 'Carbon fiber composite design with optimized joint mechanisms',
      results: '40% weight reduction, 50% increase in reach, improved precision'
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
         <h2 className="text-6xl md:text-5xl font-bold text-gray-900 mb-4">
  Our <span className="text-orange-600">Portfolio</span>
</h2>

          {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of engineering projects across multiple industries
          </p> */}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeFilter === category.id
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300 hover:text-orange-600 shadow-sm'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group cursor-pointer"
              onClick={() => openModal(project)}
            >
              <StyledCardWrapper>
                <section className="container">
                  <div className="card">
                    <div className="content">
                      <p className="logo">{project.client}</p>
                      <div className="h6">{project.title}</div>
                      <div className="hover_content">
                        <p>{project.description}</p>
                        <div className="mt-4 text-orange-600 font-semibold flex items-center">
                          View Details
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>       
                </section>
              </StyledCardWrapper>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Your Project
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm" 
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  {selectedProject.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Client</h3>
                      <p className="text-base sm:text-lg font-medium text-gray-600">{selectedProject.client}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Year</h3>
                      <p className="text-base sm:text-lg font-medium text-gray-600">{selectedProject.year}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
                      <span className="bg-orange-100 text-orange-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {selectedProject.category.charAt(0).toUpperCase() + selectedProject.category.slice(1)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Services</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.services.map((service, index) => (
                          <span key={index} className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center">
                      <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Challenge
                    </h3>
                    <p className="text-base sm:text-lg font-medium text-gray-700 leading-relaxed">{selectedProject.challenge}</p>
                  </div>
                  <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center">
                      <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Solution
                    </h3>
                    <p className="text-base sm:text-lg font-medium text-gray-700 leading-relaxed">{selectedProject.solution}</p>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                    <h3 className="font-bold text-white mb-3 text-lg flex items-center">
                      <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Results
                    </h3>
                    <p className="text-base sm:text-lg font-medium text-orange-100 leading-relaxed">{selectedProject.results}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Styled Components for the new card
const StyledCardWrapper = styled.div`
  .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card {
    position: relative;
    display: flex;
    justify-content: center;
    cursor: pointer;
    width: 100%;
    padding: 2em 0;
    background: #FFF;
    box-shadow: 0 0 6px 0 rgba(32, 32, 36, 0.12);
    transition: all 0.35s ease;
    border-radius: 1rem;
    overflow: hidden;
  }

  .card::before, .card::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
  }

  .card::before {
    width: 0;
    opacity: 0;
    background: orange;
    transition: opacity 0 ease, width 0 ease;
    transition-delay: 0.5s;
  }

  .card::after {
    width: 100%;
    background: #f97316; /* orange-500 */
    transition: width 0.5s ease;
  }

  .card .content {
    width: 18em;
    max-width: 80%;
  }

  .card .logo {
    margin: 0 0 1em;
    font-weight: 700;
    font-size: 1.5rem;
    color: #f97316; /* orange-500 */
    transition: all 0.35s ease;
  }

  .card .h6 {
    color: #999;
    font-weight: 600;
    text-transform: uppercase;
    margin: 0;
    letter-spacing: 2px;
    font-size: 0.75rem;
  }

  .card .hover_content {
    overflow: hidden;
    max-height: 0;
    transform: translateY(1em);
    transition: all 0.55s ease;
  }

  .card .hover_content p {
    margin: 1.5em 0 0;
    color: #6E6E70;
    line-height: 1.4em;
    font-size: 1rem;
    font-weight: 500;
  }

  .card:hover {
    box-shadow: 0 10px 20px 0 rgba(32, 32, 36, 0.12);
  }

  .card:hover::before {
    width: 100%;
    opacity: 1;
    transition: opacity 0.5s ease, width 0.5s ease;
    transition-delay: 0;
  }

  .card:hover::after {
    width: 0;
    opacity: 0;
    transition: width 0 ease;
  }

  .card:hover .logo {
    margin-bottom: 0.5em;
  }

  .card:hover .hover_content {
    max-height: 10em;
    transform: none;
  }
`;

export default PortfolioGallery;