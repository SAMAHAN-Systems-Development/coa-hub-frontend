"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  // actionLabel?: string;   // for action (if needed)
  // onAction?: () => void;  // for action (if needed)
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: {
    icon: "w-12 h-12",
    title: "text-lg",
    description: "text-sm",
    container: "max-w-sm",
    gap: "gap-3"
  },
  md: {
    icon: "w-16 h-16",
    title: "text-xl",
    description: "text-base",
    container: "max-w-md",
    gap: "gap-4"
  },
  lg: {
    icon: "w-20 h-20",
    title: "text-2xl",
    description: "text-lg",
    container: "max-w-lg",
    gap: "gap-6"
  }
};

export const EmptyState = ({
  icon,
  title = "No results found",
  description = "Try adjusting your search or filters to find what you're looking for.",
  // actionLabel,   // for action (if needed)
  // onAction,      // for action (if needed)
  className,
  size = "md"
}: EmptyStateProps) => {
  const config = sizeConfig[size];
  
  // Default icon is Search, but can be overridden
  const displayIcon = icon || <Search className={cn(config.icon)} />;

  return (
    <div className={cn(
      "flex flex-col items-center justify-center text-center p-8 min-h-[400px]",
      config.container,
      config.gap,
      className
    )}>
      {/* Icon */}
      <div className={cn(
        "flex items-center justify-center rounded-full bg-muted mb-2",
        config.icon === "w-12 h-12" ? "p-3" : config.icon === "w-16 h-16" ? "p-4" : "p-5"
      )}>
        <div className="text-muted-foreground">
          {displayIcon}
        </div>
      </div>

      {/* Title */}
      <h3 className={cn("font-semibold text-foreground", config.title)}>
        {title}
      </h3>

      {/* Description */}
      <p className={cn("text-muted-foreground", config.description)}>
        {description}
      </p>

      {/* Action Button */}
      {/* {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-4">
          {actionLabel}
        </Button>
      )} */}
    </div>
  );
};