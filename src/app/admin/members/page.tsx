"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ContentContainer from "@/components/layout/ContentContainer";
import HeaderContainer from "@/components/layout/HeaderContainer";
import HeroContainer from "@/components/layout/HeroContainer";
import PageContainer from "@/components/layout/PageContainer";
import SectionContainer from "@/components/layout/SectionContainer";
import CardContainer from "@/components/layout/CardContainer";
import GeneralModal from "@/components/members-page/general-modal";
import AdminHeaderActions, {
  HeaderMode,
} from "@/components/members-page/admin-header-actions";
import { getAdminActionFromMode } from "@/components/members-page/admin-helpers";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useGroupedMembersQuery } from "@/lib/api/queries/membersQueries";
import { useDeleteMemberMutation } from "@/lib/api/mutations/membersMutations";
import { Member } from "@/lib/types/entities/member";
import { FullScreenLoader } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";

export default function AdminMembersPage() {
  const router = useRouter();
  const [headerMode, setHeaderMode] = useState<HeaderMode>("default");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const { data: groupedMembers, isLoading, error } = useGroupedMembersQuery();
  const deleteMutation = useDeleteMemberMutation();

  console.log("=== Admin Members Page Debug ===");
  console.log("isLoading:", isLoading);
  console.log("error:", error);
  console.log("groupedMembers:", groupedMembers);
  console.log("groupedMembers length:", groupedMembers?.length);

  const handleAddClick = (categoryId: number) => {
    router.push(`/admin/members/add-member?categoryId=${categoryId}`);
  };

  const handleEditClick = () => {
    setHeaderMode("edit");
  };

  const handleDeleteClick = () => {
    setHeaderMode("delete");
  };

  const handleCancelAction = () => {
    setHeaderMode("default");
  };

  const handleCardEdit = (memberId: string) => {
    router.push(`/admin/members/edit-member/${memberId}`);
  };

  const handleCardDelete = (member: Member) => {
    setSelectedMember(member);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedMember?.id) {
      await deleteMutation.mutateAsync(selectedMember.id.toString());
      setDeleteModalOpen(false);
      setSelectedMember(null);
      setHeaderMode("default");
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute requireAdmin>
        <FullScreenLoader label="Loading members..." />
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute requireAdmin>
        <HeroContainer title={"MEMBERS"} />
        <PageContainer>
          <ContentContainer>
            <EmptyState
              title="Error loading members"
              description="Failed to load members. Please try again."
            />
          </ContentContainer>
        </PageContainer>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requireAdmin>
      <HeroContainer title={"MEMBERS"} />
      <PageContainer>
        <ContentContainer>
          {groupedMembers && groupedMembers.length > 0 ? (
            groupedMembers.map((group) => (
              <div key={group.categoryId}>
                <SectionContainer>
                  <HeaderContainer
                    title={group.category.toUpperCase()}
                    actions={
                      <AdminHeaderActions
                        mode={headerMode}
                        onAdd={() => handleAddClick(group.categoryId)}
                        onEdit={handleEditClick}
                        onDelete={handleDeleteClick}
                        onCancel={handleCancelAction}
                      />
                    }
                  />
                </SectionContainer>

                <SectionContainer card firstCardFullWidth>
                  {group.members.length > 0 ? (
                    group.members.map((member) => (
                      <CardContainer
                        key={member.id}
                        imageSrc={member.imageUrl}
                        imageAlt={member.name}
                        adminAction={getAdminActionFromMode(headerMode)}
                        onActionClick={() => {
                          if (headerMode === "edit") {
                            handleCardEdit(member.id.toString());
                          } else if (headerMode === "delete") {
                            handleCardDelete(member);
                          }
                        }}
                      >
                        <h3 className="font-bold text-lg">{member.name}</h3>
                        <p className="text-sm text-gray-600">
                          {member.position}
                        </p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </CardContainer>
                    ))
                  ) : (
                    <EmptyState
                      title="No members"
                      description="No members in this category yet."
                    />
                  )}
                </SectionContainer>
              </div>
            ))
          ) : (
            <EmptyState
              title="No categories"
              description="No member categories found."
            />
          )}
        </ContentContainer>
      </PageContainer>

      <GeneralModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        variant="delete"
        memberName={selectedMember?.name}
        onConfirm={handleConfirmDelete}
      />
    </ProtectedRoute>
  );
}
