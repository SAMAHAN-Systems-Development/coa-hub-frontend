import React from "react";

export interface HeroContainerProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: React.ReactNode;
  backgroundImage?: string;
  className?: string;
  subheading?: string;
  children?: React.ReactNode;
}

/**
 * HeroContainer
 * - Large top hero with optional breadcrumbs and subtitle
 * - Pass shadcn <Breadcrumb /> via breadcrumbs prop
 */
export const HeroContainer: React.FC<HeroContainerProps> = ({
  title,
  subtitle,
  breadcrumbs,
  backgroundImage,
  className = "",
  subheading,
  children,
}) => {
  return (
    <div
      className={`relative w-full py-14 md:py-20 flex flex-col items-center text-center rounded-b-lg overflow-hidden ${className}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(22deg,#32383e 0%,#485159 42%,#6b7680 100%), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {
              background:
                "linear-gradient(22deg,#32383e 0%,#485159 42%,#6b7680 100%)",
            }
      }
    >
      {breadcrumbs && (
        <div className="absolute top-4 left-4 text-white">{breadcrumbs}</div>
      )}
      <h1 className="mx-3 text-5xl md:text-7xl lg:text-8xl font-bebas-neue text-white">
        {title}
      </h1>
      {subheading && (
        <p className="mx-12 text-3xl md:text-5xl lg:text-7xl font-bebas-neue uppercase text-white">
          {subheading}
        </p>
      )}
      {subtitle && (
        <p className="mt-3 mx-12 text-[12px] md:text-md lg:text-lg font-montserrat text-white">
          {subtitle}
        </p>
      )}
      {children && (
        <div className="mt-6 w-full max-w-[1200px] px-4">{children}</div>
      )}
    </div>
  );
};

export default HeroContainer;
