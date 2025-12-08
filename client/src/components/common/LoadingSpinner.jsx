import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'orange' }) => {
    const sizeClasses = {
        small: 'h-6 w-6 border-2',
        medium: 'h-12 w-12 border-b-2',
        large: 'h-16 w-16 border-4',
    };

    const colorClasses = {
        orange: 'border-orange-600',
        white: 'border-white',
        blue: 'border-blue-600',
    };

    return (
        <div className="flex justify-center items-center w-full h-full min-h-[200px]">
            <div
                className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
                role="status"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingSpinner;
