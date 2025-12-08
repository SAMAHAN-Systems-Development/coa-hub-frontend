"use client";

import React, { useEffect, useState } from "react";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { Spacer } from "@/components/layout/Spacer";
import { SharedButton } from "@/components/shared/SharedButton";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Pencil } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { format } from "date-fns";
import ActionModal from "@/components/features/action_modal";
import CreateNewDeadlineModal from "@/components/features/deadlines_page/create_new_deadline";
import EditDeadlineModal from "@/components/features/deadlines_page/edit_deadline_modal";
import { useDeadlinesQuery } from "@/lib/api/queries/use-deadlines";
import { useCreateDeadlineMutation, useUpdateDeadlineMutation, useDeleteDeadlineMutation } from "@/lib/api/mutations/deadline.mutation";
import { SkeletonCard } from "@/components/shared/loading-skeleton";
import { toastError, toastSuccess } from "@/components/shared/toast";
import { useAuth } from "@/lib/hooks/useAuth";
import { DeadlineSchema } from "@/lib/zod/deadline";

export default function DeadlinesPage() {

    const { isAdmin } = useAuth();  // toggle for testing user vs admin
    const [showDialog, setShowDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const { data: rows, isLoading, error } = useDeadlinesQuery();
    const createDeadline = useCreateDeadlineMutation();
    const updateDeadline = useUpdateDeadlineMutation(selectedRow?.id);
    const deleteDeadline = useDeleteDeadlineMutation(selectedRow?.id);

    useEffect(() => {
        if (error) {
            toastError({
                title: "Failed to load deadlines",
                description: "Please check your connection and try again.",
            });
        }
    }, [error]);

    if (isLoading) {
        return (
            <ContentContainer>
                <SectionContainer>
                    {/* Header skeleton */}
                    <SkeletonCard size="lg" variant="text-only" className="mb-6" />

                    {/* Table skeleton */}
                    <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] mt-8">
                        <SkeletonCard size="md" lines={4} />
                    </div>
                </SectionContainer>
            </ContentContainer>
        );
    }

    const handleAddDeadline = async (data: { name: string; dueDate: Date }) => {
        try {
            // Validate with Zod (omit id)
            const createSchema = DeadlineSchema.omit({ id: true });
            // Convert selected local Date into a UTC-midnight ISO string so
            // the stored date represents the selected calendar day regardless
            // of client timezone.
            const d = data.dueDate;
            const utcIso = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString();

            const parsed = createSchema.safeParse({
                name: data.name,
                dueDate: utcIso,
            });
            if (!parsed.success) {
                toastError({ title: 'Invalid input', description: parsed.error.issues.map(i => i.message).join('; ') });
                return;
            }

            await createDeadline.mutateAsync({
                name: parsed.data.name,
                dueDate: parsed.data.dueDate,
            });
            toastSuccess({
                title: "Deadline created",
                description: "Your new deadline has been saved.",
            });
            setShowDialog(false);
            } catch (err) {
            console.error("Failed to create deadline:", err);
            toastError({
                title: "Failed to create deadline",
                description: "Please try again.",
            });
        }
    };

    const handleUpdateDeadline = async (data: { name: string; dueDate: Date }) => {
        if (!selectedRow) return;

        try {
            // Convert selected local Date into a UTC-midnight ISO string so
            // the stored date represents the selected calendar day regardless
            // of client timezone.
            const ud = data.dueDate;
            const utcIsoUpdate = new Date(Date.UTC(ud.getFullYear(), ud.getMonth(), ud.getDate())).toISOString();

            const payload = {
                id: selectedRow.id,
                name: data.name,
                dueDate: utcIsoUpdate,
            };

            const parsed = DeadlineSchema.safeParse(payload);
            if (!parsed.success) {
                toastError({ title: 'Invalid input', description: parsed.error.issues.map(i => i.message).join('; ') });
                return;
            }

            await updateDeadline.mutateAsync({
                id: Number(parsed.data.id),
                dto: {
                    name: parsed.data.name,
                    dueDate: parsed.data.dueDate,
                },
            });
            toastSuccess({
                title: "Deadline updated",
                description: "Changes have been saved.",
            });
            setEditModalOpen(false);
        } catch (err) {
            console.error("Failed to update deadline:", err);
            toastError({
                title: "Failed to update deadline",
                description: "Please try again.",
            });
        }
    };

    const handleDelete = async () => {
        if (!selectedRow) return;

        try {
        await deleteDeadline.mutateAsync(selectedRow.id);
        toastSuccess({
            title: "Deadline deleted",
            description: "The deadline has been removed.",
        });
        setDeleteModalOpen(false);
        setSelectedRow(null);
        } catch (err) {
        console.error("Failed to delete deadline:", err);
        toastError({
            title: "Failed to delete deadline",
            description: "Please try again.",
        });
        }
    };

    return (
        <div>
            <ContentContainer>
                <SectionContainer>
                    <div
                        className="rounded-2xl p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] flex flex-col sm:flex-col md:flex-row items-center gap-4 md:gap-0 md:justify-between"
                        style={{ background: "linear-gradient(90deg, #6C7178 0%, #373C44 100%)" }}
                    >
                        <label className="text-6xl md:text-7xl text-white font-medium font-bebas-neue uppercase">Deadlines</label>
                        {isAdmin && (
                            <SharedButton
                            onClick={() => setShowDialog(true)}
                            variant="primary"
                            tone="glass"
                            size="lg"
                            rounded="md"
                            className="
                                px-6 py-4 md:px-8 md:py-6 
                                text-xs sm:text-base md:text-lg font-light 
                                hover:!shadow-md
                                hover:scale-[1.02] w-2/3 md:w-auto
                            "
                            >
                            Add New Deadline
                            </SharedButton>
                        )}
                    </div>

                    <Spacer size={7} />
                
                    {/* TABLE */}
                    <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] mt-8">
                        <Table className="border-collapse w-full">
                            
                            {/* HEADER */}
                            <TableHeader>
                                <TableRow>
                                    <TableHead
                                    colSpan={isAdmin ? 3 : 2}
                                    className="text-center text-white text-sm sm:text-lg md:text-xl tracking-wide py-6 font-semibold"
                                    style={{
                                        background: "linear-gradient(90deg, #6C7178 0%, #373C44 100%)",
                                    }}
                                    >
                                    MONTHLY LRS
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            {/* BODY */}
                            <TableBody>
                            {rows?.map((row, index) => (
                                <TableRow key={index} className="border border-[#c8c8c8] hover:bg-transparent">
                                
                                {/* LABEL COLUMN */}
                                <TableCell
                                    className="
                                    text-white
                                    text-xs sm:text-base md:text-xl
                                    font-medium
                                    py-8
                                    text-center
                                    border border-[#c8c8c8]
                                    w-2/6 md:w-1/2
                                    "
                                    style={{ background:"linear-gradient(90deg, #373C44 0%, #6C7178 100%)"}}
                                >
                                    {row.name}
                                </TableCell>

                                {/* DUE DATE COLUMN */}
                                <TableCell
                                    className="
                                    text-center
                                    text-[#373C44] 
                                    text-xs sm:text-base md:text-xl
                                    font-semibold
                                    border border-[#c8c8c8]
                                    py-8
                                    w-2/6 md:w-1/4
                                    "
                                    style={{ background: "#F5F5F5"}}
                                >
                                    {(() => {
                                        try {
                                            if (!row?.dueDate) return "";
                                            const d = new Date(row.dueDate);
                                            // Build a local Date using the UTC year/month/date so
                                            // the displayed day matches the original selected day
                                            const displayDate = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
                                            // Convert that UTC-based timestamp into a local Date with the same Y/M/D
                                            const localDisplay = new Date(displayDate.getUTCFullYear(), displayDate.getUTCMonth(), displayDate.getUTCDate());
                                            return format(localDisplay, "MMM d, yyyy");
                                        } catch (e) {
                                            return "";
                                        }
                                    })()}
                                </TableCell>

                                {/* ADMIN ICONS */}
                                {isAdmin && (
                                    <TableCell
                                        className="
                                            flex 
                                            items-center 
                                            gap-3 sm:gap-4 md:gap-6 
                                            justify-center 
                                            py-8 px-1 sm:px-2 md:px-0
                                        "
                                        style={{ background: "#F5F5F5" }}
                                    >
                                    <button 
                                        onClick={() => {
                                            setSelectedRow(row);
                                            setEditModalOpen(true);
                                        }}
                                        className="text-[#373C44] hover:text-black transition"
                                    >
                                        <Pencil className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                    </button>
                                    <button 
                                        onClick={() => {
                                            setSelectedRow(row);
                                            setDeleteModalOpen(true);
                                        }}
                                        className="text-[#373C44] hover:text-black transition"
                                    >
                                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                                    </button>
                                    </TableCell>
                                )}
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        <ActionModal
                            open={deleteModalOpen}
                            onOpenChange={setDeleteModalOpen}
                            title="DELETE DEADLINE?"
                            description="Are you sure you want to permanently delete this row? This cannot be undone."
                            confirmText="Delete"
                            cancelText="Cancel"
                            onConfirm={handleDelete}
                            onCancel={() => setDeleteModalOpen(false)}
                        />
                    </div>
                    <CreateNewDeadlineModal
                        open={showDialog}
                        onClose={() => setShowDialog(false)}
                        onSave={handleAddDeadline}
                    />
                    <EditDeadlineModal
                        open={editModalOpen}
                        onClose={() => setEditModalOpen(false)}
                        deadline={selectedRow}
                        onUpdate={handleUpdateDeadline}
                    />
                </SectionContainer>
            </ContentContainer>
        </div>
    );
}