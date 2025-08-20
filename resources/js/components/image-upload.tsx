import { useState, DragEvent, ChangeEvent, useEffect } from "react";

interface ImageUploaderProps {
  onChange?: (files: File[]) => void;
  error?: string;
  required?: boolean;
}

export default function ImageUploader({ onChange, error: externalError, required = false }: ImageUploaderProps) {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isImage = (file: File) => file.type.startsWith("image/");

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const validImages = Array.from(files).filter(isImage);
    const invalidImages = Array.from(files).filter(file => !isImage(file));

    if (invalidImages.length > 0) {
      setError("Only image files are allowed (png, jpg, jpeg, etc.)");
      return;
    }

    setError(null);
    const newImages = [...images, ...validImages];
    setImages(newImages);
    setPreviews(prev => [
      ...prev,
      ...validImages.map(file => URL.createObjectURL(file)),
    ]);
    
    // Notify parent component
    if (onChange) {
      onChange(newImages);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previews];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreviews(newPreviews);
    
    // Notify parent component
    if (onChange) {
      onChange(newImages);
    }
  };

  const clearAll = () => {
    setImages([]);
    setPreviews([]);
    setError(null);
    
    // Notify parent component
    if (onChange) {
      onChange([]);
    }
  };

  return (
    <div className="space-y-3">
      <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Upload Screenshot / Attachment {required && <span className="text-red-500">*</span>}
      </label>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-4 cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-center"
        onClick={() => document.getElementById("image")?.click()}
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Drag & drop images here or click to select
        </p>
      </div>

      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {(error || externalError) && (
        <p className="text-red-500 text-sm">{error || externalError}</p>
      )}

      {previews.length > 0 && (
        <div className="space-y-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {previews.map((src, index) => (
              <div key={index} className="relative group">
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-auto rounded-md border border-gray-300 dark:border-gray-700"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 opacity-0 group-hover:opacity-100 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={clearAll}
            className="mt-2 text-sm text-gray-700 dark:text-gray-300 hover:underline"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
