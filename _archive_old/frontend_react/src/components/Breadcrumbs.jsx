import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Breadcrumbs component for SEO and navigation
 * Automatically generates schema.org BreadcrumbList JSON-LD
 */
const Breadcrumbs = ({ items }) => {
  if (!items || items.length === 0) return null;

  // Generate schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://drharshaortho.com"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.name,
        "item": `https://drharshaortho.com${item.path}`
      }))
    ]
  };

  return (
    <>
      {/* Schema.org BreadcrumbList */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      {/* Visual Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center flex-wrap gap-1 text-sm text-gray-600">
          <li className="flex items-center">
            <Link 
              to="/" 
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <Home className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only">Home</span>
            </Link>
          </li>
          
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
              {index === items.length - 1 ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link 
                  to={item.path} 
                  className="hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumbs;
