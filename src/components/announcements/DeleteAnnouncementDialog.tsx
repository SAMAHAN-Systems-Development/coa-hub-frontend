"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface DeleteAnnouncementDialogProps {
  isOpen: boolean;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export default function DeleteAnnouncementDialog({
  isOpen,
  onConfirm,
  onCancel,
}: DeleteAnnouncementDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsDeleting(true);
      await onConfirm();
    } catch (error) {
      console.error("Error deleting announcement: ", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onCancel}>
      <AlertDialogContent className="bg-gradient-to-r from-[#373C44] to-[#6C7178] border-none text-white min-w-[750px] w-auto max-w-[90vw] px-20 py-8 sm:min-w-[750px]">
        <AlertDialogHeader className="space-y-6">
          <AlertDialogTitle
            className="text-6xl font-normal text-center text-[#E7EAEF] uppercase tracking-wide whitespace-nowrap pt-4"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            DELETE POST?
          </AlertDialogTitle>
          <AlertDialogDescription
            className="text-center text-[#E7EAEF] text-lg font-normal leading-relaxed whitespace-nowrap"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Are you sure you want to permanently delete this announcement?
            <br />
            This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center gap-8 pt-8 pb-2 sm:justify-center">
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isDeleting}
            className="bg-gradient-to-r from-[#6C7178] to-[#49515A] hover:from-[#373c44] hover:to-[#373c44] text-white px-5 py-3 text-base rounded-sm border-none h-auto font-normal w-[100px] transition-all"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
          <AlertDialogCancel
            onClick={onCancel}
            disabled={isDeleting}
            className="bg-white/5 backdrop-blur-md hover:bg-white/15 hover:brightness-110 text-white hover:text-white px-8 py-3 text-base rounded-sm border border-white/40 h-auto font-normal w-[120px] transition-all"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
