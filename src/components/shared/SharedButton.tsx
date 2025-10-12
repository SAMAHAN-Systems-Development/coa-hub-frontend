import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button as BaseButton } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

const buttonVariants = cva(
  // Base styles
  "font-montserrat font-normal transition-all duration-500 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "relative overflow-hidden text-white border border-transparent",
        secondary:
          "relative bg-white/20 text-white backdrop-blur-[20px] bg-gradient-to-br from-secondary/30 to-background/30 border border-white/30 shadow-[inset_0_0_4px_rgba(255,255,255,0.2)] hover:bg-white/20 hover:border-white/30 active:bg-white/5",
        danger:
          "relative !bg-danger text-danger-foreground !border-danger shadow-[0_16px_40px_-20px_rgba(220,38,38,.8)] hover:!bg-danger/90 hover:!border-danger/90 hover:shadow-[0_20px_48px_-24px_rgba(220,38,38,.9)] active:!bg-danger/80 active:translate-y-[1px] active:shadow-[0_8px_20px_-8px_rgba(220,38,38,.6)] focus-visible:ring-danger",
        icon: "text-white rounded-lg border shadow-lg flex items-center justify-center gap-3",
        link: "bg-transparent text-white border-none rounded-none p-0 h-auto min-w-0 underline-offset-4 hover:underline hover:text-white hover:bg-transparent active:text-white/80 active:bg-transparent focus-visible:ring-white/50 inline-flex items-center justify-start",
      },
      tone: {
        light:
          "bg-secondary shadow-[0_16px_40px_-20px_rgba(0,0,0,.3)] hover:opacity-90 hover:shadow-[0_20px_48px_-24px_rgba(0,0,0,.4)] active:opacity-80 active:translate-y-[1px] active:shadow-[0_8px_20px_-8px_rgba(0,0,0,.2)] focus-visible:ring-secondary",
        mid: "bg-primary shadow-[0_16px_40px_-20px_rgba(0,0,0,.25)] hover:opacity-90 hover:shadow-[0_20px_48px_-24px_rgba(0,0,0,.35)] active:opacity-80 active:translate-y-[1px] active:shadow-[0_8px_20px_-8px_rgba(0,0,0,.15)]",
        dark: "bg-gradient-to-b from-muted-foreground to-foreground shadow-[inset_0_1px_0_rgba(255,255,255,.15),0_16px_40px_-20px_rgba(0,0,0,.6)] hover:opacity-90 hover:shadow-[inset_0_1px_0_rgba(255,255,255,.2),0_20px_48px_-24px_rgba(0,0,0,.7)] active:opacity-80 active:translate-y-[1px] active:shadow-[inset_0_1px_0_rgba(255,255,255,.1),0_8px_20px_-8px_rgba(0,0,0,.4)] focus-visible:ring-muted-foreground",
        glass:
          "bg-white/20 backdrop-blur-[20px] bg-gradient-to-br from-secondary/30 to-background/30 border-white/30 shadow-[inset_0_0_4px_rgba(255,255,255,0.2)] hover:bg-white/20 hover:border-white/30 active:bg-white/5",
      },
      size: {
        sm: "h-10 px-3 text-sm",
        md: "h-11 px-4 text-sm",
        lg: "h-12 px-5 text-base",
        xl: "h-14 px-6 text-base",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      tone: "dark",
      size: "md",
      rounded: "sm",
    },
  },
)

export interface SharedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  iconPosition?: "left" | "right"
  icon?: LucideIcon
}

export const SharedButton = React.forwardRef<HTMLButtonElement, SharedButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      tone = "dark",
      rounded = "sm",
      disabled,
      children,
      iconPosition = "left",
      icon: Icon,
      ...props
    },
    ref,
  ) => {
    return (
      <BaseButton
        ref={ref}
        className={cn(
          buttonVariants({
            variant,
            size,
            tone: variant === "primary" ? tone : null,
            rounded,
          }),
          className,
        )}
        disabled={disabled}
        {...props}
      >
        {variant === "icon" ? (
          Icon ? (
            <>
              <Icon className="w-4 h-4" />
              {children && <span className="font-medium">{children}</span>}
            </>
          ) : (
            children
          )
        ) : (
          <>
            {Icon && iconPosition === "left" && <Icon className="w-4 h-4 mr-2" />}
            {children}
            {Icon && iconPosition === "right" && <Icon className="w-4 h-4 ml-2" />}
          </>
        )}
      </BaseButton>
    )
  },
)

SharedButton.displayName = "SharedButton"
