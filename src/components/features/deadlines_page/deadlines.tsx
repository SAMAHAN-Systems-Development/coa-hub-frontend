"use client";

import React, { useState } from "react";
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

interface DeadlineItem {
    id: string;
    title: string;
    dueDate: string;
}

export default function DeadlinesPage() {

    const [isAdmin, setIsAdmin] = useState(true); // toggle for testing user vs admin
    const [showDialog, setShowDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const [rows, setRows] = useState<DeadlineItem[]>([
        { id: "1", title: "Raw File:", dueDate: "2025-11-14" },
        { id: "2", title: "Revisions:", dueDate: "2025-11-14" },
        { id: "3", title: "Cash Count:", dueDate: "2025-11-14" },
    ]);

    const handleSaveDeadline = (data: { title: string; dueDate: Date }) => {
        const newRow = {
            id: String(Date.now()),
            title: data.title,
            dueDate: format(data.dueDate, "yyyy-MM-dd"), // ← FIXED
        };

        setRows(prev => [...prev, newRow]);
        setShowDialog(false);
    };

    const handleUpdateDeadline = (updated: { id: string; title: string; dueDate: Date }) => {
        setRows(prev =>
            prev.map(row =>
                row.id === updated.id
                    ? {
                        ...row,
                        title: updated.title,
                        dueDate: format(updated.dueDate, "yyyy-MM-dd"), // ← FIXED
                    }
                    : row
            )
        );

        setEditModalOpen(false);
        setSelectedRow(null);
    };

    const handleDelete = () => {
        if (!selectedRow) return;

        setRows((prev) => prev.filter((r) => r.id !== selectedRow.id));
        setDeleteModalOpen(false);
        setSelectedRow(null);
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
                            {rows.map((row, index) => (
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
                                    {row.title}
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
                                    {format(new Date(row.dueDate), "MMM d, yyyy")}
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
                        onSave={handleSaveDeadline}
                    />
                    <EditDeadlineModal
                        open={editModalOpen}
                        onClose={() => setEditModalOpen(false)}
                        deadline={
                            selectedRow
                                ? {
                                    id: selectedRow.id,
                                    title: selectedRow.title,
                                    dueDate: new Date(selectedRow.dueDate),
                                }
                                : null
                        }
                        onUpdate={handleUpdateDeadline}
                    />
                </SectionContainer>
            </ContentContainer>
        </div>
    );
}