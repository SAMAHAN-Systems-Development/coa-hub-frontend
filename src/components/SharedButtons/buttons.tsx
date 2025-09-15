import * as React from "react";
import { cn } from "@/lib/utils";
import { Button as BaseButton } from "@/components/ui/button";

// Icons component - supports image paths for any icon
const Icons = ({
  className,
  imageSrc,
}: {
  className?: string;
  imageSrc?: string;
}) => {
  if (!imageSrc) return null;

  return (
    <img
      src={imageSrc}
      alt="Icon"
      className={cn("w-8 h-8 object-contain", className)}
    />
  );
};

type Size = "sm" | "md" | "lg" | "xl";
type Variant =
  | "primaryButtons"
  | "secondaryButtons"
  | "primaryModal"
  | "secondaryModal"
  | "dangerModal"
  | "iconButton"
  | "linkButton";
type PrimaryTone = "light" | "mid" | "dark" | "glass" | "";

export interface SharedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  primaryTone?: PrimaryTone;
  secondarySize?: "compact" | "full";
  iconPosition?: "left" | "right";
  showIcon?: boolean;
  iconSrc?: string; // Path to custom icon/image
}

export const SharedButton = React.forwardRef<
  HTMLButtonElement,
  SharedButtonProps
>(
  (
    {
      className,
      variant = "primaryButtons",
      size = "md",
      disabled,
      children,
      primaryTone = "dark",
      secondarySize = "full",
      iconPosition = "left",
      showIcon = false,
      iconSrc,
      ...props
    },
    ref
  ) => {
	
	// Size classes - different for primary buttons vs modal buttons
	const primaryButtonSizes: Record<Size, string> = {
		sm: "h-10 px-6 text-sm min-w-[120px]",
		md: "h-11 px-8 text-sm min-w-[150px]",
		lg: "h-12 px-10 text-base min-w-[180px]",
		xl: "h-14 px-12 text-base min-w-[210px]",
	};
	
	const modalButtonSizes: Record<Size, string> = {
		sm: "h-10 px-3 text-sm min-w-[70px]",
		md: "h-11 px-4 text-sm min-w-[80px]",
		lg: "h-12 px-5 text-base min-w-[90px]",
		xl: "h-13 px-6 text-base min-w-[100px]",
	};
	
	// Separate sizing for cancel button (secondaryModal)
	const cancelButtonSizes: Record<Size, string> = {
		sm: "h-10 px-6 text-sm min-w-[50px]",
		md: "h-11 px-8 text-sm min-w-[60px]",
		lg: "h-12 px-10 text-base min-w-[60px]",
		xl: "h-13 px-12 text-base min-w-[200px]",
	};
	
	// Icon button sizes 
	const iconButtonSizes: Record<Size, string> = {
		sm: "h-10 px-4 min-w-[120px]",
		md: "h-12 px-5 min-w-[160px]", 
		lg: "h-14 px-6 min-w-[200px]",
		xl: "h-16 px-8 min-w-[240px]",
	};
	
	// Link button sizes
	const linkButtonSizes: Record<Size, string> = {
		sm: "text-sm",
		md: "text-base",
		lg: "text-lg", 
		xl: "text-xl",
	};
	
    const sizeClasses =
      variant === "primaryButtons"
        ? primaryButtonSizes
        : variant === "secondaryButtons"
        ? secondarySize === "compact"
          ? modalButtonSizes
          : primaryButtonSizes
        : variant === "secondaryModal"
        ? cancelButtonSizes
        : variant === "iconButton"
        ? iconButtonSizes
        : variant === "linkButton"
        ? linkButtonSizes
        : modalButtonSizes;

    const base =
      variant === "linkButton"
        ? "font-normal transition-all duration-200 ease-out focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none"
        : "rounded-sm font-normal transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";


  // Primary Button Variants (light, mid, dark, and glass)
  const primaryButtonsLight =
    "relative overflow-hidden text-white font-normal rounded-sm " +
    "bg-[#9a9fa7] " +
    "border border-transparent " +
    "shadow-[0_16px_40px_-20px_rgba(0,0,0,.3)] " +
    "hover:bg-[#a8adb5] " +
    "hover:shadow-[0_20px_48px_-24px_rgba(0,0,0,.4)] " +
    "active:bg-[#8c9199] active:translate-y-[1px] " +
    "active:shadow-[0_8px_20px_-8px_rgba(0,0,0,.2)] " +
    "focus-visible:ring-gray-400 ";

  const primaryButtonsMid =
    "relative overflow-hidden text-white font-normal rounded-sm " +
    "bg-[#49515A] " +
    "border border-transparent " +
    "shadow-[0_16px_40px_-20px_rgba(0,0,0,.25)] " +
    "hover:bg-[#545c65] hover:shadow-[0_20px_48px_-24px_rgba(0,0,0,.35)] " +
    "active:bg-[#3e464f] active:translate-y-[1px] active:shadow-[0_8px_20px_-8px_rgba(0,0,0,.15)] ";

  const primaryButtonsDark =
    "relative overflow-hidden text-white font-normal rounded-sm " +
    "bg-gradient-to-b from-[#6C7178] to-[#373C44] " +
    "border border-transparent " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,.15),0_16px_40px_-20px_rgba(0,0,0,.6)] " +
    "hover:from-[#757b82] hover:to-[#3f444c] " +
    "hover:shadow-[inset_0_1px_0_rgba(255,255,255,.2),0_20px_48px_-24px_rgba(0,0,0,.7)] " +
    "active:from-[#63696f] active:to-[#2f343c] active:translate-y-[1px] active:shadow-[inset_0_1px_0_rgba(255,255,255,.1),0_8px_20px_-8px_rgba(0,0,0,.4)] " +
    "focus-visible:ring-gray-400 " +
    "before:content-[''] before:absolute before:inset-x-0 before:-top-px before:h-1/2 before:bg-gradient-to-b before:from-white/15 before:to-transparent before:pointer-events-none before:rounded-t-sm ";

  // Primary Button Glass (glassmorphism)
  const primaryButtonsGlass =
    "relative bg-white/20 text-white backdrop-blur-[20px] " +
    "bg-gradient-to-br from-[#9A9FA7]/30 to-[#E7EAEF]/30 " +
    "border border-white/30 " +
    "rounded-[7px] " +
    "shadow-[inset_0_0_4px_rgba(255,255,255,0.2)] " +
    "hover:bg-white/20 hover:text-white hover:border-white/30 " +
    "hover:bg-gradient-to-br hover:from-[#9A9FA7]/30 hover:to-[#E7EAEF]/30 " +
    "active:bg-white/5 " +
    "transition-all duration-200 " +
    "py-[20px] px-[32px]";

  const primaryButtons =
    primaryTone === "light"
      ? primaryButtonsLight
      : primaryTone === "mid"
      ? primaryButtonsMid
      : primaryTone === "glass"
      ? primaryButtonsGlass
      : primaryButtonsDark;



  //secondary buttons
  const secondaryButtons =
    "relative bg-white/20 text-white backdrop-blur-[20px] " +
    "bg-gradient-to-br from-[#9A9FA7]/30 to-[#E7EAEF]/30 " +
    "border border-white/30 " +
    "rounded-[7px] " +
    "shadow-[inset_0_0_4px_rgba(255,255,255,0.2)] " +
    "hover:bg-white/20 hover:text-white hover:border-white/30 " +
    "hover:bg-gradient-to-br hover:from-[#9A9FA7]/30 hover:to-[#E7EAEF]/30 " +
    "active:bg-white/5 " +
    "transition-all duration-200 " +
    "py-[20px] px-[32px]";

  // primary modal variant (save buttons)
  const primaryModal =
    "relative bg-[#49515A] text-white " +
    "border border-[#6C7178]/50 " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,.1),0_16px_40px_-20px_rgba(0,0,0,.6)] " +
    "hover:bg-[#3e464f] hover:shadow-[inset_0_1px_0_rgba(255,255,255,.15),0_20px_48px_-24px_rgba(0,0,0,.7)] " +
    "active:bg-[#373C44] active:translate-y-[1px] active:shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_8px_20px_-8px_rgba(0,0,0,.4)] " +
    "focus-visible:ring-gray-500";

  // secondary modal (cancel, go back buttons)
  const secondaryModal =
    "relative bg-white/20 text-white backdrop-blur-[20px] " +
    "bg-gradient-to-br from-[#9A9FA7]/30 to-[#E7EAEF]/30 " +
    "border border-white/30 " +
    "rounded-[7px] " +
    "shadow-[inset_0_0_4px_rgba(255,255,255,0.2)] " +
    "hover:bg-white/20 hover:text-white hover:border-white/30 " +
    "hover:bg-gradient-to-br hover:from-[#9A9FA7]/30 hover:to-[#E7EAEF]/30 " +
    "active:bg-white/5 " +
    "transition-all duration-200 " +
    "py-[20px] px-[32px]";


  // danger modal (delete)
  const dangerModal =
    "relative bg-white/20 text-white backdrop-blur-[24px] " +
    "border border-white/30 " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,.3),0_16px_40px_-20px_rgba(0,0,0,.15)] " +
    "hover:bg-white/30 hover:border-white/50 " +
    "hover:shadow-[inset_0_1px_0_rgba(255,255,255,.4),0_20px_48px_-24px_rgba(0,0,0,.2)] " +
    "active:bg-white/15 active:translate-y-[1px] " +
    "active:shadow-[inset_0_1px_0_rgba(255,255,255,.2),0_8px_20px_-8px_rgba(0,0,0,.1)] " +
    "focus-visible:ring-white/50 " +
    "before:content-[''] before:absolute before:inset-x-0 before:-top-px before:h-1/2 before:bg-gradient-to-b before:from-white/25 before:to-transparent before:pointer-events-none before:rounded-t-sm ";

  // Icon button
  const iconButton =
    "bg-[#49515A] text-white rounded-lg " +
    "border border-[#373C44] " +
    "shadow-lg " +
    "hover:bg-[#373C44] hover:border-[#6C7178] " +
    "active:bg-[#373C44] active:scale-95 " +
    "transition-all duration-200 ease-out " +
    "flex items-center justify-center gap-3 " +
    "focus-visible:ring-2 focus-visible:ring-[#9A9FA7] focus-visible:ring-offset-2 ";

  // link buttons
  const linkButton =
    "bg-transparent text-white border-none rounded-none " +
    "p-0 h-auto min-w-0 " +
    "font-normal underline-offset-4 " +
    "hover:underline hover:text-white hover:bg-transparent " +
    "active:text-white/80 active:bg-transparent " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 " +
    "transition-all duration-200 ease-out " +
    "inline-flex items-center justify-start ";

  const variantClasses =
    variant === "primaryButtons"
      ? primaryButtons
      : variant === "secondaryButtons"
      ? secondaryButtons
      : variant === "primaryModal"
      ? primaryModal
      : variant === "secondaryModal"
      ? secondaryModal
      : variant === "dangerModal"
      ? dangerModal
      : variant === "iconButton"
      ? iconButton
      : variant === "linkButton"
      ? linkButton
      : "";

  return (
    <BaseButton
      ref={ref}
      className={cn(base, sizeClasses[size], variantClasses, className)}
      disabled={disabled}
      {...props}
    >
      {variant === "iconButton" ? (
        showIcon ? (
          <>
            <Icons className="w-6 h-6" imageSrc={iconSrc} />
            {children && <span className="font-medium">{children}</span>}
          </>
        ) : (
          children
        )
      ) : (
        <>
          {showIcon && iconPosition === "left" && (
            <Icons className="mr-2" imageSrc={iconSrc} />
          )}
          {children}
          {showIcon && iconPosition === "right" && (
            <Icons className="ml-2" imageSrc={iconSrc} />
          )}
        </>
      )}
    </BaseButton>
  );
}
);

SharedButton.displayName = "SharedButton";
