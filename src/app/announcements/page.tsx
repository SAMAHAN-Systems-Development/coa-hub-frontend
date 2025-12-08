"use client";

import { useState, useMemo } from "react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import AnnouncementCard from "@/components/announcements/AnnouncementCard";
import CreateAnnouncementModal from "@/components/announcements/CreateAnnouncementModal";
import EditAnnouncementModal from "@/components/announcements/EditAnnouncementModal";
import DeleteAnnouncementDialog from "@/components/announcements/DeleteAnnouncementDialog";
import { IoChevronDownSharp, IoChevronUpSharp, IoAdd } from "react-icons/io5";
import { useAnnouncementsQuery } from "@/lib/api/queries/use-announcements";
import { useDeleteAnnouncementMutation } from "@/lib/api/mutations/announcement.mutation";
import { useAuth } from "@/lib/hooks/useAuth";
import {
  toAnnouncementDisplay,
  groupAnnouncementsByRole,
  AnnouncementDisplay,
} from "@/lib/types/entities/announcement";

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
    <section className="mb-6">
      <div className="w-full flex items-center justify-between sm:border-b-2 sm:border-gray-900 sm:pb-4 lg:pb-5 border-b-0 bg-gradient-to-r from-[#6C7178] to-[#49515A] sm:bg-none rounded-lg sm:rounded-none p-4 sm:p-0">
        <button
          onClick={onToggle}
          className="flex items-center gap-3 sm:gap-4 lg:gap-5 hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center justify-center">
            {isExpanded ? (
              <IoChevronUpSharp className="h-5 w-5 sm:h-8 sm:w-8 lg:w-9 lg:h-9 text-white sm:text-gray-900" />
            ) : (
              <IoChevronDownSharp className="h-5 w-5 sm:h-8 sm:w-8 lg:w-9 lg:h-9 text-white sm:text-gray-900" />
            )}
          </div>
          {/* Mobile layout */}
          <div className="flex flex-col justify-center sm:hidden text-left">
            <div
              className="text-xl uppercase tracking-wider leading-none"
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                color: "#E7EAEF",
              }}
            >
              From the
            </div>
            <h2
              className="text-3xl font-normal uppercase tracking-wide leading-none mt-1"
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                color: "#E7EAEF",
              }}
            >
              {role}
            </h2>
          </div>
          {/* Desktop layout */}
          <h2 className="hidden sm:block text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 uppercase tracking-wide">
            From the {role}
          </h2>
        </button>
      </div>

      {/* expandable content */}
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
            <div className="p-8 bg-gray-50 rounded-lg text-center border border-gray-200">
              <p className="text-gray-500">
                No announcements from the {role} yet.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default function AnnoncementsPage() {
  const { data: announcements, isLoading, refetch } = useAnnouncementsQuery();
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
      await deleteMutation.mutateAsync(parseInt(deleteDialog.announcementId, 10));
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

  return (
    <LayoutWrapper>
      {/* hero - full screen */}
      <section className="relative h-[50vh] sm:h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#6C7178] to-[#373C44] rounded-b-3xl sm:rounded-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-lg text-[#E7EAEF] uppercase tracking-wide"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Announcements
          </h1>
        </div>
      </section>

      {/* main content */}
      <div className="min-h-screen bg-white py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {roles.map((role) => (
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
          ))}

          {/* loading state */}
          {isLoading && (
            <div className="text-center py-16 sm:py-20">
              <p className="text-gray-600">Loading announcements...</p>
            </div>
          )}

          {/* empty state - show only if no announcements */}
          {!isLoading && displayAnnouncements.length === 0 && (
            <div className="text-center py-16 sm:py-20 bg-gray-50 rounded-lg border border-gray-200">
              <div className="max-w-md mx-auto px-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  No Announcements Yet
                </h3>
                <p className="text-base sm:text-lg text-gray-600">
                  Check back later for updates and announcements.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

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
    </LayoutWrapper>
  );
}
