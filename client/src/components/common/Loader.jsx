import React from 'react';
import './Loader.css';

const Loader = ({ size = 50, color = '#ea580c' }) => {
    return (
        <div className="loader-container">
            <div
                className="custom-loader"
                style={{
                    width: `${size}px`,
                    color: color
                }}
            />
        </div>
    );
};

export default Loader;
