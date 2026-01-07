import React, { cloneElement, isValidElement } from 'react';
import { Link } from 'react-router-dom';
import Threads from '../ui/Threads';
import MechanicalDecorations from '../ui/MechanicalDecorations';

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
}) => {
  const isCenter = align === 'center';
  const textAlignClass = isCenter ? 'text-center' : 'text-left';
  const justifyClass = isCenter ? 'justify-center' : 'justify-start';
  const contentWidthClass = isCenter ? 'max-w-4xl mx-auto' : 'max-w-3xl';

  return (
    <section className="relative py-16 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden min-h-[60vh] flex items-center">
      
      <div className="absolute inset-0 overflow-hidden">
        <Threads
          color={[0.55, 0.57, 0.60]} 
          amplitude={0.8}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>

      
      <MechanicalDecorations />

      
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.02] via-transparent to-gray-600/[0.02]" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-100/60 via-transparent to-white/40 pointer-events-none" />

      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {topSlot && <div className="mb-8">{typeof topSlot === 'function' ? topSlot() : topSlot}</div>}

        <div className={`${contentWidthClass} ${textAlignClass}`}>
          {subtitle && (
            <p className="text-sm uppercase tracking-[0.3em] text-gray-600 mb-4 font-medium">
              {subtitle}
            </p>
          )}

          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">{title}</h1>

          {description && (
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              {description}
            </p>
          )}

          {badges.length > 0 && (
            <div className={`flex flex-wrap ${justifyClass} gap-4 text-gray-600 mb-8`}>
              {badges.map(({ icon: Icon, label }, index) => (
                <span key={index} className="flex items-center">
                  {Icon && <Icon className="w-5 h-5 mr-2 text-orange-600" />}
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
        'inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-lg hover:shadow-orange-600/30',
    },
    {
      to: '/portfolio',
      label: 'View Related Projects',
      className:
        'inline-flex items-center justify-center px-8 py-3 border-2 border-gray-800 text-base font-medium rounded-md text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200',
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
        className="inline-flex items-center text-gray-600 hover:text-orange-600 transition-colors duration-200"
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

      <div className="text-sm text-gray-600">
        {service.categoryId && service.subId && (
          <span className="mr-2 font-semibold text-gray-800">
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