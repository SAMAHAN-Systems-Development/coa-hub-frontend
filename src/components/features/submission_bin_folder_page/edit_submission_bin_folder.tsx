"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { SharedButton } from "../../shared/SharedButton";
import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import ActionModal from "@/components/features/action_modal";
import { toastError } from "@/components/shared/toast";
import { SubmissionBinFolderSchema } from "@/lib/zod/submission-bin-folder";

interface EditSubmissionBinFolderModalProps {
    open: boolean;
    onClose: () => void;
    submissionBinFolder: {
        id: number;
        binId: number;
        folderName: string;
        gdriveLink: string;
    } | null;
    onUpdate: (updated: { binId: number; folderName: string; gdriveLink: string }) => void;
}

export default function EditSubmissionBinFolderModal({
    open,
    onClose,
    submissionBinFolder,
    onUpdate,
}: EditSubmissionBinFolderModalProps) {
    const [folderName, setFolderName] = useState("");
    const [gdriveLink, setGdriveLink] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);

    // Load selected folder info when modal opens
    useEffect(() => {
        if (submissionBinFolder) {
            setFolderName(submissionBinFolder.folderName);
            setGdriveLink(submissionBinFolder.gdriveLink);
        }
    }, [submissionBinFolder, open]);

    // Show confirmation modal first
    function handleSaveClick() {
        if (!folderName || !gdriveLink) return; 

        // Lightweight presence check; full validation happens in confirmUpdate via Zod
        setConfirmOpen(true);
    }

    // After confirming:
    function confirmUpdate() {
        if (!submissionBinFolder) return;
        const payload = {
            binId: submissionBinFolder.binId,
            folderName: folderName.trim(),
            gdriveLink: gdriveLink.trim(),
        };

        const parsed = SubmissionBinFolderSchema.omit({ id: true }).safeParse(payload);
        if (!parsed.success) {
            toastError({
                title: "Invalid input",
                description: 'Only Google Drive Folder link is allowed. Please check your input and try again.',
            });
            return;
        }

        onUpdate(parsed.data);

        setConfirmOpen(false);
        onClose();
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent
                    className="w-full !max-w-[1200px] max-h-full overflow-y-auto rounded-xl p-10 text-white border border-white/10 [&>button]:hidden"
                    style={{ background: "linear-gradient(225deg, #6C7178 0%, #373C44 100%)" }}
                >
                    {/* HEADER */}
                    <DialogHeader>
                        <div className="mt-3 flex items-center gap-3">
                            <SquarePen className="w-7 h-7 md:w-11 md:h-11" />
                            <DialogTitle className="text-4xl md:text-5xl font-bebas-neue font-medium tracking-wide">
                                EDIT SUBMISSION BIN FOLDER
                            </DialogTitle>
                        </div>
                    </DialogHeader>

                    {/* FORM CONTENT */}
                    <div className="mt-2 md:mt-8 space-y-6 pb-10 lg:pb-0">

                        {/* SUBMISSION BIN NAME */}
                        <div
                            className="rounded-2xl p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] flex flex-col gap-3"
                            style={{ background: "linear-gradient(90deg, rgba(120,125,133,0.65), rgba(55,60,68,0.90))" }}
                        >
                            <label className="text-white text-base md:text-xl font-medium">Submission Bin Folder Name</label>

                            <Input
                                placeholder="Add Submission Bin Folder Name"
                                value={folderName}
                                onChange={(e) => setFolderName(e.target.value)}
                                className="bg-[#E6E9EE] 
                                text-gray-700 text-xs sm:text-sm md:text-xl 
                                placeholder:text-gray-500 
                                rounded-sm 
                                h-8 md:h-12
                                border border-white/20
                                px-2 md:px-4"
                            />
                        </div>

                        {/* Google Drive Link */}
                        <div
                            className="
                                rounded-2xl p-6
                                shadow-[0px_20px_60px_-20px_rgba(0,0,0,0.35)]
                                flex flex-col gap-3
                            "
                            style={{
                                background: "linear-gradient(90deg, rgba(120,125,133,0.65), rgba(55,60,68,0.90))",
                            }}
                        >
                            <label className="text-white text-xl font-medium">Google Drive Link</label>

                            <Input
                                placeholder="Paste Google Drive link"
                                value={gdriveLink}
                                onChange={(e) => setGdriveLink(e.target.value)}
                                className="
                                    bg-[#E6E9EE] 
                                    text-gray-700 
                                    placeholder:text-gray-500 
                                    rounded-xl 
                                    h-12
                                    border border-white/20
                                    px-4
                                "
                            />
                        </div>
                    </div>

                    {/* FOOTER */}
                    <DialogFooter className="mt-1 md:mt-8 flex flex-row justify-end gap-4">
                        <SharedButton 
                            onClick={handleSaveClick} 
                            size="lg" 
                            rounded="lg" 
                            tone="glass" 
                            className="h-11 !px-8 !text-sm sm:!px-12 sm:!text-base md:min-w-[130px] md:!text-base"
                        >
                            Save
                        </SharedButton>

                        <SharedButton 
                            onClick={onClose} 
                            size="lg" 
                            rounded="lg" 
                            tone="glass" 
                            className="h-11 !px-6 !text-sm sm:!px-10 sm:!text-base md:min-w-[130px] md:!text-base"
                        >
                            Cancel
                        </SharedButton>
                    </DialogFooter>

                </DialogContent>
            </Dialog>
            <ActionModal
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                title="EDIT SUBMISSION BIN FOLDER?"
                description="Are you sure you want to save these changes? Information will be updated."
                confirmText="Save"
                cancelText="Go Back"
                onConfirm={confirmUpdate}
                onCancel={() => setConfirmOpen(false)}
            />
        </>
    );
}