"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { SharedButton } from "@/components/shared/SharedButton"; 

interface ActionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description: string;

  confirmText: string;
  cancelText: string;

  onConfirm: () => void;
  onCancel?: () => void;

  destructive?: boolean; // for delete modal
}

export default function ActionModal({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  destructive = false,
}: ActionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full !max-w-[50vw] sm:max-w-[1100px] rounded-xl p-10 text-white border border-white/10 [&>button]:hidden"
        style={{
          background: "linear-gradient(225deg, #6C7178 0%, #373C44 100%)",
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-center font-medium text-4xl md:text-6xl font-bebas-neue tracking-wide">
            {title}
          </DialogTitle>
        </DialogHeader>

        <p className="text-center text-base md:text-lg font-light mt-3">
          {description}
        </p>

        <div className="mt-8 flex justify-center gap-4">
            {/* CONFIRM BUTTON */}
            <SharedButton
              onClick={onConfirm}
              variant="primary"
              tone="glass" 
              size="lg"
              rounded="lg"
              className="min-w-[150px] text-lg"
            >
              {confirmText}
            </SharedButton>

            {/* CANCEL BUTTON */}
            <SharedButton
              onClick={onCancel ?? (() => onOpenChange(false))}
              variant="primary"
              tone="glass"
              size="lg"
              rounded="lg"
              className="min-w-[150px] text-lg"
            >
              {cancelText}
            </SharedButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
