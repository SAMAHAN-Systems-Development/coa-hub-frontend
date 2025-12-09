"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CopyPlus, Pencil, Trash2, Plus } from "lucide-react";

import { SubmissionBinFolderSchema } from "@/lib/zod/submission-bin-folder";
import type { SubmissionBinFolder as SubmissionBinFolderType } from "@/lib/types/entities/submission-bin-folder";

import HeroContainer from "@/components/layout/HeroContainer";
import PageContainer from "@/components/layout/PageContainer";
import ContentContainer from "@/components/layout/ContentContainer";

import { SharedButton } from "@/components/shared/SharedButton";
import { FullScreenLoader } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";
import { toastError, toastSuccess } from "@/components/shared/toast";

import ActionModal from "@/components/features/action_modal";
import CreateNewSubmissionBinFolderModal from "@/components/features/submission_bin_folder_page/create_new_submission_bin_folder";
import EditSubmissionBinFolderModal from "@/components/features/submission_bin_folder_page/edit_submission_bin_folder";

import { useSubmissionBinFoldersQuery } from "@/lib/api/queries/use-submission-bin-folders";
import { useSubmissionBinQuery } from "@/lib/api/queries/use-submission-bins";
import {
  useCreateSubmissionBinFolderMutation,
  useUpdateSubmissionBinFolderMutation,
  useDeleteSubmissionBinFolderMutation,
} from "@/lib/api/mutations/submission-bin-folders.mutation";
import { useAuth } from "@/lib/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function SubmissionBinFolder() {
  const { isAdmin } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedSubmissionBinFolder, setSelectedSubmissionBinFolder] =
    useState<SubmissionBinFolderType | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const params = useParams();
  const binId = Number(params.id);

  // Fetch the submission bin data from API
  const {
    data: bin,
    isLoading: binLoading,
    error: binError,
  } = useSubmissionBinQuery(binId);

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const {
    data: submission_bin_folder,
    isLoading,
    error,
  } = useSubmissionBinFoldersQuery();
  const createSubmissionBinFolder = useCreateSubmissionBinFolderMutation();
  const updateSubmissionBinFolder = useUpdateSubmissionBinFolderMutation(
    selectedSubmissionBinFolder?.id ?? 0
  );
  const deleteSubmissionBinFolder = useDeleteSubmissionBinFolderMutation(
    selectedSubmissionBinFolder?.id ?? 0
  );

  useEffect(() => {
    if (error) {
      toastError({
        title: "Failed to load submission bin folders",
        description: "Please check your connection and try again.",
      });
    }
  }, [error]);

  // Loading state
  if (binLoading || isLoading) {
    return <FullScreenLoader label="Loading submission bin..." />;
  }

  // Error or not found state
  if (binError || !bin) {
    return (
      <ProtectedRoute>
        <HeroContainer title="SUBMISSION BIN" />
        <PageContainer>
          <ContentContainer>
            <EmptyState
              title="Submission bin not found"
              description="The requested submission bin could not be found."
            />
          </ContentContainer>
        </PageContainer>
      </ProtectedRoute>
    );
  }

  const handleAddSubmissionBinFolder = async (data: {
    binId: number;
    folderName: string;
    gdriveLink: string;
  }) => {
    try {
      // Validate incoming data with Zod (omit id)
      const createSchema = SubmissionBinFolderSchema.omit({ id: true });
      const parsed = createSchema.safeParse(data);
      if (!parsed.success) {
        toastError({
          title: "Invalid input",
          description:
            "Only Google Drive Folder link is allowed. Please check your input and try again.",
        });
        return;
      }

      await createSubmissionBinFolder.mutateAsync(parsed.data);
      toastSuccess({
        title: "Submission bin folder created",
        description: "Your new submission bin folder has been saved.",
      });
      setShowDialog(false);
    } catch (err) {
      console.error("Failed to create submission bin folder:", err);
      toastError({
        title: "Failed to create submission bin folder",
        description: "Please try again.",
      });
    }
  };

  const handleUpdateSubmissionBinFolder = async (data: {
    binId: number;
    folderName: string;
    gdriveLink: string;
  }) => {
    if (!selectedSubmissionBinFolder) return;

    try {
      await updateSubmissionBinFolder.mutateAsync({
        id: selectedSubmissionBinFolder.id,
        dto: {
          binId: data.binId,
          folderName: data.folderName,
          gdriveLink: data.gdriveLink,
        },
      });
      toastSuccess({
        title: "Submission bin folder updated",
        description: "Changes have been saved.",
      });
      setEditModalOpen(false);
    } catch (err) {
      console.error("Failed to update submission bin folder:", err);
      toastError({
        title: "Failed to update submission bin folder",
        description: "Please try again.",
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedSubmissionBinFolder) return;

    try {
      await deleteSubmissionBinFolder.mutateAsync();
      toastSuccess({
        title: "Submission bin folder deleted",
        description: "The submission bin folder has been removed.",
      });
      setDeleteModalOpen(false);
      setSelectedSubmissionBinFolder(null);
    } catch (err) {
      console.error("Failed to delete submission bin folder:", err);
      toastError({
        title: "Failed to delete submission bin folder",
        description: "Please try again.",
      });
    }
  };

  // Filter folders by binId
  const filteredFolders =
    submission_bin_folder?.filter((folder) => folder.binId === binId) || [];
  const isSingleColumn = filteredFolders.length <= 5;

  const rawFileFormat = bin?.fileFormat || "";
  const rawFileNameExample = bin?.fileName || "";

  // Split e.g. "Google Docs (.docx)" → "Google Docs" + " (.docx)"
  let formatMain = rawFileFormat;
  let formatSuffix = "";

  if (rawFileFormat.includes("(")) {
    const index = rawFileFormat.indexOf("(");
    formatMain = rawFileFormat.substring(0, index).trim();
    formatSuffix = " " + rawFileFormat.substring(index);
  }

  return (
    <ProtectedRoute>
      <HeroContainer title="SUBMISSION BIN" subheading={bin.name} />
      <PageContainer>
        <ContentContainer>
          {/* Designate Members */}
          {isAdmin && (
            <div className="bg-gradient-to-r from-[#6C7178] to-[#373C44] rounded-xl md:rounded-2xl p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] flex flex-row items-center gap-5 justify-between">
              <label className="text-4xl md:text-6xl text-white font-medium font-bebas-neue uppercase">
                Designate members to this bin
              </label>
              <CopyPlus className="text-white w-6 h-6 md:w-8 md:h-8" />
            </div>
          )}

          {/* Step-by-step Instructions */}
          <div className="bg-gradient-to-r from-[#6C7178] to-[#373C44] rounded-xl md:rounded-2xl p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] flex flex-col sm:flex-col md:flex-row gap-4 md:gap-0 items-center justify-center">
            <label className="text-4xl md:text-6xl text-white text-center font-medium font-bebas-neue uppercase">
              Step-by-Step Process: Online Submission
            </label>
          </div>

          <div className="bg-gradient-to-b from-[#6C7178] to-[#373C44] text-white px-15 md:px-20 py-15 rounded-xl">
            <ol className="list-decimal list-outside space-y-4 text-gray-200 text-justify font-montserrat leading-relaxed text-sm md:text-lg">
              <li>
                {
                  "Find the button assigned to your cluster, then click to open your designated Google Drive submission folder."
                }
              </li>
              <li>
                {"Upload the raw file of the reports in the "}
                <span className="font-bold">{'"Raw File"'}</span>
                {" folder in Google Docs format (.docx)."}
              </li>
              <li>
                {"During "}
                <span className="font-bold">{"CoA"}</span>
                {"'s Revision Period, your respective "}
                <span className="font-bold">{"CoA"}</span>
                {
                  " auditors will make comments on your submitted Google Docs for corrections."
                }
              </li>
              <li>
                {
                  "After adequately complying with the commission's requirements, notify your "
                }
                <span className="font-bold">{"CoA"}</span>
                {" auditors through FB Messenger ASAP."}
              </li>
              <li>
                {"After your respective "}
                <span className="font-bold">{"CoA"}</span>
                {
                  " auditors check and sign your reports, they will then be forwarded to the Head Commissioner for final checking and signing."
                }
              </li>
              <li>
                {
                  "After the Head Commissioner signs the reports, they will then be uploaded to the "
                }
                <span className="font-bold">{'"Signed by CoA"'}</span>
                {
                  " folder in .pdf format, which will then be forwarded to the SAMAHAN Treasurer."
                }
              </li>
            </ol>
          </div>

          {/* Raw File Section */}
          <div className="font-montserrat bg-gradient-to-r from-[#6C7178] to-[#373C44] py-8 rounded-xl text-white text-sm md:text-lg text-center space-y-3 shadow-[0_16px_32px_-8px_rgba(12,12,13,0.40)]">
            <p>
              Raw File Format:{" "}
              <span className="font-semibold">{formatMain}</span>
              {formatSuffix && <span>{formatSuffix}</span>}
            </p>
            <p>
              Raw File Name: <span className="font-semibold">FILE_NAME</span>{" "}
              <span className="italic">(e.g. {rawFileNameExample})</span>
            </p>
          </div>

          {/* Add New Drive Link Folder */}
          {isAdmin && (
            <div className="w-full flex justify-end">
              <SharedButton
                onClick={() => setShowDialog(true)}
                variant="primary"
                tone="dark"
                size="lg"
                rounded="md"
                className="px-6 py-4 md:px-8 md:py-6 text-xs sm:text-base md:text-lg font-light hover:!shadow-md hover:scale-[1.02] w-2/3 md:w-auto"
              >
                <Plus /> Add New Drive Link Folder
              </SharedButton>
            </div>
          )}

          {/* Folder buttons with admin controls */}
          {filteredFolders.length > 0 ? (
            <div
              className={`grid gap-4 font-montserrat ${isSingleColumn ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}
            >
              {filteredFolders.map(
                (folder: SubmissionBinFolderType, index: number) => {
                  const isLast = index === filteredFolders.length - 1;
                  const isOdd = filteredFolders.length % 2 !== 0;

                  const handleCardClick = () => {
                    if (!folder.gdriveLink) return;
                    window.open(
                      folder.gdriveLink,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  };

                  return (
                    <div
                      key={folder.id}
                      onClick={handleCardClick}
                      className={`group relative w-full bg-gradient-to-r from-[#49515A] to-[#373C44] text-white text-sm md:text-lg p-6 rounded-lg shadow hover:brightness-110 transition-all cursor-pointer ${!isSingleColumn && isLast && isOdd ? "md:col-span-2 md:w-1/2 md:mx-auto" : ""}`}
                    >
                      {/* Centered label */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none font-montserrat">
                        <span className="font-semibold text-center">
                          {folder.folderName}
                        </span>
                      </div>

                      {/* Icons on the right */}
                      {isAdmin && (
                        <div className="relative z-10 flex items-center justify-end gap-2">
                          {/* DESKTOP INLINE ICONS */}
                          <div className="hidden lg:flex items-center gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedSubmissionBinFolder(folder);
                                setEditModalOpen(true);
                              }}
                              className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
                            >
                              <Pencil className="w-4 h-4 text-white" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedSubmissionBinFolder(folder);
                                setDeleteModalOpen(true);
                              }}
                              className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
                            >
                              <Trash2 className="w-4 h-4 text-red-100" />
                            </button>
                          </div>

                          {/* MOBILE + TABLET 3-DOT MENU */}
                          <div className="lg:hidden relative">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setOpenMenuId(
                                  openMenuId === folder.id ? null : folder.id
                                );
                              }}
                              className="p-2 rounded-full bg-white/10 border border-white/20 active:bg-white/20 text-white"
                            >
                              ⋮
                            </button>

                            {openMenuId === folder.id && (
                              <div
                                className="absolute right-0 left-1/2 bottom-full mb-2 -translate-x-1/2 w-25 md:w-28 rounded-xl bg-[#2a2e33] shadow-xl border border-white/10 py-3 z-1000"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 flex items-center gap-2"
                                  onClick={() => {
                                    setSelectedSubmissionBinFolder(folder);
                                    setEditModalOpen(true);
                                    setOpenMenuId(null);
                                  }}
                                >
                                  <Pencil className="w-4 h-4" /> Edit
                                </button>
                                <button
                                  className="w-full text-left px-3 py-2 text-sm text-red-300 hover:bg-red-500/10 flex items-center gap-2"
                                  onClick={() => {
                                    setSelectedSubmissionBinFolder(folder);
                                    setDeleteModalOpen(true);
                                    setOpenMenuId(null);
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" /> Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            <EmptyState
              title="No folders yet"
              description="No submission folders have been added to this bin."
            />
          )}
        </ContentContainer>
      </PageContainer>

      {/* Create Submission Bin Folder Modal */}
      <CreateNewSubmissionBinFolderModal
        open={showDialog}
        onClose={() => setShowDialog(false)}
        binId={binId}
        onSave={handleAddSubmissionBinFolder}
      />

      {/* Edit Submission Bin Folder Modal */}
      <EditSubmissionBinFolderModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        submissionBinFolder={selectedSubmissionBinFolder}
        onUpdate={handleUpdateSubmissionBinFolder}
      />

      {/* Delete Confirmation */}
      <ActionModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="DELETE SUBMISSION BIN FOLDER?"
        description={
          selectedSubmissionBinFolder
            ? `Are you sure you want to permanently delete "${selectedSubmissionBinFolder.folderName}"? This cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        destructive={true}
      />
    </ProtectedRoute>
  );
}