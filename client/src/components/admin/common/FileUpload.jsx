import React, { useState, useRef } from 'react';

const FileUpload = ({ label, onFileSelect, currentImage, className = '' }) => {
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const validateFile = (file) => {
        
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file (JPG, PNG, WEBP)');
            return false;
        }
        
        if (file.size > 500 * 1024) {
            setError('File size too large. Please use an image under 500KB.');
            return false;
        }
        setError('');
        return true;
    };

    const processFile = (file) => {
        if (!validateFile(file)) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            onFileSelect(reader.result);
        };
        reader.onerror = () => {
            setError('Error reading file');
        };
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const removeImage = (e) => {
        e.preventDefault(); 
        e.stopPropagation();
        onFileSelect('');
        if (inputRef.current) inputRef.current.value = '';
    };

    const triggerInput = () => {
        inputRef.current.click();
    };

    return (
        <div className={`w-full ${className}`}>
            {label && <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>}

            <div
                className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-200 ease-in-out ${dragActive
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'
                    } ${error ? 'border-red-500 bg-red-50' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleChange}
                />

                {currentImage ? (
                    <div className="relative group">
                        <img
                            src={currentImage}
                            alt="Preview"
                            className="w-full h-48 object-contain rounded-lg bg-gray-100"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center rounded-lg">
                            <button
                                onClick={removeImage}
                                className="opacity-0 group-hover:opacity-100 bg-red-600 text-white px-4 py-2 rounded-lg font-medium transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 shadow-lg hover:bg-red-700"
                            >
                                Remove Image
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={triggerInput}
                        className="flex flex-col items-center justify-center h-48 cursor-pointer"
                    >
                        <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-3">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            SVG, PNG, JPG or WEBP (max. 500KB)
                        </p>
                    </div>
                )}
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
    );
};

export default FileUpload;
