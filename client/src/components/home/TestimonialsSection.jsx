import React, { useState, useEffect } from 'react';
import * as testimonialsService from '../../services/testimonials.service';

const TestimonialsSection = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    
    useEffect(() => {
        if (testimonials.length <= 1 || isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 2000); 

        return () => clearInterval(interval);
    }, [testimonials.length, isPaused]);

    const fetchTestimonials = async () => {
        try {
            
            const data = await testimonialsService.getAllTestimonials({ featured: true });
            setTestimonials(data || []);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        } finally {
            setLoading(false);
        }
    };

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    if (loading) {
        return (
            <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                </div>
            </section>
        );
    }

    if (testimonials.length === 0) {
        return null; 
    }

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className="py-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center mb-6">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-2">
                        Hear from our <span className="text-orange-600">customers</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-orange-400 mx-auto rounded-full"></div>
                </div>

                
                <div
                    className="relative overflow-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 max-w-4xl mx-auto">
                        
                        <div className="absolute top-8 left-8 text-orange-200">
                            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                        </div>

                        
                        <div className="relative z-10 text-center">
                            <div
                                key={currentIndex}
                                className="animate-fadeIn"
                            >
                                <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed italic">
                                    "{currentTestimonial.testimonial}"
                                </p>

                                
                                <div className="flex flex-col items-center">
                                    {currentTestimonial.image ? (
                                        <img
                                            src={currentTestimonial.image}
                                            alt={currentTestimonial.name}
                                            className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-orange-200"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-2xl mb-4 border-4 border-orange-200">
                                            {currentTestimonial.name.charAt(0)}
                                        </div>
                                    )}
                                    <h4 className="text-xl font-bold text-gray-900">{currentTestimonial.name}</h4>
                                    <p className="text-gray-600 font-medium">{currentTestimonial.position}</p>
                                    <p className="text-orange-600 font-semibold">{currentTestimonial.company}</p>

                                    
                                    <div className="flex gap-1 mt-3">
                                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    {testimonials.length > 1 && (
                        <div className="flex justify-center gap-2 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                        ? 'bg-orange-600 w-8'
                                        : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
