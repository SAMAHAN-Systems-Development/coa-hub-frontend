"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { SharedButton } from "@/components/shared/SharedButton";
import ActionModal from "@/components/features/action_modal";
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

  const handleCancel = () => {
    reset();
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          className="w-full !max-w-[1200px] max-h-full overflow-y-auto rounded-xl p-10 text-white border border-white/10 [&>button]:hidden"
          style={{
            background: "linear-gradient(225deg, #6C7178 0%, #373C44 100%)",
          }}
        >
          {/* HEADER */}
          <DialogHeader>
            <div className="mt-3 flex items-center gap-3">
              <Plus className="w-7 h-7 md:w-11 md:h-11" />
              <DialogTitle className="text-4xl md:text-5xl font-bebas-neue font-medium tracking-wide">
                NEW ANNOUNCEMENT
              </DialogTitle>
            </div>
          </DialogHeader>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-2 md:mt-8 space-y-6 pb-10 lg:pb-0"
          >
            {/* Subject Field */}
            <div
              className="rounded-2xl p-6 shadow-[0px_20px_60px_-20px_rgba(0,0,0,0.35)] flex flex-col gap-3"
              style={{
                background: "linear-gradient(90deg, rgba(120,125,133,0.65), rgba(55,60,68,0.90))",
              }}
            >
              <label className="text-white text-base md:text-xl font-medium">
                Subject
              </label>
              <Input
                type="text"
                placeholder="Add Subject..."
                {...register("subject")}
                className="bg-[#E6E9EE] text-gray-700 text-xs sm:text-sm md:text-xl placeholder:text-gray-500 rounded-xl h-12 border border-white/20 px-4"
                aria-invalid={!!errors.subject}
              />
              {errors.subject && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Body Field */}
            <div
              className="rounded-2xl p-6 shadow-[0px_20px_60px_-20px_rgba(0,0,0,0.35)] flex flex-col gap-3"
              style={{
                background: "linear-gradient(90deg, rgba(120,125,133,0.65), rgba(55,60,68,0.90))",
              }}
            >
              <label className="text-white text-base md:text-xl font-medium">
                Body
              </label>
              <Textarea
                placeholder="Add Text..."
                {...register("body")}
                rows={8}
                className="bg-[#E6E9EE] text-gray-700 text-xs sm:text-sm md:text-xl placeholder:text-gray-500 rounded-xl border border-white/20 px-4 min-h-[150px] resize-none"
                aria-invalid={!!errors.body}
              />
              {errors.body && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.body.message}
                </p>
              )}
            </div>

            {/* Images Field */}
            <div
              className="rounded-2xl p-6 shadow-[0px_20px_60px_-20px_rgba(0,0,0,0.35)] flex flex-col gap-3"
              style={{
                background: "linear-gradient(90deg, rgba(120,125,133,0.65), rgba(55,60,68,0.90))",
              }}
            >
              <label className="text-white text-base md:text-xl font-medium">
                Images
              </label>
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

            {/* FOOTER BUTTONS */}
            <DialogFooter className="mt-1 md:mt-8 flex flex-row justify-end gap-4">
              <SharedButton
                type="submit"
                size="lg"
                rounded="lg"
                tone="glass"
                disabled={createMutation.isPending}
                className="h-11 !px-6 !text-sm sm:!px-10 sm:!text-base md:min-w-[130px] md:!text-base"
              >
                {createMutation.isPending ? "Saving..." : "Save"}
              </SharedButton>

              <SharedButton
                type="button"
                onClick={handleCancel}
                size="lg"
                rounded="lg"
                tone="glass"
                className="h-11 !px-6 !text-sm sm:!px-10 sm:!text-base md:min-w-[130px] md:!text-base"
              >
                Cancel
              </SharedButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Create Confirmation Dialog */}
      <ActionModal
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        title="CREATE NEW ANNOUNCEMENT?"
        description="Are you sure you want to create this announcement? It will be visible to all users."
        confirmText="Create"
        cancelText="Go Back"
        onConfirm={handleCreateConfirm}
        onCancel={() => setShowCreateDialog(false)}
      />
    </>
  );
}
