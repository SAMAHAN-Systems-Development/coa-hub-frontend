import React from "react";

export interface SpacerProps {
  size?: number;
  axis?: "vertical" | "horizontal";
  className?: string;
}
/**
 * Spacer
 * - Creates adjustable space between elements
 * - by default, adds vertical space of 1rem (size=4)
 * - eg. <Spacer size={4} axis="vertical" />
 */
export const Spacer: React.FC<SpacerProps> = ({
  size = 4,
  axis = "vertical",
  className = "",
}) => {
  const style =
    axis === "vertical"
      ? {
          height: `var(--tw-space-y-reverse, 0)`,
          minHeight: `${size * 0.25}rem`,
          width: "100%",
        }
      : {
          width: `var(--tw-space-x-reverse, 0)`,
          minWidth: `${size * 0.25}rem`,
          height: "100%",
        };
  return <div style={style} className={className} aria-hidden="true" />;
};

export default Spacer;
