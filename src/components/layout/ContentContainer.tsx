import React from "react";

export interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * ContentContainer
 * - Responsive padding for main content
 */
export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  className = "",
}) => (
  <main
    className={`w-full space-y-12 md:space-y-16 py-6 md:py-10 ${className}`}
  >
    {children}
  </main>
);

export default ContentContainer;
