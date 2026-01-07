import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({
    title = 'Blitz India Engineering - Engineering Excellence',
    description = 'Leading engineering consultancy providing 2D/3D CAD drafting, FEA & CFD analysis, reverse engineering, and prototype development services.',
    keywords = 'engineering, CAD drafting, 3D modeling, FEA analysis, CFD analysis, reverse engineering, prototype development, manufacturing, India',
    url = typeof window !== 'undefined' ? window.location.href : '',
    image = '/og-image.jpg',
    type = 'website',
    author = 'Blitz India Engineering',
    twitterHandle = '@BlitzIndiaEng'
}) => {
    const siteName = 'Blitz India Engineering';
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

    return (
        <Helmet>
            
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />

            
            {url && <link rel="canonical" href={url} />}

            
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            {url && <meta property="og:url" content={url} />}
            {image && <meta property="og:image" content={image} />}
            <meta property="og:site_name" content={siteName} />

            
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            {image && <meta name="twitter:image" content={image} />}
            {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
            {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}

            
            <meta name="robots" content="index, follow" />
            <meta name="googlebot" content="index, follow" />
            <meta name="format-detection" content="telephone=no" />
            <meta httpEquiv="x-ua-compatible" content="IE=edge" />

            
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#ea580c" />
        </Helmet>
    );
};

export default SEOHead;
