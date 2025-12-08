import React from 'react';

const MechanicalLoader = ({
    size = 'medium',
    text = 'Initializing Systems...',
    color = '#f97316' // Orange color matching the theme
}) => {
    // Size mapping
    const sizes = {
        small: 'w-12 h-12',
        medium: 'w-16 h-16',
        large: 'w-24 h-24'
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
            {/* Animated Gear/Cog Loader */}
            <div className="relative">
                <svg
                    className={`${sizes[size]} animate-spin`}
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ animationDuration: '3s' }}
                >
                    {/* Outer gear */}
                    <circle
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke={color}
                        strokeWidth="4"
                    />
                    {/* Gear teeth */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                        <rect
                            key={i}
                            x="48"
                            y="10"
                            width="4"
                            height="10"
                            fill={color}
                            transform={`rotate(${angle} 50 50)`}
                        />
                    ))}
                    {/* Inner circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r="15"
                        fill={color}
                        opacity="0.3"
                    />
                    {/* Center hole */}
                    <circle
                        cx="50"
                        cy="50"
                        r="8"
                        fill="white"
                    />
                </svg>

                {/* Secondary rotating gear */}
                <svg
                    className={`${sizes[size]} absolute top-0 left-0 animate-spin`}
                    viewBox="0 0 100 100"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        animationDuration: '2s',
                        animationDirection: 'reverse',
                        opacity: 0.6
                    }}
                >
                    {/* Smaller inner gear */}
                    <circle
                        cx="50"
                        cy="50"
                        r="20"
                        fill="none"
                        stroke={color}
                        strokeWidth="3"
                    />
                    {/* Inner gear teeth */}
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                        <rect
                            key={i}
                            x="48.5"
                            y="25"
                            width="3"
                            height="8"
                            fill={color}
                            transform={`rotate(${angle} 50 50)`}
                        />
                    ))}
                </svg>
            </div>

            {/* Loading Text */}
            <p className="mt-8 text-lg font-semibold text-gray-800 animate-pulse">
                {text}
            </p>

            {/* Animated Dots */}
            <div className="mt-4 flex space-x-2">
                <div
                    className="w-2.5 h-2.5 rounded-full animate-bounce"
                    style={{
                        backgroundColor: color,
                        animationDelay: '0ms',
                        animationDuration: '1s'
                    }}
                ></div>
                <div
                    className="w-2.5 h-2.5 rounded-full animate-bounce"
                    style={{
                        backgroundColor: color,
                        animationDelay: '150ms',
                        animationDuration: '1s'
                    }}
                ></div>
                <div
                    className="w-2.5 h-2.5 rounded-full animate-bounce"
                    style={{
                        backgroundColor: color,
                        animationDelay: '300ms',
                        animationDuration: '1s'
                    }}
                ></div>
            </div>
        </div>
    );
};

export default MechanicalLoader;
