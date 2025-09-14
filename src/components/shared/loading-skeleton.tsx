"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Types
export type SkeletonSize = "sm" | "md" | "lg" | "xl";
export type SkeletonAnimation = "pulse" | "none";

export interface SkeletonBoxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  w?: number | string;
  h?: number | string;
  radiusClassName?: string;
  anim?: SkeletonAnimation;
  className?: string;
  label?: string;
}

export interface SkeletonTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: SkeletonSize;
  lines?: number;
  lineWidths?: Array<number | string>;
  anim?: SkeletonAnimation;
}

export interface SkeletonImageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: SkeletonSize;
  aspectRatio?: `${number}/${number}`;
  anim?: SkeletonAnimation;
  radiusClassName?: string;
}

export interface SkeletonAvatarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: SkeletonSize;
  anim?: SkeletonAnimation;
}

export interface SkeletonCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: SkeletonSize;
  variant?: "image-only" | "text-only" | "image-with-text" | "avatar-with-text";
  mediaAspect?: `${number}/${number}`;
  lines?: number;
  anim?: SkeletonAnimation;
  showTitle?: boolean;
  showAvatar?: boolean;
}

const sizeMap: Record<
  SkeletonSize,
  {
    gap: string;
    padding: string;
    lineHeight: string;
    lineRadius: string;
    avatar: string;
    mediaHeight: string;
    titleHeight: string;
  }
> = {
  sm: {
    gap: "gap-2",
    padding: "p-4",
    lineHeight: "h-2.5",
    lineRadius: "rounded",
    avatar: "h-8 w-8",
    mediaHeight: "h-28",
    titleHeight: "h-3",
  },
  md: {
    gap: "gap-3",
    padding: "p-5",
    lineHeight: "h-3",
    lineRadius: "rounded-md",
    avatar: "h-10 w-10",
    mediaHeight: "h-40",
    titleHeight: "h-3.5",
  },
  lg: {
    gap: "gap-4",
    padding: "p-6",
    lineHeight: "h-3.5",
    lineRadius: "rounded-md",
    avatar: "h-12 w-12",
    mediaHeight: "h-56",
    titleHeight: "h-4",
  },
  xl: {
    gap: "gap-6",
    padding: "p-8",
    lineHeight: "h-4",
    lineRadius: "rounded-lg",
    avatar: "h-14 w-14",
    mediaHeight: "h-72",
    titleHeight: "h-5",
  },
};

// Animation helpers
function animClass(anim: SkeletonAnimation): string {
  if (anim === "pulse") return "animate-pulse";
  return "animate-none";
}

// Skeleton Box Component
export function SkeletonBox({
  w,
  h,
  radiusClassName = "rounded-md",
  anim = "pulse",
  className,
  label,
  ...props
}: SkeletonBoxProps) {
  const style: React.CSSProperties = {
    width: typeof w === "number" ? `${w}px` : w,
    height: typeof h === "number" ? `${h}px` : h,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "bg-muted/50 ring-1 ring-inset ring-border",
        radiusClassName,
        animClass(anim),
        className
      )}
      style={style}
      {...props}
    />
  );
}

// Skeleton Text Component
export function SkeletonText({
  size = "md",
  lines = 3,
  lineWidths,
  anim = "pulse",
  className,
  ...props
}: SkeletonTextProps) {
  const s = sizeMap[size];
  const widths =
    lineWidths ??
    (lines === 1
      ? ["70%"]
      : ["100%", "85%", "60%", ...Array(Math.max(0, lines - 3)).fill("90%")]);

  return (
    <div className={cn("flex flex-col", s.gap, className)} {...props}>
      {Array.from({ length: lines }).map((_, idx) => (
        <SkeletonBox
          key={idx}
          className={cn(s.lineHeight)}
          w={widths[idx] ?? "100%"}
          radiusClassName={s.lineRadius}
          anim={anim}
        />
      ))}
    </div>
  );
}

// Skeleton Image Component
export function SkeletonImage({
  size = "md",
  aspectRatio,
  anim = "pulse",
  radiusClassName = "rounded-lg",
  className,
  ...props
}: SkeletonImageProps) {
  const s = sizeMap[size];
  if (aspectRatio) {
    const [w, h] = aspectRatio.split("/").map(Number);
    const ratio = (h / w) * 100;
    return (
      <div className={cn("w-full", className)} {...props}>
        <div className="relative w-full" style={{ paddingTop: `${ratio}%` }}>
          <SkeletonBox
            className="absolute inset-0"
            radiusClassName={radiusClassName}
            anim={anim}
          />
        </div>
      </div>
    );
  }

  return (
    <SkeletonBox
      className={cn("w-full", s.mediaHeight, className)}
      radiusClassName={radiusClassName}
      anim={anim}
      {...props}
    />
  );
}

// Skeleton Avatar Component (just in case needed separately)
export function SkeletonAvatar({
  size = "md",
  anim = "pulse",
  className,
  ...props
}: SkeletonAvatarProps) {
  const s = sizeMap[size];
  return (
    <SkeletonBox
      className={cn(s.avatar, className)}
      radiusClassName="rounded-full"
      anim={anim}
      {...props}
    />
  );
}

// Skeleton Card Component
export function SkeletonCard({
  size = "md",
  variant = "image-with-text",
  mediaAspect = "16/9",
  lines = 3,
  anim = "pulse",
  showTitle = true,
  showAvatar = true,
  className,
  ...props
}: SkeletonCardProps) {
  const s = sizeMap[size];

  return (
    <Card
      className={cn("bg-card text-card-foreground overflow-hidden", className)}
      {...props}
    >
      {/* Image Section */}
      {(variant === "image-only" || variant === "image-with-text") && (
        <SkeletonImage
          size={size}
          aspectRatio={mediaAspect}
          anim={anim}
          radiusClassName="rounded-lg"
        />
      )}

      {/* Content Section */}
      {variant !== "image-only" && (
        <>
          {/* Header with Title */}
          {showTitle && (
            <CardHeader className={cn(s.padding, "pb-2")}>
              <SkeletonBox className={cn(s.titleHeight)} w="60%" anim={anim} />
            </CardHeader>
          )}

          {/* Main Content */}
          <CardContent className={cn(s.padding, showTitle ? "pt-2" : "pt-0")}>
            {variant === "avatar-with-text" && showAvatar ? (
              // Layout with avatar and text
              <div className={cn("flex items-start", s.gap)}>
                <SkeletonAvatar size={size} anim={anim} />
                <div className="flex-1">
                  <SkeletonText size={size} lines={lines} anim={anim} />
                </div>
              </div>
            ) : (
              // Text only layout
              <SkeletonText size={size} lines={lines} anim={anim} />
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
}
