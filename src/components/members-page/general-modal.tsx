"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SharedButton } from "@/components/shared/SharedButton";

type ModalVariant =
  | "create"
  | "edit"
  | "delete"
  | "cancel-create"
  | "cancel-edit"
  | "create-category"
  | "edit-category"
  | "delete-category"
  | "cancel-create-category"
  | "cancel-edit-category";

interface GeneralModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: ModalVariant;
  onConfirm: () => void;
  memberName?: string; // For delete modal
}

const modalConfig = {
  create: {
    title: "CREATE NEW MEMBER?",
    description:
      "Are you sure you want to save the new member? Information will be saved.",
    confirmText: "Save",
    cancelText: "Go Back",
    confirmVariant: "primary" as const,
    confirmTone: "mid" as const,
  },
  edit: {
    title: "EDIT MEMBER?",
    description:
      "Are you sure you want to edit this member? Information will be saved.",
    confirmText: "Save",
    cancelText: "Go Back",
    confirmVariant: "primary" as const,
    confirmTone: "mid" as const,
  },
  delete: {
    title: "DELETE MEMBER?",
    description: (name: string) =>
      `Are you sure you want to permanently delete ${name} as a member? This cannot be undone.`,
    confirmText: "Delete",
    cancelText: "Cancel",
    confirmVariant: "danger" as const,
    confirmTone: undefined,
  },
  "cancel-create": {
    title: "CANCEL ADDING NEW MEMBER?",
    description:
      "Are you sure you want to cancel adding new member? New information will not be saved",
    confirmText: "Cancel",
    cancelText: "Go Back",
    confirmVariant: "secondary" as const,
    confirmTone: undefined,
  },
  "cancel-edit": {
    title: "CANCEL EDITING MEMBER?",
    description:
      "Are you sure you want to cancel editing this member? New information will not be saved",
    confirmText: "Cancel",
    cancelText: "Go Back",
    confirmVariant: "secondary" as const,
    confirmTone: undefined,
  },
  "create-category": {
    title: "CREATE NEW CATEGORY?",
    description:
      "Are you sure you want to save the new category? Information will be saved.",
    confirmText: "Save",
    cancelText: "Go Back",
    confirmVariant: "primary" as const,
    confirmTone: "mid" as const,
  },
  "edit-category": {
    title: "EDIT CATEGORY?",
    description:
      "Are you sure you want to edit this category? Information will be saved.",
    confirmText: "Save",
    cancelText: "Go Back",
    confirmVariant: "primary" as const,
    confirmTone: "mid" as const,
  },
  "delete-category": {
    title: "DELETE CATEGORY?",
    description: (name: string) =>
      `Are you sure you want to permanently delete ${name} category? This cannot be undone.`,
    confirmText: "Delete",
    cancelText: "Cancel",
    confirmVariant: "danger" as const,
    confirmTone: undefined,
  },
  "cancel-create-category": {
    title: "CANCEL ADDING NEW CATEGORY?",
    description:
      "Are you sure you want to cancel adding new category? New information will not be saved",
    confirmText: "Cancel",
    cancelText: "Go Back",
    confirmVariant: "secondary" as const,
    confirmTone: undefined,
  },
  "cancel-edit-category": {
    title: "CANCEL EDITING CATEGORY?",
    description:
      "Are you sure you want to cancel editing this category? New information will not be saved",
    confirmText: "Cancel",
    cancelText: "Go Back",
    confirmVariant: "secondary" as const,
    confirmTone: undefined,
  },
};

export default function GeneralModal({
  isOpen,
  onClose,
  variant,
  onConfirm,
  memberName = "{name}",
}: GeneralModalProps) {
  const config = modalConfig[variant];

  const description =
    typeof config.description === "function"
      ? config.description(memberName)
      : config.description;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-lg p-0 overflow-hidden border-none"
        showCloseButton={false}
      >
        <div
          className="p-8"
          style={{
            background:
              "linear-gradient(18deg, #3a4149 0%, #4a5159 45%, #5a6169 100%)",
          }}
        >
          <DialogHeader className="space-y-4">
            <DialogTitle
              className="text-3xl md:text-4xl font-bebas-neue uppercase text-center"
              style={{ color: "#E7EAEF" }}
            >
              {config.title}
            </DialogTitle>
            <DialogDescription
              className="text-xs md:text-sm font-montserrat text-center leading-relaxed"
              style={{ color: "#E7EAEF" }}
            >
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center gap-4 mt-8">
            <SharedButton
              variant={config.confirmVariant}
              tone={config.confirmTone}
              size="lg"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {config.confirmText}
            </SharedButton>
            <SharedButton variant="secondary" size="lg" onClick={onClose}>
              {config.cancelText}
            </SharedButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
