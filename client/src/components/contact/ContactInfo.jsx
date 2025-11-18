import React from 'react';

const ContactInfo = () => {
  const iconClass = "w-6 h-6 text-gray-600";

  const locationIcon = (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 21c-4.5-5-7-8.167-7-11a7 7 0 1114 0c0 2.833-2.5 6-7 11z" />
      <circle cx="12" cy="10" r="2.5" fill="currentColor" />
    </svg>
  );

  const phoneIcon = (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h2.2a1 1 0 01.95.69l1 3a1 1 0 01-.54 1.22L7.6 8.6a11.05 11.05 0 005.8 5.8l.69-1.01a1 1 0 011.22-.54l3 1a1 1 0 01.69.95V19a2 2 0 01-2 2h-1C8.924 21 3 15.076 3 7.9V5z" />
    </svg>
  );

  const emailIcon = (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16a2 2 0 012 2l-10 6L2 8a2 2 0 012-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M22 8v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8" />
    </svg>
  );

  const clockIcon = (
    <svg className={`${iconClass} mr-3`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 7v5l3 2" />
    </svg>
  );

  const socialIconClass = "w-6 h-6";

  const socialIcons = {
    LinkedIn: (
      <svg className={socialIconClass} fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 8.75h3.95V21H3zM9.25 8.75H13v1.68h.05c.52-.98 1.8-2.01 3.7-2.01 3.96 0 4.7 2.6 4.7 5.98V21h-3.95v-5.02c0-1.2-.02-2.74-1.7-2.74-1.7 0-1.96 1.3-1.96 2.65V21H9.25z" />
      </svg>
    ),
    Twitter: (
      <svg className={socialIconClass} fill="currentColor" viewBox="0 0 24 24">
        <path d="M21.5 6.5a6 6 0 01-1.77.5 3.08 3.08 0 001.36-1.7 6.16 6.16 0 01-1.94.77 3.07 3.07 0 00-5.26 2.1c0 .24.03.48.08.7A8.77 8.77 0 014 5.45a3.07 3.07 0 00.95 4.09 3.05 3.05 0 01-1.39-.38v.04a3.07 3.07 0 002.46 3 3.1 3.1 0 01-1.38.05 3.08 3.08 0 002.86 2.13A6.18 6.18 0 013 17.54 8.7 8.7 0 008.72 19c5.23 0 8.09-4.33 8.09-8.08 0-.12 0-.24-.01-.36a5.8 5.8 0 001.7-1.66z" />
      </svg>
    ),
    Facebook: (
      <svg className={socialIconClass} fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12a10 10 0 10-11.5 9.87v-6.99H8.43V12h2.07V9.8c0-2.05 1.22-3.18 3.08-3.18.89 0 1.83.16 1.83.16v2.02h-1.03c-1.02 0-1.34.63-1.34 1.27V12h2.28l-.36 2.88h-1.92v6.99A10 10 0 0022 12z" />
      </svg>
    ),
  };

  const contactDetails = [
    {
      icon: locationIcon,
      title: 'Our Headquarters',
      info: 'Pune, Maharashtra, India'
    },
    {
      icon: phoneIcon,
      title: 'Phone',
      info: '+91 91585 75785'
    },
    {
      icon: emailIcon,
      title: 'Email',
      info: 'info@blitzindiaengineering.com'
    }
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 3:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  const socialLinks = [
    { icon: socialIcons.LinkedIn, href: '#', name: 'LinkedIn' },
    { icon: socialIcons.Twitter, href: '#', name: 'Twitter' },
    { icon: socialIcons.Facebook, href: '#', name: 'Facebook' }
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">Contact Information</h2>

      <div className="space-y-8">
        {contactDetails.map((item, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              {item.icon}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-700">{item.title}</h3>
              <p className="text-gray-600 mt-1">{item.info}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          {clockIcon}
          Business Hours
        </h3>
        <ul className="space-y-3 text-gray-600">
          {businessHours.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span className="text-gray-700">{item.day}</span>
              <span className="font-medium text-gray-800">{item.hours}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Follow Us</h3>
        <div className="flex space-x-5">
          {socialLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              aria-label={link.name}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-50"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;