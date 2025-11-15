import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { SharedButton } from "../../shared/SharedButton";
import { Input } from "@/components/ui/input";
import { ImageIcon, Plus } from "lucide-react";
import { useState } from "react";
import ActionModal from "@/components/features/action_modal"; 

interface CreateNewTemplateProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: { title: string; driveLink: string }) => void;
}

export default function CreateNewTemplateModal({
    open,
    onClose,
    onSave,
}: CreateNewTemplateProps) {
    const [title, setTitle] = useState("");
    const [driveLink, setDriveLink] = useState("");

    const [confirmOpen, setConfirmOpen] = useState(false);

    function handleSaveClick() {
        if (!title  || !driveLink) return;
        setConfirmOpen(true);
    }

    function confirmSave() {
        onSave({
            title,
            driveLink,
        });

        resetForm();
        setConfirmOpen(false);
        onClose();
    }

    function resetForm() {
        setTitle("");
        setDriveLink("");
    }

    return (
        <>
            <Dialog
                open={open}
                onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        resetForm(); 
                        onClose();
                    }
                }}
            >
                <DialogContent
                    className="w-full !max-w-[1200px] !max-h-[900px] rounded-xl p-10 text-white border border-white/10 [&>button]:hidden"
                    style={{
                    background: "linear-gradient(225deg, #6C7178 0%, #373C44 100%)",
                    }}
                >
                    {/* HEADER */}
                    <DialogHeader>
                    <div className="flex items-center gap-3">
                        <Plus size={36} />
                        <DialogTitle className="text-5xl font-bebas-neue font-medium tracking-wide">
                        CREATE NEW TEMPLATE
                        </DialogTitle>
                    </div>
                    </DialogHeader>

                    {/* FORM */}
                    <div className="mt-8 space-y-6">
                        {/* Subject */}
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
                        <label className="text-white text-xl font-medium">Subject</label>

                        <Input
                            placeholder="Add Subject"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                                value={driveLink}
                                onChange={(e) => setDriveLink(e.target.value)}
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

                    {/* FOOTER BUTTONS */}
                    <DialogFooter className="mt-8 flex justify-end gap-4">
                        <SharedButton
                            onClick={handleSaveClick}
                            size="lg"
                            rounded="lg"
                            tone="glass"
                            className="min-w-[130px]"
                        >
                            Save
                        </SharedButton>

                        <SharedButton
                            onClick={() => {
                                resetForm();
                                onClose();
                            }}
                            size="lg"
                            rounded="lg"
                            tone="glass"
                            className="min-w-[130px]"
                        >
                            Cancel
                        </SharedButton>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <ActionModal
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                title="SAVE NEW TEMPLATE?"
                description="Are you sure you want to save the new template? Information will be saved."
                confirmText="Save"
                cancelText="Go Back"
                onConfirm={confirmSave}
                onCancel={() => setConfirmOpen(false)}
            />
        </>
    )
}