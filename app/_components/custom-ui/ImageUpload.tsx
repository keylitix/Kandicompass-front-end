import React, { useState, useRef } from 'react';
import { GradientButton } from './GradientButton';

interface ImageUploadProps {
  label: string;
  onChange: (files: File[]) => void;
  acceptedFormats: string;
  multiple?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  onChange,
  acceptedFormats,
  multiple = false,
}) => {
  const [dragging, setDragging] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files);
    onChange(newFiles);
    updatePreviews(newFiles);
  };

  const updatePreviews = (files: File[]) => {
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(newPreviews);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  return (
    <div className="mb-6">
      <label className="block text-white mb-2">{label}</label>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`w-full p-6 border-2 ${
          dragging ? 'border-blue-500' : 'border-transparent'
        } bg-transparent rounded-lg transition-all ease-in-out duration-300 flex flex-col items-center justify-center`}
        style={{
          borderImage: 'linear-gradient(to right, #FF005D, #00D1FF) 1',
        }}
      >
        <p
          className={`text-white ${dragging ? 'text-blue-500' : 'text-gray-400'}`}
        >
          {dragging
            ? 'Release to Upload'
            : `Drag and drop images here or click to select`}
        </p>
        <input
          type="file"
          ref={fileInputRef}
          accept={acceptedFormats}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />
        <GradientButton
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          Select Files
        </GradientButton>
      </div>
      <div className="mt-4 flex flex-wrap gap-4">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="w-20 h-20 overflow-hidden rounded-md">
            <img
              src={preview}
              alt={`preview-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
