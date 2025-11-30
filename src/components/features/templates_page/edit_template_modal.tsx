"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { SharedButton } from "../../shared/SharedButton";
import { Input } from "@/components/ui/input";
import { ImageIcon, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import ActionModal from "@/components/features/action_modal";

interface EditTemplateModalProps {
    open: boolean;
    onClose: () => void;
    template: {
        id: string;
        name: string;
        gdriveLink: string;
    } | null;
    onUpdate: (updated: { id: string; name: string; gdriveLink: string }) => void;
}

export default function EditTemplateModal({
    open,
    onClose,
    template,
    onUpdate,
}: EditTemplateModalProps) {
    
    const [name, setName] = useState("");
    const [gdriveLink, setGDriveLink] = useState("");

    const [confirmOpen, setConfirmOpen] = useState(false);

    // Load selected template info when modal opens
    useEffect(() => {
        if (template) {
            setName(template.name);
            setGDriveLink(template.gdriveLink);
        }
    }, [template, open]);

    // Show confirmation modal first
    function handleSaveClick() {
        setConfirmOpen(true);
    }

    // After confirming:
    function confirmUpdate() {
        if (!template) return;

        onUpdate({
            id: template.id,
            name,
            gdriveLink,
        });

        setConfirmOpen(false);
        onClose();
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent
                    className="w-full !max-w-[1000px] rounded-xl p-10 text-white border border-white/10 [&>button]:hidden"
                    style={{ background: "linear-gradient(225deg, #6C7178 0%, #373C44 100%)" }}
                >
                    {/* HEADER */}
                    <DialogHeader>
                        <div className="flex items-center gap-3">
                            <Pencil size={36} />
                            <DialogTitle className="text-5xl font-bebas-neue font-medium tracking-wide">
                                EDIT TEMPLATE
                            </DialogTitle>
                        </div>
                    </DialogHeader>

                    {/* FORM CONTENT */}
                    <div className="mt-8 space-y-6">

                        {/* Subject */}
                        <div
                            className="rounded-2xl p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] flex flex-col gap-3"
                            style={{ background: "linear-gradient(90deg, rgba(120,125,133,0.65), rgba(55,60,68,0.90))" }}
                        >
                            <label className="text-white text-xl font-medium">Subject</label>

                            <Input
                                placeholder="Add Subject"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-[#E6E9EE] text-gray-700 placeholder:text-gray-500 rounded-xl h-12 border border-white/20 px-4"
                            />
                        </div>

                        {/* GOOGLE DRIVE LINK */}
                        <div
                            className="rounded-2xl p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] flex flex-col gap-3"
                            style={{ background: "linear-gradient(90deg, rgba(120,125,133,0.65), rgba(55,60,68,0.90))" }}
                        >
                            <label className="text-white text-xl font-medium">Google Drive Link</label>

                            <Input
                                placeholder="Paste Google Drive link"
                                value={gdriveLink}
                                onChange={(e) => setGDriveLink(e.target.value)}
                                className="bg-[#E6E9EE] text-gray-700 placeholder:text-gray-500 rounded-xl h-12 border border-white/20 px-4"
                            />
                        </div>
                    </div>

                    {/* FOOTER */}
                    <DialogFooter className="mt-8 flex justify-end gap-4">
                        <SharedButton onClick={handleSaveClick} size="lg" rounded="lg" tone="glass" className="min-w-[130px]">
                            Save
                        </SharedButton>

                        <SharedButton onClick={onClose} size="lg" rounded="lg" tone="glass" className="min-w-[130px]">
                            Cancel
                        </SharedButton>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
            <ActionModal
                    open={confirmOpen}
                    onOpenChange={setConfirmOpen}
                    title="EDIT TEMPLATE?"
                    description="Are you sure you want to edit the template? Information will be saved."
                    confirmText="Save"
                    cancelText="Go Back"
                    onConfirm={confirmUpdate}
                    onCancel={() => setConfirmOpen(false)}
            />
        </>
    );
}