"use client";

import ContentContainer from "@/components/layout/ContentContainer";
import Spacer from "@/components/layout/Spacer";
import InputContainer from "@/components/members-page/input-container";
import InputTextField from "@/components/members-page/input-textfield";
import GeneralModal from "@/components/members-page/general-modal";
import { SharedButton } from "@/components/shared/SharedButton";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { categorySchema } from "@/lib/zod/category.schema";
import { useCreateCategoryMutation } from "@/lib/api/mutations/categoriesMutations";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { z } from "zod";

type ModalVariant = "create-category" | "cancel-create-category";

export default function AddCategory() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVariant, setModalVariant] =
    useState<ModalVariant>("create-category");

  const createMutation = useCreateCategoryMutation();

  const validateForm = (): boolean => {
    try {
      categorySchema.parse({ name });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSaveClick = () => {
    const isValid = validateForm();

    if (isValid) {
      setModalVariant("create-category");
      setModalOpen(true);
    }
  };

  const handleCancelClick = () => {
    setModalVariant("cancel-create-category");
    setModalOpen(true);
  };

  const handleConfirmSave = async () => {
    try {
      await createMutation.mutateAsync({
        name,
      });

      setModalOpen(false);
      router.push("/admin/members");
    } catch {
      setModalOpen(false);
    }
  };

  const handleConfirmCancel = () => {
    router.push("/admin/members");
  };

  return (
    <ProtectedRoute requireAdmin>
      <div
        className="min-h-screen w-full py-8 px-6"
        style={{
          background:
            "linear-gradient(18deg, #32383e 0%, #485159 45%, #6b7680 100%)",
        }}
      >
        <ContentContainer>
          <div className="max-w-4xl mx-auto flex flex-col">
            <h1
              className="text-2xl md:text-5xl font-bebas-neue uppercase flex items-center mb-4"
              style={{ color: "#E7EAEF" }}
            >
              <Image
                src="/images/members/add-symbol.png"
                alt="Add category icon"
                width={24}
                height={24}
                className="w-5 h-5 md:w-8 md:h-8 mr-2 md:mr-3 mb-1"
              />
              ADD CATEGORY
            </h1>
            <Spacer size={8} />
            <div>
              <InputContainer title="Category Name">
                <InputTextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Category Name..."
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </InputContainer>
              <Spacer size={8} />
              <div className="flex justify-end gap-4">
                <SharedButton
                  variant="primary"
                  tone="mid"
                  size="lg"
                  onClick={handleSaveClick}
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? "Saving..." : "Save"}
                </SharedButton>
                <SharedButton
                  variant="secondary"
                  size="lg"
                  onClick={handleCancelClick}
                  disabled={createMutation.isPending}
                >
                  Cancel
                </SharedButton>
              </div>
            </div>
          </div>
        </ContentContainer>

        <GeneralModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          variant={modalVariant}
          onConfirm={
            modalVariant === "create-category"
              ? handleConfirmSave
              : handleConfirmCancel
          }
        />
      </div>
    </ProtectedRoute>
  );
}
