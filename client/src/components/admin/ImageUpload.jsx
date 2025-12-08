import React, { useCallback, useState, useEffect } from 'react';
import { CloudUpload, ImageIcon, CircleX, TriangleAlert, X } from 'lucide-react';

const ImageUpload = ({
    maxFiles = 1, // Default to single file for blog header
    maxSize = 5 * 1024 * 1024, // 5MB
    accept = 'image/*',
    className = '',
    onUploadComplete,
    initialImage = '', // Can be string (single) or array (multiple)
    multipleMode = false // When true, returns array of URLs instead of single URL
}) => {
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [errors, setErrors] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState(null);

    // Initialize with existing image if provided
    useEffect(() => {
        if (initialImage && images.length === 0) {
            // Handle both string (single image) and array (multiple images)
            const imagesToLoad = Array.isArray(initialImage) ? initialImage : [initialImage];
            const imageObjects = imagesToLoad
                .filter(url => url) // Filter out empty strings
                .map((url, index) => ({
                    id: `initial-${index}`,
                    preview: url,
                    url: url,
                    status: 'completed',
                    progress: 100
                }));
            setImages(imageObjects);
        }
    }, [initialImage]);

    const validateFile = (file) => {
        if (!file.type.startsWith('image/')) {
            return 'File must be an image';
        }
        if (file.size > maxSize) {
            return `File size must be less than ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
        }
        if (images.length >= maxFiles) {
            return `Maximum ${maxFiles} files allowed`;
        }
        return null;
    };

    const uploadFileToBackend = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const token = localStorage.getItem('adminToken'); // Assuming token is stored here

        try {
            const response = await fetch('http://localhost:5000/api/admin/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Upload failed');
            }

            return data.url; // Return the file URL
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    };

    const addImages = useCallback(async (files) => {
        const newImages = [];
        const newErrors = [];

        // Convert FileList to Array
        const fileArray = Array.from(files);

        for (const file of fileArray) {
            const error = validateFile(file);
            if (error) {
                newErrors.push(`${file.name}: ${error}`);
                continue;
            }

            const tempId = `${Date.now()}-${Math.random()}`;
            const imageFile = {
                id: tempId,
                file,
                preview: URL.createObjectURL(file),
                progress: 0,
                status: 'uploading',
            };

            setImages(prev => [...prev, imageFile]);
            setUploading(true);

            try {
                // Simulate progress
                setImages(prev => prev.map(img =>
                    img.id === tempId ? { ...img, progress: 50 } : img
                ));

                // Actual upload
                const url = await uploadFileToBackend(file);

                setImages(prev => prev.map(img =>
                    img.id === tempId ? { ...img, progress: 100, status: 'completed', url } : img
                ));

                // Notify parent - send array in multiple mode, single URL otherwise
                if (onUploadComplete) {
                    if (multipleMode) {
                        // Send all uploaded URLs as array after state update
                        setTimeout(() => {
                            setImages(prev => {
                                const allUrls = prev
                                    .filter(img => img.status === 'completed' && img.url)
                                    .map(img => img.url);
                                onUploadComplete(allUrls);
                                return prev;
                            });
                        }, 0);
                    } else {
                        onUploadComplete(url);
                    }
                }

            } catch (err) {
                setImages(prev => prev.map(img =>
                    img.id === tempId ? { ...img, status: 'error', error: err.message } : img
                ));
                newErrors.push(`${file.name}: ${err.message}`);
            }
        }

        if (newErrors.length > 0) {
            setErrors(prev => [...prev, ...newErrors]);
        }
        setUploading(false);

    }, [images, maxSize, maxFiles, onUploadComplete]);

    const removeImage = useCallback((id) => {
        setImages(prev => {
            const image = prev.find(img => img.id === id);
            if (image && image.preview && !image.url) {
                URL.revokeObjectURL(image.preview);
            }
            const newImages = prev.filter(img => img.id !== id);

            // Notify parent with updated state after render
            setTimeout(() => {
                if (onUploadComplete) {
                    if (multipleMode) {
                        const allUrls = newImages
                            .filter(img => img.status === 'completed' && img.url)
                            .map(img => img.url);
                        onUploadComplete(allUrls);
                    } else if (newImages.length === 0) {
                        onUploadComplete('');
                    }
                }
            }, 0);

            return newImages;
        });
    }, [onUploadComplete, multipleMode]);

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            addImages(files);
        }
    }, [addImages]);

    const openFileDialog = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = maxFiles > 1;
        input.accept = accept;
        input.onchange = (e) => {
            if (e.target.files) {
                addImages(e.target.files);
            }
        };
        input.click();
    }, [accept, addImages, maxFiles]);

    // Drag and drop reordering handlers
    const handleImageDragStart = useCallback((e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    }, []);

    const handleImageDragOver = useCallback((e, index) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        if (draggedIndex === null || draggedIndex === index) return;

        // Reorder images
        setImages(prev => {
            const newImages = [...prev];
            const draggedImage = newImages[draggedIndex];
            newImages.splice(draggedIndex, 1);
            newImages.splice(index, 0, draggedImage);

            // Update parent if in multiple mode after render
            setTimeout(() => {
                if (multipleMode && onUploadComplete) {
                    const allUrls = newImages
                        .filter(img => img.status === 'completed' && img.url)
                        .map(img => img.url);
                    onUploadComplete(allUrls);
                }
            }, 0);

            return newImages;
        });

        setDraggedIndex(index);
    }, [draggedIndex, multipleMode, onUploadComplete]);

    const handleImageDragEnd = useCallback(() => {
        setDraggedIndex(null);
    }, []);

    const formatBytes = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    return (
        <div className={`w-full max-w-4xl ${className}`}>
            {/* Upload Area */}
            {images.length < maxFiles && (
                <div
                    className={`
            border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer
            ${isDragging
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
                        }
            bg-white
          `}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={openFileDialog}
                >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 mx-auto mb-4">
                        <CloudUpload className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        Click to upload or drag and drop
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        SVG, PNG, JPG or GIF (max. {formatBytes(maxSize)})
                    </p>
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                        Browse File
                    </button>
                </div>
            )}

            {/* Image Preview List */}
            {images.length > 0 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((img, index) => (
                        <div
                            key={img.id}
                            draggable={multipleMode}
                            onDragStart={(e) => handleImageDragStart(e, index)}
                            onDragOver={(e) => handleImageDragOver(e, index)}
                            onDragEnd={handleImageDragEnd}
                            className={`relative group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${multipleMode ? 'cursor-move' : ''
                                } ${draggedIndex === index ? 'opacity-50' : ''}`}
                        >
                            <div className="aspect-video w-full bg-gray-100 relative">
                                <img
                                    src={img.preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay with remove button */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-start justify-end p-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeImage(img.id);
                                        }}
                                        className="p-1.5 bg-white/90 text-gray-700 rounded-full shadow-sm hover:bg-red-50 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            {img.status === 'uploading' && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
                                    <div
                                        className="h-full bg-orange-500 transition-all duration-300"
                                        style={{ width: `${img.progress}%` }}
                                    />
                                </div>
                            )}

                            {/* Status Indicator */}
                            {img.status === 'error' && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/90">
                                    <div className="text-center p-2">
                                        <TriangleAlert className="w-8 h-8 text-red-500 mx-auto mb-2" />
                                        <p className="text-xs text-red-600 font-medium">{img.error || 'Upload failed'}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Error Messages */}
            {errors.length > 0 && (
                <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                    <TriangleAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold text-red-900">Upload Error</h4>
                        {errors.map((error, index) => (
                            <p key={index} className="text-sm text-red-700">{error}</p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
