import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Structured Data Component for Schema.org
 * Adds JSON-LD structured data for better SEO
 */
const StructuredData = ({ type = 'Organization', data = null }) => {
    // Default organization schema
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Blitz India Engineering",
        "url": "https://yourdomain.com",
        "logo": "https://yourdomain.com/logo.png",
        "description": "Leading engineering consultancy providing 2D/3D CAD drafting, FEA & CFD analysis, reverse engineering, and prototype development services.",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN",
            "addressLocality": "India"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-XXX-XXX-XXXX",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["en", "hi"]
        },
        "sameAs": [
            "https://www.linkedin.com/company/blitzindia",
            "https://twitter.com/BlitzIndiaEng"
        ]
    };

    // Service schema template
    const serviceSchema = (serviceData) => ({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": serviceData.name,
        "description": serviceData.description,
        "provider": {
            "@type": "Organization",
            "name": "Blitz India Engineering"
        }
    });

    // Article schema template (for blogs)
    const articleSchema = (articleData) => ({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": articleData.title,
        "description": articleData.description,
        "image": articleData.image,
        "datePublished": articleData.publishedDate,
        "dateModified": articleData.modifiedDate || articleData.publishedDate,
        "author": {
            "@type": "Person",
            "name": articleData.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Blitz India Engineering",
            "logo": {
                "@type": "ImageObject",
                "url": "https://yourdomain.com/logo.png"
            }
        }
    });

    // Breadcrumb schema template
    const breadcrumbSchema = (items) => ({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    });

    // Select schema based on type
    let schema;
    switch (type) {
        case 'Organization':
            schema = organizationSchema;
            break;
        case 'Service':
            schema = serviceSchema(data);
            break;
        case 'Article':
            schema = articleSchema(data);
            break;
        case 'Breadcrumb':
            schema = breadcrumbSchema(data);
            break;
        default:
            schema = data || organizationSchema;
    }

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

export default StructuredData;
