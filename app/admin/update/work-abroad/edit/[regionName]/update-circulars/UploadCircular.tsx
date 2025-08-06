'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';

const UploadCircular = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imgDimensions, setImgDimensions] = useState<{ width: number; height: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle file selection (from input or drop)
  const handleFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Only image files are allowed.');
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new window.Image();
      img.src = reader.result as string;

      img.onload = () => {
        setImgDimensions({ width: img.width, height: img.height });
        setImagePreview(reader.result as string);
      };
    };

    reader.readAsDataURL(file);
  };

  // Handle drag & drop
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Input change fallback
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleUpload = () => {
    if (!imageFile) {
      alert('Please select or drop an image first!');
      return;
    }

    // Replace this with real upload logic (e.g., POST to server)
    alert(`Ready to upload: ${imageFile.name}`);
  };

  return (
    <div className="max-w-sm my-8 p-4 border rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Upload New Circular</h2>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`w-full h-40 flex items-center justify-center border-2 rounded cursor-pointer transition
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-400'}`}
      >
        <label className="w-full h-full flex items-center justify-center text-gray-500 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />
          {isDragging ? 'Drop your image here' : 'Click or drag image here to upload'}
        </label>
      </div>

      {imagePreview && imgDimensions ? (
        <div
          className="relative w-full mt-4 mb-4"
          style={{ aspectRatio: `${imgDimensions.width} / ${imgDimensions.height}` }}
        >
          <Image
            src={imagePreview}
            alt="Preview"
            fill
            className="object-contain rounded"
          />
        </div>
      ) : (
        <div className="w-full h-12 flex items-center justify-center text-gray-400 mb-4 rounded">
          No image selected
        </div>
      )}

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Upload
      </button>
    </div>
  );
};

export default UploadCircular;
