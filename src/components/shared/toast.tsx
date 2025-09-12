"use client";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
    CheckCircle2,
    XCircle,
    Info,
    AlertTriangle,
} from "lucide-react";

export type ToastVariant = "success" | "error" | "info" | "warning";
export type ToastSize = "sm" | "md" | "lg" | "xl";
export type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export interface ToastOptions {
    title?: string;
    description?: string;
    duration?: number;
    size?: ToastSize;
    position?: ToastPosition;
}

// size configuration
const sizeMap: Record<ToastSize, string> = {
    sm: "text-xs p-2",
    md: "text-sm p-3",
    lg: "text-base p-4",
    xl: "text-lg p-5",
}

// variants configuration
const variantConfig: Record<
    ToastVariant,
    { icon: React.ComponentType<{ className?: string}>; color: string}
> = {
    success: { icon: CheckCircle2, color: "text-emerald-500" },
    error: { icon: XCircle, color: "text-rose-500" },
    info: { icon: Info, color: "text-sky-500" },
    warning: { icon: AlertTriangle, color: "text-amber-500" },
}

function showToast(variant: ToastVariant, opts: ToastOptions) {
    // default values
    const { title, description, duration = 4000, size = "md", position = "bottom-right" } = opts;
    const { icon: Icon, color } = variantConfig[variant];

    return toast(
    <div className={cn("flex items-center gap-3", sizeMap[size])}>
      <div className="flex items-center">
        <Icon className={cn("h-10 w-10 shrink-0", color)} />
      </div>
      <div className="flex flex-col">
        {title && <div className="font-medium">{title}</div>}
        {description && <div className="opacity-80">{description}</div>}
      </div>
    </div>,
    { 
      duration,
      position 
    }
  );
}

export const toastSuccess = (opts: ToastOptions) => showToast("success", opts);
export const toastError = (opts: ToastOptions) => showToast("error", opts);
export const toastInfo = (opts: ToastOptions) => showToast("info", opts);
export const toastWarning = (opts: ToastOptions) => showToast("warning", opts);