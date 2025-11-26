"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUploadField from "./ImageUploadField";
import CancelFormDialog from "./CancelFormDialog";
import { Loader2 } from "lucide-react";

const announcementFormSchema = z.object({
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject must be less than 200 characters"),
  body: z
    .string()
    .min(1, "Body is required")
    .max(5000, "Body must be less than 5000 characters"),
  category: z.enum(["HEAD_COMMISSIONER", "OTHER"], {
    message: "Please select a category",
  }),
  images: z
    .array(z.instanceof(File))
    .max(5, "Maximum 5 images allowed")
    .optional(),
});

type AnnouncementFormValues = z.infer<typeof announcementFormSchema>;

interface AnnouncementFormProps {
  mode: "create" | "edit";
  initialData?: {
    id: string;
    subject: string;
    body: string;
    category: "HEAD_COMMISSIONER" | "OTHER";
    images?: string[];
  };
  onSubmit: (data: AnnouncementFormValues) => Promise<void>;
  onCancel?: () => void;
}

export default function AnnouncementForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
}: AnnouncementFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const form = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementFormSchema),
    defaultValues: {
      subject: initialData?.subject || "",
      body: initialData?.body || "",
      category: initialData?.category || "OTHER",
      images: [],
    },
  });

  const handleSubmit = async (values: AnnouncementFormValues) => {
    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    setShowCancelDialog(true);
  };

  const handleConfirmCancel = () => {
    setShowCancelDialog(false);
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  return (
    <>
      <div className="w-full max-w-3xl mx-auto p-6">
        {/* form header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {mode === "create" ? (
              <>
                <span className="text-green-600">+</span>
                CREATE NEW ANNOUNCEMENT
              </>
            ) : (
              <>
                <span className="text-blue-600">✏️</span>
                EDIT ANNOUNCEMENT
              </>
            )}
          </h1>
        </div>

        {/* the form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* category field */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Category
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="HEAD_COMMISSIONER">
                        From the Head Commissioner
                      </SelectItem>
                      <SelectItem value="OTHER">Other Announcements</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* subject field */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Subject
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter announcement subject"
                      {...field}
                      disabled={isSubmitting}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* body field */}
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Body
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter announcement body"
                      {...field}
                      disabled={isSubmitting}
                      className="min-h-[200px] bg-white resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* images field */}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Images
                  </FormLabel>
                  <FormControl>
                    <ImageUploadField
                      value={field.value || []}
                      onChange={field.onChange}
                      maxFiles={5}
                      maxSizeMB={5}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* action buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelClick}
                disabled={isSubmitting}
                className="min-w-[100px] bg-[#6a6f7a] hover:bg-[#5a5f6a] text-white border-none"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="min-w-[100px] bg-[#4a4f5a] hover:bg-[#3a3f4a] text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* the cancel confirmation dialog */}
      <CancelFormDialog
        isOpen={showCancelDialog}
        mode={mode}
        onConfirm={handleConfirmCancel}
        onCancel={() => setShowCancelDialog(false)}
      />
    </>
  );
}
