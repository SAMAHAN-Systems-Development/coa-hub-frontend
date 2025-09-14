import React from "react";

export interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  card?: boolean;
}

/**
 * SectionContainer
 * - Wraps page subsections
 * - For meet the staff section, set card as an attribute for proper styling
 * - eg. <SectionContainer card>...</SectionContainer>
 */
export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className = "",
  card = false,
}) => {
  const wrapperBase = card ? "bg-white dark:bg-muted p-6 rounded-xl" : "";

  return (
    <section className={`${wrapperBase} ${className}`}>
      <div className="flex flex-wrap justify-center gap-10">{children}</div>
    </section>
  );
};

export default SectionContainer;
