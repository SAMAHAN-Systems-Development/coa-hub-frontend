"use client";

import ContentContainer from "@/components/layout/ContentContainer";
import Spacer from "@/components/layout/Spacer";
import InputContainer from "@/components/members-page/input-container";
import InputTextField from "@/components/members-page/input-textfield";
import InputImage from "@/components/members-page/input-image";
import GeneralModal from "@/components/members-page/general-modal";
import { SharedButton } from "@/components/shared/SharedButton";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { memberSchema, type MemberFormData } from "@/lib/zod/member.schema";
import { useMemberForm } from "@/hooks/useMemberForm";
import { useCreateMemberMutation } from "@/lib/api/mutations/membersMutations";
import { toast } from "sonner";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

type ModalVariant = "create" | "cancel-create";

export default function AddMembers() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [memberImage, setMemberImage] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [categoryId, setCategoryId] = useState<number>(1);

  useEffect(() => {
    const categoryIdParam = searchParams.get("categoryId");
    if (categoryIdParam) {
      setCategoryId(parseInt(categoryIdParam, 10));
    }
  }, [searchParams]);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState<ModalVariant>("create");

  // Custom hooks
  const { errors, validateForm } = useMemberForm({
    schema: memberSchema,
  });
  const createMutation = useCreateMemberMutation();

  const handleImageChange = (file: File | null) => {
    setMemberImage(file);
  };

  const handleSaveClick = () => {
    const isValid = validateForm({
      name,
      position,
      email,
      image: memberImage || undefined,
    });

    if (isValid) {
      setModalVariant("create");
      setModalOpen(true);
    }
  };

  const handleCancelClick = () => {
    setModalVariant("cancel-create");
    setModalOpen(true);
  };

  const handleConfirmSave = async () => {
    try {
      await createMutation.mutateAsync({
        name,
        position,
        email,
        categoryId,
        imageUrl: undefined,
      });

      setModalOpen(false);
      router.push("/admin/members");
    } catch (error) {
      console.error("Error creating member:", error);
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
                alt="Add member icon"
                width={24}
                height={24}
                className="w-5 h-5 md:w-8 md:h-8 mr-2 md:mr-3 mb-1"
              />
              ADD MEMBER
            </h1>
            <Spacer size={8} />
            <div>
              <InputContainer title="Image">
                <InputImage onImageChange={handleImageChange} />
              </InputContainer>
              <Spacer />
              <InputContainer title="Name">
                <InputTextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Full Name..."
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </InputContainer>
              <Spacer />
              <InputContainer title="Position">
                <InputTextField
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Enter Org. Position..."
                />
                {errors.position && (
                  <p className="text-red-400 text-sm mt-1">{errors.position}</p>
                )}
              </InputContainer>
              <Spacer />
              <InputContainer title="Email">
                <InputTextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email..."
                  type="email"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
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
            modalVariant === "create" ? handleConfirmSave : handleConfirmCancel
          }
        />
      </div>
    </ProtectedRoute>
  );
}
