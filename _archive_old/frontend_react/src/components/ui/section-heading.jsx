import React from 'react';

export const SectionHeading = ({ badge, title, subtitle, centered = true }) => {
  return (
    <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''} mb-12`}>
      {badge && (
        <span className="inline-flex items-center px-3 py-1 bg-primary/15 text-primary font-semibold text-sm rounded-full mb-4" style={{ color: 'hsl(174 72% 22%)' }}>
          {badge}
        </span>
      )}
      {title && (
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-4">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-lg text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
