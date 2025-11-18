import React, { cloneElement, isValidElement } from 'react';
import { Link } from 'react-router-dom';

const gradientBg = 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700';

export const CheckIcon = ({ className = 'w-5 h-5 mr-2' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export const HeroLayout = ({
  title,
  description,
  subtitle,
  topSlot,
  badges = [],
  actions = [],
  align = 'center',
  backgroundClass = gradientBg,
}) => {
  const isCenter = align === 'center';
  const textAlignClass = isCenter ? 'text-center' : 'text-left';
  const justifyClass = isCenter ? 'justify-center' : 'justify-start';
  const contentWidthClass = isCenter ? 'max-w-4xl mx-auto' : 'max-w-3xl';

  return (
    <section className={`py-16 ${backgroundClass} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {topSlot && <div className="mb-8">{typeof topSlot === 'function' ? topSlot() : topSlot}</div>}

        <div className={`${contentWidthClass} ${textAlignClass}`}>
          {subtitle && (
            <p className="text-sm uppercase tracking-[0.3em] text-blue-200 mb-4">
              {subtitle}
            </p>
          )}

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">{title}</h1>

          {description && (
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              {description}
            </p>
          )}

          {badges.length > 0 && (
            <div className={`flex flex-wrap ${justifyClass} gap-4 text-blue-200 mb-8`}>
              {badges.map(({ icon: Icon, label }, index) => (
                <span key={index} className="flex items-center">
                  {Icon && <Icon className="w-5 h-5 mr-2 text-blue-100" />}
                  {label}
                </span>
              ))}
            </div>
          )}

          {actions.length > 0 && (
            <div className={`flex flex-col sm:flex-row gap-4 ${justifyClass}`}>
              {actions.map((action, index) => {
                if (isValidElement(action)) {
                  return cloneElement(action, { key: index });
                }
                return (
                  <span key={index} className="inline-flex items-center">
                    {action}
                  </span>
                );
              })}
          </div>
          )}
        </div>
      </div>
    </section>
  );
};

const ServiceHero = ({ service }) => {
  if (!service) {
    return null;
  }

  const badges = [
    { icon: CheckIcon, label: 'Expert Team' },
    { icon: CheckIcon, label: service.timeline || 'Fast Delivery' },
    { icon: CheckIcon, label: 'Quality Guaranteed' },
  ];

  const actions = [
    {
      to: '/contact',
      label: 'Get Quote',
      className:
        'inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-gray-50 transition-colors duration-200',
    },
    {
      to: '/portfolio',
      label: 'View Related Projects',
      className:
        'inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-blue-800 transition-colors duration-200',
    },
  ].map(({ to, label, className }) => (
    <Link key={to} to={to} className={className}>
      {label}
    </Link>
  ));

  const topSlot = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Link
        to={service.categoryId ? `/services/${service.categoryId}` : '/services'}
        className="inline-flex items-center text-blue-200 hover:text-white transition-colors duration-200"
      >
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to {service.categoryId ? service.category : 'Services'}
      </Link>

      <div className="text-sm text-blue-200">
        {service.categoryId && service.subId && (
          <span className="mr-2 font-semibold text-blue-100">
            {service.categoryId}.{service.subId}
          </span>
        )}
        <span className="opacity-80">
          {service.category} / {service.title}
        </span>
      </div>
    </div>
  );

  return (
    <HeroLayout
      title={service.title}
      description={service.description}
      subtitle={service.category}
      badges={badges}
      actions={actions}
      topSlot={topSlot}
    />
  );
};

export default ServiceHero;