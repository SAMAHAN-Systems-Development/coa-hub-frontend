"use client";

import { useState, useMemo } from "react";
import { IoChevronDownSharp, IoChevronUpSharp, IoAdd } from "react-icons/io5";

import HeroContainer from "@/components/layout/HeroContainer";
import PageContainer from "@/components/layout/PageContainer";
import ContentContainer from "@/components/layout/ContentContainer";
import SectionContainer from "@/components/layout/SectionContainer";
import HeaderContainer from "@/components/layout/HeaderContainer";

import AnnouncementCard from "@/components/announcements/AnnouncementCard";
import CreateAnnouncementModal from "@/components/announcements/CreateAnnouncementModal";
import EditAnnouncementModal from "@/components/announcements/EditAnnouncementModal";
import DeleteAnnouncementDialog from "@/components/announcements/DeleteAnnouncementDialog";

import { FullScreenLoader } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";

import { useAnnouncementsQuery } from "@/lib/api/queries/use-announcements";
import { useDeleteAnnouncementMutation } from "@/lib/api/mutations/announcement.mutation";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  toAnnouncementDisplay,
  groupAnnouncementsByRole,
  AnnouncementDisplay,
} from "@/lib/types/entities/announcement";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

interface RoleSectionProps {
  role: string;
  announcements: AnnouncementDisplay[];
  isExpanded: boolean;
  onToggle: () => void;
  isAdmin?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

function RoleSection({
  role,
  announcements,
  isExpanded,
  onToggle,
  isAdmin,
  onEdit,
  onDelete,
}: RoleSectionProps) {
  return (
    <SectionContainer className="mb-6">
      <HeaderContainer
        title={
          <button
            onClick={onToggle}
            className="flex items-center gap-3 sm:gap-4 lg:gap-5 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center justify-center">
              {isExpanded ? (
                <IoChevronUpSharp className="h-5 w-5 sm:h-8 sm:w-8 lg:w-9 lg:h-9" />
              ) : (
                <IoChevronDownSharp className="h-5 w-5 sm:h-8 sm:w-8 lg:w-9 lg:h-9" />
              )}
            </div>
            <span>From the {role}</span>
          </button>
        }
      />

      {isExpanded && (
        <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                variant={isAdmin ? "admin" : "public"}
                isExpanded={true}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <EmptyState
              title={`No announcements from the ${role} yet`}
              description="Check back later for updates."
              size="sm"
            />
          )}
        </div>
      )}
    </SectionContainer>
  );
}

export default function AnnouncementsPage() {
  const { data: announcements, isLoading, error, refetch } = useAnnouncementsQuery();
  const { isAdmin } = useAuth();
  const deleteMutation = useDeleteAnnouncementMutation();

  const [expandedRoles, setExpandedRoles] = useState<Set<string>>(new Set());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    announcementId: number | null;
  }>({ isOpen: false, announcementId: null });
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    announcementId: "",
  });

  // Transform and group announcements by role
  const displayAnnouncements = useMemo(() => {
    if (!announcements) return [];
    return announcements.map(toAnnouncementDisplay);
  }, [announcements]);

  const groupedAnnouncements = useMemo(() => {
    return groupAnnouncementsByRole(displayAnnouncements);
  }, [displayAnnouncements]);

  const roles = useMemo(() => {
    return Array.from(groupedAnnouncements.keys());
  }, [groupedAnnouncements]);

  const toggleRole = (role: string) => {
    setExpandedRoles((prev) => {
      const next = new Set(prev);
      if (next.has(role)) {
        next.delete(role);
      } else {
        next.add(role);
      }
      return next;
    });
  };

  const handleEdit = (id: string) => {
    setEditModal({ isOpen: true, announcementId: parseInt(id, 10) });
  };

  const handleDeleteClick = (id: string) => {
    setDeleteDialog({ isOpen: true, announcementId: id });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteMutation.mutateAsync(
        parseInt(deleteDialog.announcementId, 10)
      );
      setDeleteDialog({ isOpen: false, announcementId: "" });
      refetch();
    } catch (error) {
      console.error("Failed to delete announcement:", error);
      alert("Failed to delete announcement. Please try again.");
      setDeleteDialog({ isOpen: false, announcementId: "" });
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialog({ isOpen: false, announcementId: "" });
  };

  if (isLoading) {
    return <FullScreenLoader label="Loading announcements..." />;
  }

  if (error) {
    return (
      <ProtectedRoute>
        <HeroContainer title="ANNOUNCEMENTS" />
        <PageContainer>
          <ContentContainer>
            <EmptyState
              title="Error loading announcements"
              description="Failed to load announcements. Please try again."
            />
          </ContentContainer>
        </PageContainer>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <HeroContainer title="ANNOUNCEMENTS" />
      <PageContainer>
        <ContentContainer>
          {/* Admin add button */}
          {isAdmin && (
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <IoAdd className="h-5 w-5" />
                <span>Add Announcement</span>
              </button>
            </div>
          )}

          {/* Dynamic role sections */}
          {roles.length > 0 ? (
            roles.map((role) => (
              <RoleSection
                key={role}
                role={role}
                announcements={groupedAnnouncements.get(role) || []}
                isExpanded={expandedRoles.has(role)}
                onToggle={() => toggleRole(role)}
                isAdmin={isAdmin}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))
          ) : (
            <EmptyState
              title="No Announcements Yet"
              description="Check back later for updates and announcements."
            />
          )}
        </ContentContainer>
      </PageContainer>

      {/* Create Announcement Modal */}
      <CreateAnnouncementModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => refetch()}
      />

      {/* Edit Announcement Modal */}
      <EditAnnouncementModal
        isOpen={editModal.isOpen}
        announcementId={editModal.announcementId}
        onClose={() => setEditModal({ isOpen: false, announcementId: null })}
        onSuccess={() => refetch()}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteAnnouncementDialog
        isOpen={deleteDialog.isOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </ProtectedRoute>
  );
}
