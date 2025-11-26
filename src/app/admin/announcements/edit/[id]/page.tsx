"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BiEdit } from "react-icons/bi";
import CancelFormDialog from "@/components/announcements/CancelFormDialog";
import EditFormDialog from "@/components/announcements/EditFormDialog";
import ImageUploadField from "@/components/announcements/ImageUploadField";

const mockAnnouncement = {
  id: "1",
  subject: "ANNOUNCEMENT TITLE",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  images: [] as string[],
};

export default function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Zod schema for validation
  const schema = z.object({
    subject: z
      .string()
      .min(3, "Subject is required")
      .max(100, "Subject too long"),
    body: z.string().min(10, "Body is required").max(2000, "Body too long"),
    images: z.array(z.instanceof(File)).max(5, "Max 5 images"),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: mockAnnouncement.subject,
      body: mockAnnouncement.body,
      images: [],
    },
  });

  const images = watch("images");

  const onSubmit = (data: FormData) => {
    setShowEditDialog(true);
  };

  const handleEditConfirm = async () => {
    setShowEditDialog(false);
    alert("Announcement updated successfully! (mock)");
    router.push("/admin/announcements");
    reset();
  };

  const handleEditDialogClose = () => {
    setShowEditDialog(false);
  };

  const handleCancelClick = () => {
    setShowCancelDialog(true);
  };

  const handleCancelConfirm = () => {
    setShowCancelDialog(false);
    router.push("/admin/announcements");
  };

  const handleCancelDialogClose = () => {
    setShowCancelDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#52575F] to-[#3D4249] flex items-center justify-center px-6 py-8 sm:p-6">
      <div className="w-full max-w-xs sm:max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center sm:justify-start">
          <BiEdit
            className="h-10 w-10 sm:h-15 sm:w-15 text-[#E7EAEF]"
            strokeWidth={0.1}
          />
          <h1
            className="text-3xl sm:text-5xl font-normal text-[#E7EAEF] uppercase tracking-wide"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Edit Announcement
          </h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 sm:space-y-6"
        >
          {/* Subject Field */}
          <div className="bg-gradient-to-r from-[#6C7178] to-[#373C44] rounded-2xl p-3 sm:p-6">
            <div className="px-4 sm:px-0 space-y-2 sm:space-y-3">
              <Label
                htmlFor="subject"
                className="text-[#E7EAEF] text-base sm:text-lg font-medium"
              >
                Subject
              </Label>
              <Input
                id="subject"
                type="text"
                placeholder="Add Subject..."
                {...register("subject")}
                className="bg-[#e7eaef] border border-[#373C44] text-gray-800 placeholder:text-gray-400 h-[38px] sm:h-[46px] text-base focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-4"
                aria-invalid={!!errors.subject}
              />
              {errors.subject && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>

          {/* body field */}
          <div className="bg-gradient-to-r from-[#6C7178] to-[#373C44] rounded-2xl p-3 sm:p-6">
            <div className="px-4 sm:px-0 space-y-2 sm:space-y-3">
              <Label
                htmlFor="body"
                className="text-[#E7EAEF] text-base sm:text-lg font-medium"
              >
                Body
              </Label>
              <Textarea
                id="body"
                placeholder="Add Text..."
                {...register("body")}
                rows={10}
                className="bg-[#e7eaef] border border-[#373C44] text-gray-800 placeholder:text-gray-400 resize-none text-base focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-4 min-h-[200px]"
                aria-invalid={!!errors.body}
              />
              {errors.body && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.body.message}
                </p>
              )}
            </div>
          </div>

          {/* images field */}
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
                <p className="text-red-500 text-xs mt-1">
                  {errors.images.message}
                </p>
              )}
            </div>
          </div>

          {/* action buttons */}
          <div className="flex flex-row justify-end gap-4 sm:gap-4 pt-3 sm:pt-4">
            <Button
              type="submit"
              className="w-24 sm:flex-none sm:w-auto bg-gradient-to-r from-[#6C7178] to-[#49515A] hover:from-[#373c44] hover:to-[#373c44] text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-sm border-none h-auto font-normal transition-all"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Save
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

        {/* cancel dialog */}
        <CancelFormDialog
          isOpen={showCancelDialog}
          mode="edit"
          onConfirm={handleCancelConfirm}
          onCancel={handleCancelDialogClose}
        />

        {/* edit dialog */}
        <EditFormDialog
          isOpen={showEditDialog}
          onConfirm={handleEditConfirm}
          onCancel={handleEditDialogClose}
        />
      </div>
    </div>
  );
}
