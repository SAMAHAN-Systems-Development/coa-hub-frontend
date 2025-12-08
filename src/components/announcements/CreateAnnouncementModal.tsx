"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BiPlus } from "react-icons/bi";
import CancelFormDialog from "@/components/announcements/CancelFormDialog";
import CreateFormDialog from "@/components/announcements/CreateFormDialog";
import ImageUploadField from "@/components/announcements/ImageUploadField";
import { useCreateAnnouncementMutation } from "@/lib/api/mutations/announcement.mutation";
import {
  AnnouncementFormSchema,
  AnnouncementFormData,
} from "@/lib/zod/announcement";

interface CreateAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateAnnouncementModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateAnnouncementModalProps) {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const createMutation = useCreateAnnouncementMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<AnnouncementFormData>({
    resolver: zodResolver(AnnouncementFormSchema),
    defaultValues: { subject: "", body: "", images: [] },
  });

  const images = watch("images");

  const onSubmit = () => {
    setShowCreateDialog(true);
  };

  const handleCreateConfirm = async () => {
    const formData = watch();
    setShowCreateDialog(false);

    try {
      await createMutation.mutateAsync({
        title: formData.subject,
        description: formData.body,
        // TODO: Add image upload when file storage is implemented
        images: [],
      });
      reset();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Failed to create announcement:", error);
      alert("Failed to create announcement. Please try again.");
    }
  };

  const handleCreateDialogClose = () => {
    setShowCreateDialog(false);
  };

  const handleCancelClick = () => {
    setShowCancelDialog(true);
  };

  const handleCancelConfirm = () => {
    setShowCancelDialog(false);
    reset();
    onClose();
  };

  const handleCancelDialogClose = () => {
    setShowCancelDialog(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCancelClick();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          className="bg-gradient-to-br from-[#52575F] to-[#3D4249] border-none max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto p-6 sm:p-8"
          showCloseButton={false}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 sm:gap-4 justify-center sm:justify-start">
              <BiPlus
                className="h-8 w-8 sm:h-12 sm:w-12 text-[#E7EAEF]"
                strokeWidth={0.1}
              />
              <span
                className="text-2xl sm:text-4xl font-normal text-[#E7EAEF] uppercase tracking-wide"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                New Announcement
              </span>
            </DialogTitle>
          </DialogHeader>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 sm:space-y-6 mt-4"
          >
            {/* Subject Field */}
            <div className="bg-gradient-to-r from-[#6C7178] to-[#373C44] rounded-2xl p-3 sm:p-6">
              <div className="px-4 sm:px-0 space-y-2 sm:space-y-3">
                <Label
                  htmlFor="modal-subject"
                  className="text-[#E7EAEF] text-base sm:text-lg font-medium"
                >
                  Subject
                </Label>
                <Input
                  id="modal-subject"
                  type="text"
                  placeholder="Add Subject..."
                  {...register("subject")}
                  className="bg-[#e7eaef] border border-[#373C44] text-gray-800 placeholder:text-gray-400 h-[38px] sm:h-[46px] text-base focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-4"
                  aria-invalid={!!errors.subject}
                />
                {errors.subject && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>
            </div>

            {/* Body Field */}
            <div className="bg-gradient-to-r from-[#6C7178] to-[#373C44] rounded-2xl p-3 sm:p-6">
              <div className="px-4 sm:px-0 space-y-2 sm:space-y-3">
                <Label
                  htmlFor="modal-body"
                  className="text-[#E7EAEF] text-base sm:text-lg font-medium"
                >
                  Body
                </Label>
                <Textarea
                  id="modal-body"
                  placeholder="Add Text..."
                  {...register("body")}
                  rows={8}
                  className="bg-[#e7eaef] border border-[#373C44] text-gray-800 placeholder:text-gray-400 resize-none text-base focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-4 min-h-[150px]"
                  aria-invalid={!!errors.body}
                />
                {errors.body && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.body.message}
                  </p>
                )}
              </div>
            </div>

            {/* Images Field */}
            <div className="bg-gradient-to-r from-[#6C7178] to-[#373C44] rounded-2xl p-3 sm:p-6">
              <div className="px-4 sm:px-0 space-y-2 sm:space-y-3">
                <Label className="text-[#E7EAEF] text-base sm:text-lg font-medium">
                  Images
                </Label>
                <ImageUploadField
                  value={images}
                  onChange={(files) =>
                    setValue("images", files, { shouldValidate: true })
                  }
                  maxFiles={5}
                  maxSizeMB={5}
                />
                {errors.images && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.images.message}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row justify-end gap-4 sm:gap-4 pt-3 sm:pt-4">
              <Button
                type="submit"
                disabled={createMutation.isPending}
                className="w-24 sm:flex-none sm:w-auto bg-gradient-to-r from-[#6C7178] to-[#49515A] hover:from-[#373c44] hover:to-[#373c44] text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-sm border-none h-auto font-normal transition-all disabled:opacity-50"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {createMutation.isPending ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                onClick={handleCancelClick}
                className="w-24 sm:flex-none sm:w-auto bg-white/5 backdrop-blur-md hover:bg-white/10 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-sm border border-white/40 h-auto font-normal shadow-sm"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <CancelFormDialog
        isOpen={showCancelDialog}
        mode="create"
        onConfirm={handleCancelConfirm}
        onCancel={handleCancelDialogClose}
      />

      {/* Create Dialog */}
      <CreateFormDialog
        isOpen={showCreateDialog}
        onConfirm={handleCreateConfirm}
        onCancel={handleCreateDialogClose}
      />
    </>
  );
}
