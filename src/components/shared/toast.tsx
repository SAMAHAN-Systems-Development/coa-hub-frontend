"use client";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckCircle2, XCircle, Info, AlertTriangle } from "lucide-react";

export type ToastVariant = "success" | "error" | "info" | "warning";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

const containerVariants = cva("flex items-center gap-3 w-full", {
  variants: {
    size: {
      base: "text-xs p-2", // <640
      sm: "text-xs p-3", // ≥640
      md: "text-sm p-3", // ≥768
      lg: "text-sm p-4", // ≥1024
      xl: "text-md p-4", // ≥1280
      "2xl": "text-base p-5", // ≥1536  extra
    },
  },
  defaultVariants: { size: "base" },
});

const iconVariants = cva("shrink-0", {
  variants: {
    size: {
      base: "h-5 w-5", // <640
      sm: "h-6 w-6", // ≥640
      md: "h-6 w-6", // ≥768
      lg: "h-7 w-7", // ≥1024
      xl: "h-7 w-7", // ≥1280
      "2xl": "h-8 w-8", // ≥1536  extra
    },
  },
  defaultVariants: { size: "base" },
});

export type ToastSize = NonNullable<
  VariantProps<typeof containerVariants>["size"]
>;

function getResponsiveSize(): ToastSize {
  if (typeof window === "undefined") return "base";
  const w = window.innerWidth;
  if (w >= 1536) return "2xl"; // extra
  if (w >= 1280) return "xl";
  if (w >= 1024) return "lg";
  if (w >= 768) return "md";
  if (w >= 640) return "sm";
  return "base";
}

// variants configuration
const variantConfig: Record<
  ToastVariant,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  success: { icon: CheckCircle2, color: "text-emerald-500" },
  error: { icon: XCircle, color: "text-rose-500" },
  info: { icon: Info, color: "text-sky-500" },
  warning: { icon: AlertTriangle, color: "text-amber-500" },
};

export interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  size?: ToastSize;
  position?: ToastPosition;
}

function showToast(variant: ToastVariant, opts: ToastOptions) {
  // default values
  const {
    title,
    description,
    duration = 4000,
    size,
    position = "bottom-right",
  } = opts;

  const sizeKey = size ?? getResponsiveSize();
  const { icon: Icon, color } = variantConfig[variant];

  return toast(
    <div className={cn(containerVariants({ size: sizeKey }))}>
      <div className="flex items-center">
        <Icon className={cn(iconVariants({ size: sizeKey }), color)} />
      </div>
      <div className="flex flex-col">
        {title && <div className="font-medium">{title}</div>}
        {description && <div className="opacity-80">{description}</div>}
      </div>
    </div>,
    {
      duration,
      position,
    }
  );
}

export const toastSuccess = (opts: ToastOptions) => showToast("success", opts);
export const toastError = (opts: ToastOptions) => showToast("error", opts);
export const toastInfo = (opts: ToastOptions) => showToast("info", opts);
export const toastWarning = (opts: ToastOptions) => showToast("warning", opts);