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
import {
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/lib/api/mutations/categoriesMutations";
import { Member } from "@/lib/types/entities/member";
import { FullScreenLoader } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";
import { SharedButton } from "@/components/shared/SharedButton";
import { Trash2, Pencil, ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "sonner";

export default function AdminMembersPage() {
  const router = useRouter();
  const [headerMode, setHeaderMode] = useState<HeaderMode>("default");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [categoryMode, setCategoryMode] = useState<
    "default" | "edit" | "delete"
  >("default");
  const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [reorderedCategories, setReorderedCategories] = useState<
    typeof groupedMembers | null
  >(null);
  const [hasOrderChanges, setHasOrderChanges] = useState(false);

  const { data: groupedMembers, isLoading, error } = useGroupedMembersQuery();
  const deleteMemberMutation = useDeleteMemberMutation();
  const deleteCategoryMutation = useDeleteCategoryMutation();
  const updateCategoryMutation = useUpdateCategoryMutation();

  // Use reordered categories if in edit mode with changes, otherwise use sorted from backend
  const displayedCategories =
    hasOrderChanges && reorderedCategories
      ? reorderedCategories
      : groupedMembers
        ? [...groupedMembers].sort((a, b) => {
            const priorityA = a.priorityNumber ?? 100;
            const priorityB = b.priorityNumber ?? 100;
            return priorityA - priorityB;
          })
        : [];

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
      await deleteMemberMutation.mutateAsync(selectedMember.id.toString());
      setDeleteModalOpen(false);
      setSelectedMember(null);
      setHeaderMode("default");
    }
  };

  // Category CRUD handlers
  const handleAddCategory = () => {
    router.push("/admin/members/add-category");
  };

  const handleEditCategory = () => {
    setCategoryMode("edit");
    // Initialize reordered categories with current sorted order
    if (groupedMembers) {
      const sorted = [...groupedMembers].sort((a, b) => {
        const priorityA = a.priorityNumber ?? 100;
        const priorityB = b.priorityNumber ?? 100;
        return priorityA - priorityB;
      });
      setReorderedCategories(sorted);
    }
  };

  const handleDeleteCategory = () => {
    setCategoryMode("delete");
  };

  const handleCancelCategoryAction = () => {
    setCategoryMode("default");
    setHasOrderChanges(false);
    setReorderedCategories(null);
  };

  const handleMoveCategoryUp = (index: number) => {
    if (!reorderedCategories || index === 0) return;

    const newOrder = [...reorderedCategories];
    [newOrder[index - 1], newOrder[index]] = [
      newOrder[index],
      newOrder[index - 1],
    ];

    setReorderedCategories(newOrder);
    setHasOrderChanges(true);
  };

  const handleMoveCategoryDown = (index: number) => {
    if (!reorderedCategories || index === reorderedCategories.length - 1)
      return;

    const newOrder = [...reorderedCategories];
    [newOrder[index], newOrder[index + 1]] = [
      newOrder[index + 1],
      newOrder[index],
    ];

    setReorderedCategories(newOrder);
    setHasOrderChanges(true);
  };

  const handleSaveCategoryOrder = async () => {
    if (!reorderedCategories) return;

    try {
      // Update each category with its new priority number (index + 1)
      const updatePromises = reorderedCategories.map((category, index) => {
        return updateCategoryMutation.mutateAsync({
          id: category.categoryId.toString(),
          data: { priority_number: index + 1 },
        });
      });

      await Promise.all(updatePromises);

      toast.success("Category order updated successfully");
      setHasOrderChanges(false);
      setCategoryMode("default");
      setReorderedCategories(null);
    } catch {
      toast.error("Failed to update category order");
    }
  };

  const handleCategoryEdit = (categoryId: number) => {
    router.push(`/admin/members/edit-category/${categoryId}`);
  };

  const handleCategoryDeleteClick = (
    categoryId: number,
    memberCount: number
  ) => {
    if (memberCount > 0) {
      toast.error("Cannot delete category with existing members");
      return;
    }
    setSelectedCategoryId(categoryId);
    setDeleteCategoryModalOpen(true);
  };

  const handleConfirmCategoryDelete = async () => {
    if (selectedCategoryId) {
      await deleteCategoryMutation.mutateAsync(selectedCategoryId.toString());
      setDeleteCategoryModalOpen(false);
      setSelectedCategoryId(null);
      setCategoryMode("default");
    }
  };

  // Check if any member action is active
  const isMemberActionActive = headerMode !== "default";

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
          {/* Category CRUD Buttons */}
          <section className="w-full rounded-xl p-6 -mb-8 md:-mb-6">
            <div className="max-w-7xl mx-auto">
              {hasOrderChanges ? (
                <div className="flex flex-wrap justify-center md:justify-start gap-3 items-center">
                  <span className="text-sm text-gray-600">
                    Category order changed
                  </span>
                  <SharedButton
                    variant="primary"
                    tone="dark"
                    size="md"
                    onClick={handleSaveCategoryOrder}
                  >
                    Save Order
                  </SharedButton>
                  <SharedButton
                    variant="primary"
                    tone="dark"
                    size="md"
                    onClick={handleCancelCategoryAction}
                  >
                    Cancel
                  </SharedButton>
                </div>
              ) : (
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <SharedButton
                    variant="primary"
                    tone="dark"
                    size="md"
                    onClick={handleAddCategory}
                    disabled={isMemberActionActive}
                  >
                    Add Category
                  </SharedButton>
                  <SharedButton
                    variant="primary"
                    tone="dark"
                    size="md"
                    onClick={
                      categoryMode === "edit"
                        ? handleCancelCategoryAction
                        : handleEditCategory
                    }
                    disabled={isMemberActionActive}
                  >
                    {categoryMode === "edit" ? "Cancel Edit" : "Edit Category"}
                  </SharedButton>
                  <SharedButton
                    variant="primary"
                    tone="dark"
                    size="md"
                    onClick={
                      categoryMode === "delete"
                        ? handleCancelCategoryAction
                        : handleDeleteCategory
                    }
                    disabled={isMemberActionActive}
                  >
                    {categoryMode === "delete"
                      ? "Cancel Delete"
                      : "Delete Category"}
                  </SharedButton>
                </div>
              )}
            </div>
          </section>

          {displayedCategories && displayedCategories.length > 0 ? (
            displayedCategories.map((group, index) => (
              <div key={group.categoryId}>
                <SectionContainer>
                  <HeaderContainer
                    title={group.category.toUpperCase()}
                    actions={
                      <div className="flex items-center gap-3">
                        {/* Category actions */}
                        {categoryMode === "edit" && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleMoveCategoryUp(index)}
                              disabled={index === 0}
                              className="hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
                              aria-label="Move category up"
                            >
                              <ChevronUp className="w-5 h-5 text-white" />
                            </button>
                            <button
                              onClick={() => handleMoveCategoryDown(index)}
                              disabled={
                                index === displayedCategories.length - 1
                              }
                              className="hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
                              aria-label="Move category down"
                            >
                              <ChevronDown className="w-5 h-5 text-white" />
                            </button>
                            <button
                              onClick={() =>
                                handleCategoryEdit(group.categoryId)
                              }
                              className="hover:opacity-80 transition-opacity"
                              aria-label="Edit category"
                            >
                              <Pencil className="w-5 h-5 text-white" />
                            </button>
                          </div>
                        )}
                        {categoryMode === "delete" && (
                          <button
                            onClick={() =>
                              handleCategoryDeleteClick(
                                group.categoryId,
                                group.members.length
                              )
                            }
                            className="hover:opacity-80 transition-opacity"
                            aria-label="Delete category"
                            disabled={group.members.length > 0}
                          >
                            <Trash2
                              className={`w-5 h-5 ${group.members.length > 0 ? "text-gray-400" : "text-white"}`}
                            />
                          </button>
                        )}
                        {/* Member actions */}
                        {categoryMode === "default" && (
                          <AdminHeaderActions
                            mode={headerMode}
                            onAdd={() => handleAddClick(group.categoryId)}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                            onCancel={handleCancelAction}
                          />
                        )}
                      </div>
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
                      className="mx-auto"
                    />
                  )}
                </SectionContainer>
              </div>
            ))
          ) : (
            <EmptyState
              title="No categories"
              description="No member categories found."
              className="mx-auto"
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

      {/* Delete Category Modal */}
      <GeneralModal
        isOpen={deleteCategoryModalOpen}
        onClose={() => setDeleteCategoryModalOpen(false)}
        variant="delete-category"
        memberName={
          groupedMembers?.find((g) => g.categoryId === selectedCategoryId)
            ?.category || "Category"
        }
        onConfirm={handleConfirmCategoryDelete}
      />
    </ProtectedRoute>
  );
}
