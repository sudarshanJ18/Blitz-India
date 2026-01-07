import React, { useState, useEffect, useRef } from 'react';


const LazyImage = ({
    src,
    alt,
    className = '',
    placeholder = '/placeholder.png',
    onLoad = () => { },
    onError = () => { },
    threshold = 0.01
}) => {
    const [imageSrc, setImageSrc] = useState(placeholder);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imageRef = useRef(null);

    useEffect(() => {
        
        if (!src) return;

        
        if (!('IntersectionObserver' in window)) {
            
            setImageSrc(src);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && imageSrc === placeholder) {
                        setImageSrc(src);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: '50px', 
                threshold: threshold
            }
        );

        const currentRef = imageRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [src, imageSrc, placeholder, threshold]);

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad();
    };

    const handleError = (e) => {
        setHasError(true);
        setImageSrc(placeholder);
        onError(e);
    };

    return (
        <img
            ref={imageRef}
            src={imageSrc}
            alt={alt}
            className={`${className} ${isLoaded ? 'loaded' : 'loading'} ${hasError ? 'error' : ''}`}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
            decoding="async"
        />
    );
};

export default LazyImage;
