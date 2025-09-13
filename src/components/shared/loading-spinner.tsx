"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export interface FullScreenLoaderProps {
  label?: string;
  className?: string;
  duration?: number; // Duration for the morphing animation in milliseconds
}

export const FullScreenLoader = ({ 
  label = "Loading...", 
  className,
  duration = 700 // Made much shorter for snappy animation
}: FullScreenLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isReversing, setIsReversing] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (duration / 20); // Update every 20ms for smoother animation
        
        if (!isReversing) {
          // Forward direction (light to dark)
          if (prev >= 100) {
            setIsReversing(true);
            setCycleCount(count => count + 1);
            return 100;
          }
          return prev + increment;
        } else {
          // Reverse direction (dark to light)
          if (prev <= 0) {
            setIsReversing(false);
            setCycleCount(count => count + 1);
            return 0;
          }
          return prev - increment;
        }
      });
    }, 20); // Faster update interval for snappier animation

    return () => clearInterval(interval);
  }, [duration, isReversing]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
        {/* Logo Container with Morphing Effect - Responsive Sizing */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 flex items-center justify-center">
          {/* Base Light Logo */}
          <img
            src="/logo-light.svg"
            alt="Loading Light Logo"
            className="absolute inset-0 w-full h-full"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: 'auto',
              height: 'auto',
              imageRendering: 'crisp-edges',
              transform: 'translateZ(0)',
              willChange: 'transform',
              // Safari-specific properties
              ...(typeof window !== 'undefined' && /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) ? {
                imageRendering: '-webkit-optimize-contrast' as any,
                WebkitFontSmoothing: 'antialiased' as any,
              } : {})
            }}
          />
          
          {/* Dark Logo with Circular Reveal Animation */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: `circle(${progress}% at center)`,
            }}
          >
            <img
              src="/logo-dark.svg"
              alt="Loading Dark Logo"
              className="w-full h-full"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                imageRendering: 'crisp-edges',
                transform: 'translateZ(0)',
                willChange: 'transform',
                // Safari-specific properties
                ...(typeof window !== 'undefined' && /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) ? {
                  imageRendering: '-webkit-optimize-contrast' as any,
                  WebkitFontSmoothing: 'antialiased' as any,
                } : {})
              }}
            />
          </div>
        </div>

        {label && (
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-center">
            {label}
            {cycleCount > 4 && (
              <span className="block text-xs sm:text-sm opacity-70 mt-1">
                Still loading, please wait...
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};