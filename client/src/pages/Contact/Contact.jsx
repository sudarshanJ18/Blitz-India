import React from 'react';
import ContactHeader from '../../components/contact/ContactHeader.jsx';
import ContactForm from '../../components/contact/ContactForm.jsx';
import ContactInfo from '../../components/contact/ContactInfo.jsx';
import ContactMap from '../../components/contact/ContactMap.jsx';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <ContactHeader />
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </div>
      <ContactMap />
    </div>
  );
};

export default Contact;