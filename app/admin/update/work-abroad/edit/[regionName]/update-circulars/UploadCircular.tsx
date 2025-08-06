'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import SuccessAlert from '../../../../../../../ui/modals/success-alert/SuccessAlert';
import ErrorAlert from '../../../../../../../ui/modals/error-alert/ErrorAlert';

const UploadCircular = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [imgDimensions, setImgDimensions] = useState<{ width: number; height: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Handle file selection (from input or drop)
  const handleFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Only image files are allowed.');
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleUpload = async () => {
    if (!imageFile) {
      setError('Please select or drop an image first!');
      return;
    }

    setUploading(true);

    try {
      // Step 1: Get authentication parameters from server
      const authRes = await fetch('/api/imagekit-auth');
      const auth = await authRes.json();

      // Step 2: Create form data to upload to ImageKit
      const formData = new FormData();
      formData.append('file', imageFile); // Accepts File, base64, or URL
      formData.append('fileName', imageFile.name);
      formData.append('publicKey', auth.publicKey);
      formData.append('signature', auth.signature);
      formData.append('expire', auth.expire);
      formData.append('token', auth.token);

      // Step 3: Upload to ImageKit
      const uploadRes = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadResult = await uploadRes.json();

      if (uploadResult && uploadResult.url) {
        setUploadedImageUrl(uploadResult.url);
        setSuccess('Upload successful!');
      } else {
        setError('Upload failed');
      }
    } catch (err) {
      console.error('error', err);
      setError('Failed to upload image to ImageKit');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-sm my-8 p-4 border rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Upload New Circular</h2>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`w-full h-40 flex items-center justify-center border-2 rounded cursor-pointer transition ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-400'
          }`}
      >
        <label className="w-full h-full flex items-center justify-center text-gray-500 cursor-pointer">
          <input type="file" accept="image/*" onChange={handleInputChange} className="hidden" />
          {isDragging ? 'Drop your image here' : 'Click or drag image here to upload'}
        </label>
      </div>

      {imagePreview && imgDimensions ? (
        <div
          className="relative w-full mt-4 mb-4"
          style={{ aspectRatio: `${imgDimensions.width} / ${imgDimensions.height}` }}
        >
          <Image src={imagePreview} alt="Preview" fill className="object-contain rounded" />
        </div>
      ) : (
        <div className="w-full h-12 flex items-center justify-center text-gray-400 mb-4 rounded">
          No image selected
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {uploadedImageUrl && (
        <p className="text-green-600 text-sm mt-4 break-all">
          ✅ Uploaded URL: <a href={uploadedImageUrl} target="_blank" rel="noopener noreferrer">{uploadedImageUrl}</a>
        </p>
      )}

      {
        success && <SuccessAlert success={success} setSuccess={setSuccess} />
      }

      {
        error && <ErrorAlert error={error} setError={setError} />
      }
    </div>
  );
};

export default UploadCircular;
