"use client";

import React, { useState } from "react";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Spacer } from "@/components/layout/Spacer";
import { SharedButton } from "@/components/shared/SharedButton";
import ActionModal from "@/components/features/action_modal";
import CreateNewTemplateModal from "@/components/features/template/create_new_template";
import EditTemplateModal from "@/components/features/template/edit_template_modal";
import { Pencil } from 'lucide-react';
import { Trash2 } from 'lucide-react';

interface TemplateItem {
  id: string;
  title: string;
  driveLink: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<TemplateItem[]>([
    {
      id: "1",
      title: "Sample Proposal Template",
      driveLink:
        "https://docs.google.com/document/d/1OC_WI9WveevrvFYn0F4FERmMWyhjrFL1SJZP93RLEcs/edit?usp=drive_link",
    },
    {
      id: "2",
      title: "Sample Proposal Template 2",
      driveLink:
        "https://drive.google.com/file/d/1f3z1_rEUAtFgJeO4ejddvA6cDDOSyyPA/view?usp=drive_link",
    },
    {
      id: "3",
      title: "Sample Proposal Template 3",
      driveLink:
        "https://docs.google.com/document/d/1OC_WI9WveevrvFYn0F4FERmMWyhjrFL1SJZP93RLEcs/edit?usp=drive_link",
    },
    {
      id: "4",
      title: "Sample Proposal Template 4",
      driveLink:
        "https://docs.google.com/document/d/1OC_WI9WveevrvFYn0F4FERmMWyhjrFL1SJZP93RLEcs/edit?usp=drive_link",
    },
    {
      id: "5",
      title: "Sample Proposal Template 5",
      driveLink:
        "https://docs.google.com/document/d/1OC_WI9WveevrvFYn0F4FERmMWyhjrFL1SJZP93RLEcs/edit?usp=drive_link",
    },
  ]);

  const [isAdmin, setIsAdmin] = useState(true); // toggle for testing user vs admin
  const [showDialog, setShowDialog] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [templateBeingEdited, setTemplateBeingEdited] = useState<TemplateItem | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(null);

  const [newTemplate, setNewTemplate] = useState<{
    title: string;
    driveLink: string;
  }>({
    title: "",
    driveLink: "",
  });

  function getDrivePreviewUrl(link: string): string {
    if (!link) return "";

    // Normalize URL by removing trailing params
    const cleanLink = link.split("?")[0];

    // 1️⃣ GOOGLE DOCS (document/d/... or document/u/.../d/...)
    if (cleanLink.includes("docs.google.com/document")) {
      const match = cleanLink.match(/\/d\/([^/]+)/);
      if (match) {
        return `https://docs.google.com/document/d/${match[1]}/preview`;
      }
    }

    // 2️⃣ GOOGLE FILE (PDF, DOCX, TEXT, SLIDES, IMAGES, ANY FILE)
    // Format: https://drive.google.com/file/d/{ID}/view
    if (cleanLink.includes("drive.google.com/file")) {
      const match = cleanLink.match(/\/d\/([^/]+)/);
      if (match) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }

    // 3️⃣ GOOGLE DRIVE FOLDER  
    // Format: https://drive.google.com/drive/folders/{ID}
    if (cleanLink.includes("drive.google.com/drive/folders")) {
      const match = cleanLink.match(/\/folders\/([^/]+)/);
      if (match) {
        return `https://drive.google.com/drive/folders/${match[1]}?usp=sharing`;
      }
    }

    // 4️⃣ ALTERNATE DOCS FORMAT (export/... etc)
    const docMatch = cleanLink.match(/document\/d\/([^/]+)/);
    if (docMatch) {
      return `https://docs.google.com/document/d/${docMatch[1]}/preview`;
    }

    // 5️⃣ FAILSAFE: Just return original link
    return link;
  }

  const handleAddTemplate = () => {
    if (!newTemplate.title || !newTemplate.driveLink) return;

    setTemplates([
      ...templates,
      {
        id: Date.now().toString(),
        title: newTemplate.title,
        driveLink: newTemplate.driveLink, // preview URL
      },
    ]);

    setNewTemplate({
      title: "",
      driveLink: "",
    });

    setShowDialog(false); // optional: closes dialog after saving
  };

  const handleDelete = () => {
    if (!selectedTemplate) return;

    setTemplates(templates.filter((t) => t.id !== selectedTemplate.id));
    setDeleteModalOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <div
        className="min-h-screen w-full text-white py-2"
        style={{
        background: "linear-gradient(225deg, #6C7178 0%, #373C44 100%)",
        }}
    >
        <ContentContainer>
        <SectionContainer>
            <div className="flex justify-between items-center">
            <h1 className="text-7xl font-medium font-bebas-neue uppercase">
                Templates
            </h1>
            {isAdmin && (
              <SharedButton
                onClick={() => setShowDialog(true)}
                variant="primary"
                tone="glass"
                size="lg"
                rounded="md"
                className="
                  px-8 py-6 text-lg font-light 
                  hover:!shadow-md
                  hover:scale-[1.02]
                "
              >
                Add New Template
              </SharedButton>
            )}
            </div>
            <Spacer size={20} />

            {/* TEMPLATE GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-0 place-items-center px-60">
                {templates.map((template, index) => {
                    const previewUrl = getDrivePreviewUrl(template.driveLink);
                    // Check if last item and odd number of templates
                    const isLastOdd =
                    templates.length % 2 !== 0 && index === templates.length - 1;

                    return (
                    <div
                      key={template.id}
                      className={`relative group flex flex-col items-center ${
                        isLastOdd ? "col-span-2 justify-self-center" : ""
                      }`}
                    >
                      {/* WHITE BOX for IMAGE ONLY */}
                       <div className="relative group bg-white rounded-xl shadow-lg p-3 w-full max-w-[800px] overflow-hidden hover:scale-[1.02] transition-transform">

                        {/* DARK OVERLAY (darkens whole card) */}
                        <div
                          className="
                            absolute inset-0 
                            bg-black/55 
                            opacity-0 
                            group-hover:opacity-100 
                            transition-all duration-300 
                            rounded-xl 
                            z-10
                          "
                        ></div>

                        {/* Admin Icons */}
                        {isAdmin && (
                          <div
                            className="absolute top-3 right-3 flex gap-2 z-20"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              className="text-gray-800 group-hover:text-white transition-colors"
                              onClick={() => {
                                  setTemplateBeingEdited(template);
                                  setEditModalOpen(true);
                              }}
                            >
                              <Pencil />
                            </button>
                            <button
                              className="text-gray-800 group-hover:text-white transition-colors"
                              onClick={() => {
                                setSelectedTemplate(template);
                                setDeleteModalOpen(true);
                              }}
                            >
                              <Trash2 />
                            </button>
                          </div>
                        )}

                        {/* Clickable Image */}
                         <a
                            href={template.driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative block z-0"
                          >
                            {/* GOOGLE DRIVE PREVIEW */}
                            <iframe
                              src={previewUrl}
                              className="w-full h-[200px] rounded-md"
                              allow="autoplay"
                            />
                          </a>
                      </div>

                      {/* TITLE (white text, NOT inside the white background) */}
                      <a
                        href={template.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h2 className="mt-3 text-center text-white font-thin text-sm md:text-base transition-all group-hover:scale-[1.05] group-hover:text-white/90">
                          {template.title}
                        </h2>
                      </a>
                    </div>
                    );
                })}
            </div>
        </SectionContainer>
        </ContentContainer>

        {/* Add Template Dialog */}
        <CreateNewTemplateModal
          open={showDialog}
          onClose={() => setShowDialog(false)}
          onSave={(data) => {
            setTemplates(prev => [
              ...prev,
              {
                id: Date.now().toString(),
                title: data.title,
                driveLink: data.driveLink,
              },
            ]);

            setShowDialog(false);
          }}
        />

        <EditTemplateModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          template={templateBeingEdited}
          onUpdate={(updated) => {
              setTemplates(prev =>
                  prev.map(t => (t.id === updated.id ? { ...t, ...updated } : t))
              );
          }}
        />

        {/* Delete Confirmation */}
        <ActionModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          title="DELETE TEMPLATE?"
          description={
            selectedTemplate
              ? `Are you sure you want to permanently delete "${selectedTemplate.title}"? This cannot be undone.`
              : ""
          }
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
          destructive={true}
        />
    </div>
    );
}
