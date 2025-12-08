"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface InputChipsProps {
  initialChips: string[];
  onChange?: (chips: string[]) => void;
  className?: string;
}

export default function InputChips({
  initialChips,
  onChange,
  className = "",
}: InputChipsProps) {
  const [chips, setChips] = useState<string[]>(initialChips);

  const handleRemoveChip = (indexToRemove: number) => {
    const updatedChips = chips.filter((_, index) => index !== indexToRemove);
    setChips(updatedChips);
    onChange?.(updatedChips);
  };

  return (
    <div className={className}>
      <div
        className="w-full min-h-[48px] p-3 flex flex-wrap gap-2"
        style={{ backgroundColor: "#E7EAEF" }}
      >
        {chips.length === 0 ? (
          <span className="text-gray-400 italic font-montserrat text-sm">
            No designations
          </span>
        ) : (
          chips.map((chip, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 bg-white border-1 border-gray-800 rounded px-3 py-1 text-gray-700 font-montserrat text-sm"
            >
              <button
                onClick={() => handleRemoveChip(index)}
                className="hover:bg-gray-100 rounded-full p-0.5 transition-colors"
                type="button"
                aria-label={`Remove ${chip}`}
              >
                <X className="w-3.5 h-3.5 text-gray-700" />
              </button>
              <span>{chip}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
