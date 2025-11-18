import React from 'react';
import { Link } from 'react-router-dom';
import Button from "@/components/common/Button.jsx";

const ServiceCTA = () => {
    return (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Start Your Project?
                </h2>
                <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                    Let's work together to bring your engineering vision to life. 
                    Contact us today for a consultation and discover how we can help you achieve your goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/contact">
                        <Button variant="secondary" size="lg">
                            Get In Touch
                        </Button>
                    </Link>
                    <Link to="/portfolio">
                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                            View Our Work
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ServiceCTA;