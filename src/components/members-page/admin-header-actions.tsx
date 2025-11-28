"use client";

import { Copy, Pencil, Trash2, X } from "lucide-react";
import Spacer from "@/components/layout/Spacer";

export type HeaderMode = "default" | "edit" | "delete";

interface AdminHeaderActionsProps {
  mode: HeaderMode;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

export default function AdminHeaderActions({
  mode,
  onAdd,
  onEdit,
  onDelete,
  onCancel,
}: AdminHeaderActionsProps) {
  if (mode === "edit" || mode === "delete") {
    return (
      <button
        onClick={onCancel}
        className="hover:opacity-80 transition-opacity"
        aria-label="Cancel action"
      >
        <X className="w-6 h-6 text-white" />
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={onAdd}
        className="hover:opacity-80 transition-opacity"
        aria-label="Add member"
      >
        <Copy className="w-6 h-6 text-white" />
      </button>
      <Spacer />
      <button
        onClick={onEdit}
        className="hover:opacity-80 transition-opacity"
        aria-label="Edit members"
      >
        <Pencil className="w-6 h-6 text-white" />
      </button>
      <Spacer />
      <button
        onClick={onDelete}
        className="hover:opacity-80 transition-opacity"
        aria-label="Delete members"
      >
        <Trash2 className="w-6 h-6 text-white" />
      </button>
      <Spacer />
    </div>
  );
}
