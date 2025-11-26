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

interface EditFormDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function EditFormDialog({
  isOpen,
  onConfirm,
  onCancel,
}: EditFormDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onCancel}>
      <AlertDialogContent className="bg-gradient-to-r from-[#373C44] to-[#6C7178] border-none text-white w-[85vw] max-w-[320px] sm:min-w-[750px] sm:w-auto sm:max-w-[90vw] px-6 py-6 sm:px-20 sm:py-8 rounded-2xl">
        <AlertDialogHeader className="space-y-3 sm:space-y-6">
          <AlertDialogTitle
            className="text-3xl sm:text-6xl font-normal text-center text-[#E7EAEF] uppercase tracking-wide whitespace-normal sm:whitespace-nowrap pt-2 sm:pt-4 leading-tight"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            EDIT POST?
          </AlertDialogTitle>
          <AlertDialogDescription
            className="text-center text-[#E7EAEF] text-sm sm:text-lg font-normal leading-relaxed whitespace-normal sm:whitespace-nowrap"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Are you sure you want to do edit this existing announcement?
            <br />
            Overwritten information cannot be brought back.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row justify-center gap-3 sm:gap-8 pt-4 sm:pt-8 pb-1 sm:pb-2 sm:justify-center">
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-gradient-to-r from-[#6C7178] to-[#49515A] hover:from-[#373c44] hover:to-[#373c44] text-white px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base rounded-sm border-none h-auto font-normal w-[70px] sm:w-[100px] transition-all"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Edit
          </AlertDialogAction>
          <AlertDialogCancel
            onClick={onCancel}
            className="bg-white/5 backdrop-blur-md hover:bg-white/15 hover:brightness-110 text-white hover:text-white px-3 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-sm border border-white/40 h-auto font-normal w-[80px] sm:w-[120px] transition-all"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
