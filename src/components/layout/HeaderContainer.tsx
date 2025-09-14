import React from "react";

export interface HeaderContainerProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  className?: string;
  hero?: boolean;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * HeaderContainer
 * - Hero style: diagonal gradient
 * - eg. <HeaderContainer hero title="Welcome" subtitle="Subtitle" />
 * - for general pages, set hero to false or omit
 * - eg. <HeaderContainer title="Page Title" />
 */
export const HeaderContainer: React.FC<HeaderContainerProps> = ({
  title,
  subtitle,
  breadcrumbs,
  className = "",
  hero = false,
  actions,
  children,
}) => {
  if (hero) {
    return (
      <div
        className={`w-full relative py-14 md:py-20 flex flex-col items-center justify-center text-center rounded-b-lg overflow-hidden ${className}`}
      >
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(22deg, #32383e 0%, #485159 42%, #6b7680 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_55%,rgba(0,0,0,0.30)_100%)]" />
        {breadcrumbs && (
          <div className="mb-3 text-xs md:text-sm text-white/60 tracking-wide uppercase">
            {breadcrumbs}
          </div>
        )}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow uppercase">
          {title}
        </h1>
        {subtitle && (
          <div className="mt-3 text-xl md:text-2xl font-semibold text-white/80 uppercase tracking-wide">
            {subtitle}
          </div>
        )}
        {actions && <div className="mt-4">{actions}</div>}{" "}
        {children && <div className="mt-6 w-full">{children}</div>}
      </div>
    );
  }

  return (
    <div>
      <header
        className={`w-full px-4 py-4 rounded-md flex justify-center md:justify-between ${className}`}
        style={{
          background:
            "linear-gradient(18deg, #6b7680 0%, #485159 45%, #32383e 100%)",
        }}
      >
        {breadcrumbs && (
          <div className="text-[10px] font-semibold tracking-wider text-white/60 uppercase mb-0.5">
            {breadcrumbs}
          </div>
        )}
        <span className="block text-xl md:text-3xl font-bold uppercase tracking-tight text-white">
          {title}
        </span>
        {actions && <div className="flex items-center">{actions}</div>}{" "}
      </header>
    </div>
  );
};

export default HeaderContainer;
