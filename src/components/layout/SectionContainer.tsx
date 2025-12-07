import React from "react";

export interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  card?: boolean;
  bgColor?: boolean;
  fullWidth?: boolean;
  firstCardFullWidth?: boolean;
}

/**
 * SectionContainer
 * - Wraps page subsections
 * - For meet the staff section, set card as an attribute for proper styling
 * - eg. <SectionContainer card>...</SectionContainer>
 * - For colored backgrounds like in the mockup, use bgColor="bg-yellow-400"
 * - Use fullWidth={true} for edge-to-edge sections
 */
export const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className = "",
  card = false,
  bgColor = false,
  fullWidth = false,
  firstCardFullWidth = false,
}) => {
  const cardStyle = card ? "dark:bg-muted rounded-xl" : "";
  const backgroundStyle = bgColor
    ? "linear-gradient(18deg, #32383e 0%, #485159 45%, #6b7680 100%)"
    : "";
  const paddingStyle = fullWidth ? "py-8 px-6" : card ? "p-6" : "p-6";

  return (
    <section
      className={`w-full rounded-xl ${cardStyle} ${paddingStyle} ${className}`}
      style={backgroundStyle ? { background: backgroundStyle } : {}}
    >
      <div className={`max-w-7xl mx-auto`}>
        {card ? (
          <div className="flex flex-wrap justify-center">
            {React.Children.map(children, (child, index) => (
              <div
                className={
                  index === 0 && firstCardFullWidth
                    ? "w-full m-2 md:m-3"
                    : "w-[180px] md:w-[300px] m-2 md:m-3"
                }
              >
                {child}
              </div>
            ))}
          </div>
        ) : (
          children
        )}
      </div>
    </section>
  );
};

export default SectionContainer;
