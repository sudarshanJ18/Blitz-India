import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublicProjects } from '../../services/projects.service';
import styled from 'styled-components';

const PortfolioGallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'automotive', name: 'Automotive' },
    { id: 'aerospace', name: 'Aerospace' },
    { id: 'manufacturing', name: 'Manufacturing' },
    { id: 'energy', name: 'Energy' },
    { id: 'medical', name: 'Medical' }
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getPublicProjects();
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      const images = selectedProject.images || (selectedProject.image ? [selectedProject.image] : []);
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      const images = selectedProject.images || (selectedProject.image ? [selectedProject.image] : []);
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4">
            Our <span className="text-orange-600">Portfolio</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${activeFilter === category.id
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-orange-300 hover:text-orange-600 shadow-sm'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                className="group cursor-pointer"
                onClick={() => openModal(project)}
              >
                <StyledCardWrapper>
                  <section className="container">
                    <div className="card">
                      <div className="content">
                        <p className="logo">{project.client || 'Client'}</p>
                        <div className="h6">{project.title}</div>
                        <div className="hover_content">
                          <p>{project.shortDescription}</p>
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
        )}

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

      {selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
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

              {(() => {
                const images = selectedProject.images || (selectedProject.image ? [selectedProject.image] : []);
                if (images.length > 0) {
                  return (
                    <div className="relative mb-6 rounded-xl overflow-hidden bg-gray-900">
                      <img
                        src={`http://localhost:5000${images[currentImageIndex]}`}
                        alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                        className="w-full h-96 object-contain bg-gray-900"
                        loading="lazy"
                        decoding="async"
                      />

                      {images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>

                          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm">
                            {currentImageIndex + 1} / {images.length}
                          </div>

                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {images.map((_, index) => (
                              <button
                                key={index}
                                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                                className={`h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75 w-2'
                                  }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                }
                return null;
              })()}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Client</h3>
                      <p className="text-base sm:text-lg font-medium text-gray-600">{selectedProject.client || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Date</h3>
                      <p className="text-base sm:text-lg font-medium text-gray-600">{selectedProject.date || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
                      <span className="bg-orange-100 text-orange-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {selectedProject.category ? selectedProject.category.charAt(0).toUpperCase() + selectedProject.category.slice(1) : 'Uncategorized'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Duration</h3>
                      <p className="text-base sm:text-lg font-medium text-gray-600">{selectedProject.duration || 'N/A'}</p>
                    </div>
                    {selectedProject.services && selectedProject.services.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Services</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.services.map((service, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {selectedProject.challenge && (
                    <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                      <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center">
                        <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Challenge
                      </h3>
                      <p className="text-base sm:text-lg font-medium text-gray-700 leading-relaxed">{selectedProject.challenge}</p>
                    </div>
                  )}
                  {selectedProject.solution && (
                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                      <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center">
                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Solution
                      </h3>
                      <p className="text-base sm:text-lg font-medium text-gray-700 leading-relaxed">{selectedProject.solution}</p>
                    </div>
                  )}
                  {selectedProject.results && (
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <h3 className="font-bold text-white mb-3 text-lg flex items-center">
                        <svg className="w-5 h-5 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Results
                      </h3>
                      {Array.isArray(selectedProject.results) ? (
                        <ul className="text-base sm:text-lg font-medium text-green-50 leading-relaxed space-y-2">
                          {selectedProject.results.map((result, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-base sm:text-lg font-medium text-green-50 leading-relaxed">
                          {selectedProject.results}
                        </p>
                      )}
                    </div>
                  )}
                  {!selectedProject.challenge && !selectedProject.solution && !selectedProject.results && (
                    <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
                      <h3 className="font-bold text-gray-900 mb-3 text-lg">Description</h3>
                      <p className="text-base sm:text-lg font-medium text-gray-700 leading-relaxed">
                        {selectedProject.description || selectedProject.shortDescription}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

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
    background: #f97316;
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
    color: #f97316;
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