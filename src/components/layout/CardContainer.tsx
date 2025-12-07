import React from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

export type AdminAction = "edit" | "delete" | null;

export interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
  adminAction?: AdminAction;
  onActionClick?: () => void;
}
/**
 * CardContainer
 * - Displays a card with an optional image at the top
 * - Children content will be the info of staff/member
 * - Supports admin actions (edit/delete) with icon overlay
 */
export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className = "",
  imageSrc,
  imageAlt = "",
  adminAction = null,
  onActionClick,
}) => (
  <div
    className={`rounded-md flex flex-col items-center p-2 md:p-3 w-full max-w-[180px] md:max-w-[299px] min-h-[260px] md:min-h-[400px] mx-auto ${className}`}
  >
    <div className="relative w-full">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={299}
          height={382}
          className="w-full h-[230px] md:h-[382px] shadow-lg md:shadow-2xl rounded-sm object-cover mb-1.5 md:mb-2"
        />
      ) : (
        <div className="w-full h-[230px] md:h-[382px] rounded-sm bg-gray-100 border border-gray-300 mb-1.5 md:mb-2 shadow-lg md:shadow-2xl" />
      )}

      {adminAction && (
        <button
          onClick={onActionClick}
          className="absolute top-2 md:top-3 left-2 md:left-3 hover:opacity-80 transition-opacity"
          aria-label={adminAction === "edit" ? "Edit member" : "Delete member"}
        >
          {adminAction === "edit" ? (
            <Pencil className="w-4 h-4 md:w-6 md:h-6 text-gray-800" />
          ) : (
            <Trash2 className="w-4 h-4 md:w-6 md:h-6 text-gray-800" />
          )}
        </button>
      )}
    </div>

    <div className="text-center space-y-0 md:space-y-0.5 text-xs md:text-sm leading-tight">
      {children}
    </div>
  </div>
);

export default CardContainer;
