"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { X, ImagePlus } from "lucide-react";
import { toast } from "sonner";

interface InputImageProps {
  existingImage?: string;
  onImageChange?: (file: File | null) => void;
  className?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB (change as necessary)
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function InputImage({
  existingImage,
  onImageChange,
  className = "",
}: InputImageProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    existingImage || null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error(
        "Invalid file type. Please upload a JPEG, PNG, or WebP image."
      );
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size too large. Maximum size is 5MB.");
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();

    reader.onloadend = () => {
      try {
        setImagePreview(reader.result as string);
        setSelectedFile(file);
        onImageChange?.(file);
        toast.success("Image uploaded successfully");
      } catch (error) {
        toast.error("Failed to process image");
        console.error("Image processing error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      toast.error("Failed to read image file");
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleDelete = () => {
    setImagePreview(null);
    setSelectedFile(null);
    onImageChange?.(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        onChange={handleImageSelect}
        className="hidden"
        disabled={isLoading}
      />

      {imagePreview ? (
        // img preview
        <div
          className="relative w-36 h-36 overflow-hidden group"
          style={{ backgroundColor: "#E7EAEF" }}
        >
          <Image
            src={imagePreview}
            alt="Member photo preview"
            fill
            className="object-cover"
            onError={() => {
              toast.error("Failed to load image preview");
              handleDelete();
            }}
          />
          <button
            onClick={handleDelete}
            className="absolute top-2 right-2 bg-red-400 hover:bg-red-500 text-white rounded-full p-1.5 transition-colors shadow-lg"
            type="button"
            aria-label="Delete image"
            disabled={isLoading}
          >
            <X className="w-2 h-2" />
          </button>
        </div>
      ) : (
        // upload Button
        <button
          onClick={handleClick}
          type="button"
          className="w-36 h-36 border-2 border-gray-300 flex flex-col items-center justify-center transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#E7EAEF" }}
          aria-label="Upload new photo"
          disabled={isLoading}
        >
          <ImagePlus className="w-10 h-10 text-gray-600 mb-2" />
          <span className="text-gray-600 font-medium text-sm">
            {isLoading ? "Loading..." : "New Photo"}
          </span>
        </button>
      )}
    </div>
  );
}
