"use client";

import ContentContainer from "@/components/layout/ContentContainer";
import Spacer from "@/components/layout/Spacer";
import InputContainer from "@/components/members-page/input-container";
import InputTextField from "@/components/members-page/input-textfield";
import InputImage from "@/components/members-page/input-image";
import InputChips from "@/components/members-page/input-chips";
import GeneralModal from "@/components/members-page/general-modal";
import { SharedButton } from "@/components/shared/SharedButton";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useMemberQuery } from "@/lib/api/queries/membersQueries";
import { useUpdateMemberMutation } from "@/lib/api/mutations/membersMutations";
import { FullScreenLoader } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";
import {
  editMemberSchema,
  type EditMemberFormData,
} from "@/lib/zod/member.schema";
import { useMemberForm } from "@/hooks/useMemberForm";

type ModalVariant = "edit" | "cancel-edit";

export default function EditMember() {
  const router = useRouter();
  const params = useParams();
  const memberId = params.id as string;

  const { data: member, isLoading, error } = useMemberQuery(memberId);
  const updateMutation = useUpdateMemberMutation();

  const [memberImage, setMemberImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState<ModalVariant>("edit");

  const { errors, validateForm } = useMemberForm({
    schema: editMemberSchema,
  });

  useEffect(() => {
    if (member) {
      setName(member.name);
      setPosition(member.position);
      setEmail(member.email);
      setImageUrl(member.imageUrl);
    }
  }, [member]);

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
      setModalVariant("edit");
      setModalOpen(true);
    }
  };

  const handleCancelClick = () => {
    setModalVariant("cancel-edit");
    setModalOpen(true);
  };

  const handleConfirmSave = async () => {
    try {
      await updateMutation.mutateAsync({
        id: memberId,
        data: {
          name,
          position,
          email,
          imageUrl,
        },
      });
      setModalOpen(false);
      router.push("/admin/members");
    } catch (error) {
      setModalOpen(false);
    }
  };

  const handleConfirmCancel = () => {
    router.push("/admin/members");
  };

  if (isLoading) {
    return (
      <ProtectedRoute requireAdmin>
        <FullScreenLoader label="Loading member..." />
      </ProtectedRoute>
    );
  }

  if (error || !member) {
    return (
      <ProtectedRoute requireAdmin>
        <div className="min-h-screen w-full py-8 px-6">
          <EmptyState
            title="Error loading member"
            description="Failed to load member data. Please try again."
          />
        </div>
      </ProtectedRoute>
    );
  }

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
                src="/images/members/edit-symbol.png"
                alt="Edit member icon"
                width={24}
                height={24}
                className="w-5 h-5 md:w-8 md:h-8 mr-2 md:mr-3 mb-1"
              />
              EDIT MEMBER
            </h1>
            <Spacer size={8} />
            <div>
              <InputContainer title="Image">
                <InputImage
                  existingImage={member.imageUrl}
                  onImageChange={handleImageChange}
                />
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
              <InputContainer title="Designation">
                <InputChips
                  initialChips={[]}
                  onChange={(chips) => console.log(chips)}
                />
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
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? "Saving..." : "Save"}
                </SharedButton>
                <SharedButton
                  variant="secondary"
                  size="lg"
                  onClick={handleCancelClick}
                  disabled={updateMutation.isPending}
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
            modalVariant === "edit" ? handleConfirmSave : handleConfirmCancel
          }
        />
      </div>
    </ProtectedRoute>
  );
}
