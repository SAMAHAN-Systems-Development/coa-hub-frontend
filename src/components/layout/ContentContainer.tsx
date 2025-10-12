import React from "react";

export interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * ContentContainer
 * - Responsive padding for main content
 * - Automatically centers and constrains width at breakpoints using container
 */
export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  className = "",
}) => (
  <main
    className={`container mx-auto w-full space-y-12 md:space-y-16 py-6 md:py-10 ${className}`}
  >
    {children}
  </main>
);

export default ContentContainer;
