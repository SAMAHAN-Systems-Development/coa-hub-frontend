"use client";

import { useState, useRef, ChangeEvent } from "react";
import { X } from "lucide-react";
import { LuImagePlus } from "react-icons/lu";

interface ImageUploadFieldProps {
  value: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  disabled?: boolean;
}

export default function ImageUploadField({
  value = [],
  onChange,
  maxFiles = 5,
  maxSizeMB = 5,
  disabled = false,
}: ImageUploadFieldProps) {
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith("image/")) {
      return "Only image files are allowed";
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size must be less than ${maxSizeMB}MB`;
    }

    return null;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setError(null);

    if (value.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} images allowed`);
      return;
    }

    const newFiles: File[] = [];
    const readers: Promise<string>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const validationError = validateFile(file);

      if (validationError) {
        setError(validationError);
        return;
      }

      newFiles.push(file);

      const readerPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });

      readers.push(readerPromise);
    }

    Promise.all(readers).then((newPreviews) => {
      setPreviews((prev) => [...prev, ...newPreviews]);
    });

    onChange([...value, ...newFiles]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    onChange(newFiles);
    setPreviews(newPreviews);
    setError(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {previews.map((preview, index) => (
          <div
            key={index}
            className="relative w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] rounded-none overflow-hidden group border border-black"
          >
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeFile(index)}
              disabled={disabled}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}

        {value.length < maxFiles && (
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] bg-[#7C8189] rounded-none cursor-pointer hover:bg-[#6C7178] transition-colors border border-black"
          >
            <LuImagePlus className="h-5 w-5 sm:h-6 sm:w-6 text-[#E7EAEF] mb-1 sm:mb-2" />
            <span className="text-xs sm:text-sm text-[#E7EAEF] font-normal">
              New Photo
            </span>
            <input
              id="image-upload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleInputChange}
              disabled={disabled}
              className="hidden"
            />
          </label>
        )}
      </div>

      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
}
