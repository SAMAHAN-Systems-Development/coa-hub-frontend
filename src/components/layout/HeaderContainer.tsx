import React from "react";

export interface HeaderContainerProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  noBg?: boolean;
  whiteText?: boolean; // for the case of section fullWidth
  center?: boolean;
}

/**
 * HeaderContainer
 * - Hero style: diagonal gradient
 * - Title aligns left by default
 * - Use center={true} to center the title when no actions
 * - Use noBg={true} for a transparent background with black text
 */
export const HeaderContainer: React.FC<HeaderContainerProps> = ({
  title,
  subtitle,
  className = "",
  actions,
  children,
  noBg = false,
  whiteText = false,
  center = false,
}) => {
  const TEXT_COLOR = whiteText
    ? "text-white"
    : noBg
      ? "text-black"
      : "text-white";

  const justification = actions
    ? "justify-between"
    : center
      ? "justify-center"
      : "justify-start";

  const textAlignment = actions
    ? "text-left"
    : center
      ? "text-center"
      : "text-left";

  return (
    <div
      className={`w-full px-4 py-4 rounded-md`}
      style={
        noBg
          ? {}
          : {
              background:
                "linear-gradient(18deg, #6b7680 0%, #485159 45%, #32383e 100%)",
            }
      }
    >
      <div className={`flex ${justification} ${className}`}>
        <span
          className={`text-2xl md:text-5xl font-bebas-neue uppercase flex items-center ${TEXT_COLOR}`}
        >
          {title}
        </span>
        {actions && <div className="flex items-center">{actions}</div>}
      </div>

      {subtitle && (
        <div
          className={`mt-2 text-[12px] ${textAlignment} font-montserrat ${TEXT_COLOR}`}
        >
          {subtitle}
        </div>
      )}

      {children}
    </div>
  );
};

export default HeaderContainer;
