import React from "react";
import Image from "next/image";

export interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
}
/**
 * CardContainer
 * - Displays a card with an optional image at the top
 * - Children content will be the info of staff/member
 */
export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className = "",
  imageSrc,
  imageAlt = "",
}) => (
  <div
    className={`rounded-md flex flex-col items-center p-3 w-full max-w-[299px] min-h-[400px] mx-auto ${className}`}
  >
    {imageSrc ? (
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={299}
        height={382}
        className="w-full h-[382px] shadow-2xl rounded-sm object-cover mb-2"
      />
    ) : (
      <div className="w-full h-[382px] rounded-sm bg-gray-100 border border-gray-300 mb-2 shadow-2xl" />
    )}
    <div className="text-center space-y-0.5 text-sm leading-tight">
      {children}
    </div>
  </div>
);

export default CardContainer;
