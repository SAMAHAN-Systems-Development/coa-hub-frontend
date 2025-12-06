import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { SharedButton } from "../../shared/SharedButton";
import { Input } from "@/components/ui/input";
import { ImageIcon, Plus } from "lucide-react";
import { useState } from "react";
import ActionModal from "@/components/features/action_modal";
import { TemplateSchema } from "@/lib/zod/templates";
import { toastError } from "@/components/shared/toast"; 

interface CreateNewTemplateProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: { name: string; gdriveLink: string }) => void;
}

export default function CreateNewTemplateModal({
    open,
    onClose,
    onSave,
}: CreateNewTemplateProps) {
    const [name, setName] = useState("");
    const [gdriveLink, setGDriveLink] = useState("");

    const [confirmOpen, setConfirmOpen] = useState(false);
    const createSchema = TemplateSchema.omit({ id: true });

    function handleSaveClick() {
        if (!name || !gdriveLink) return;

        const payload = {
            name: name.trim(),
            gdriveLink: gdriveLink.trim(),
        };

        const parsed = createSchema.safeParse(payload);
        if (!parsed.success) {
            toastError({
                title: "Invalid input",
                description: parsed.error.issues.map((i) => i.message).join("; "),
            });
            return;
        }

        setConfirmOpen(true);
    }

    function confirmSave() {
        const payload = {
            name: name.trim(),
            gdriveLink: gdriveLink.trim(),
        };

        const parsed = createSchema.safeParse(payload);
        if (!parsed.success) {
            toastError({
                title: "Invalid input",
                description: parsed.error.issues.map((i) => i.message).join("; "),
            });
            return;
        }

        onSave(parsed.data);

        resetForm();
        setConfirmOpen(false);
        onClose();
    }

    function resetForm() {
        setName("");
        setGDriveLink("");
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
                    className="w-full !max-w-[1200px] max-h-full overflow-y-auto rounded-xl p-10 text-white border border-white/10 [&>button]:hidden"
                    style={{
                    background: "linear-gradient(225deg, #6C7178 0%, #373C44 100%)",
                    }}
                >
                    {/* HEADER */}
                    <DialogHeader>
                    <div className="mt-3 flex items-center gap-3">
                        <Plus className="w-7 h-7 md:w-11 md:h-11" />
                        <DialogTitle className="text-4xl md:text-5xl font-bebas-neue font-medium tracking-wide">
                            CREATE NEW TEMPLATE
                        </DialogTitle>
                    </div>
                    </DialogHeader>

                    {/* FORM */}
                    <div className="mt-2 md:mt-8 space-y-6 pb-10 lg:pb-0">
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
                        <label className="text-white text-base md:text-xl font-medium">Subject</label>

                        <Input
                            placeholder="Add Subject"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="
                            bg-[#E6E9EE] 
                            text-gray-700 text-xs sm:text-sm md:text-xl
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
                            <label className="text-white text-base md:text-xl font-medium">Google Drive Link</label>

                            <Input
                                placeholder="Paste Google Drive link"
                                value={gdriveLink}
                                onChange={(e) => setGDriveLink(e.target.value)}
                                className="
                                    bg-[#E6E9EE] 
                                    text-gray-700 text-xs sm:text-sm md:text-xl
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
                    <DialogFooter className="mt-1 md:mt-8 flex flex-row justify-end gap-4">
                        <SharedButton
                            onClick={handleSaveClick}
                            size="lg"
                            rounded="lg"
                            tone="glass"
                            className="h-11 !px-6 !text-sm sm:!px-10 sm:!text-base md:min-w-[130px] md:!text-base"
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