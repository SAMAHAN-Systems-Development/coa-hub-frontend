import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { SharedButton } from "../../shared/SharedButton";
import { Input } from "@/components/ui/input";
import { ImageIcon, Plus } from "lucide-react";
import { useState } from "react";
import ActionModal from "@/components/features/action_modal"; 
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"

interface CreateNewDeadlineProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: { title: string; dueDate: Date }) => void;
}

export default function CreateNewDeadlineModal({
    open,
    onClose,
    onSave,
}: CreateNewDeadlineProps) {
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState<Date | null>(null)
    const [confirmOpen, setConfirmOpen] = useState(false);

    function handleSaveClick() {
        if (!title  || !dueDate) return;
        setConfirmOpen(true);
    }

    function confirmSave() {
        if (!dueDate) return;

        onSave({
            title,
            dueDate, // already a Date object
        });

        resetForm();
        setConfirmOpen(false);
        onClose();
    }

    function resetForm() {
        setTitle("");
        setDueDate(null);
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
                    className="w-full h-full md:h-auto !max-w-[1200px] !max-h-[900px] rounded-xl p-10 text-white border border-white/10 !overflow-visible [&>button]:hidden"
                    style={{
                    background: "linear-gradient(225deg, #6C7178 0%, #373C44 100%)",
                    }}
                >
                    {/* HEADER */}
                    <DialogHeader>
                    <div className="mt-15 md:mt-3 flex items-center gap-3">
                        <Plus className="w-7 h-7 md:w-11 md:h-11" />
                        <DialogTitle className="text-4xl md:text-5xl font-bebas-neue font-medium tracking-wide">
                        ADD NEW Deadline
                        </DialogTitle>
                    </div>
                    </DialogHeader>

                    {/* FORM */}
                    <div className="mt-2 md:mt-8 space-y-6">
                        {/* Title */}
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
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="
                            bg-[#E6E9EE] 
                            text-gray-700 text-xs sm:text-sm md:text-xl 
                            placeholder:text-gray-500 
                            rounded-sm 
                            h-8 md:h-12
                            border border-white/20
                            px-2 md:px-4
                            "
                        />
                        </div>

                        {/* DATE PICKER */}
                        <div
                            className="rounded-2xl p-6 shadow-[0px_20px_60px_-20px_rgba(0,0,0,0.35)] flex flex-col gap-3"
                            style={{
                                background: "linear-gradient(90deg, rgba(120,125,133,0.65), rgba(55,60,68,0.90))",
                            }}
                        >
                            <label className="text-white text-base md:text-xl font-medium">Date</label>

                           <Popover>
                                <PopoverTrigger asChild>
                                    <button
                                        className="
                                            bg-[#E6E9EE]
                                            text-gray-700 text-xs md:text-xl
                                            rounded-sm h-8 md:h-12 w-full px-2 md:px-4 flex items-center justify-between
                                            border border-white/20
                                        "
                                    >
                                        {dueDate ? format(dueDate, "PPP") : "Select Date"}

                                        <CalendarIcon className="h-5 w-5 opacity-70" />
                                    </button>
                                </PopoverTrigger>

                                <PopoverContent className="bg-white p-0 rounded-xl shadow-lg overflow-visible">
                                    <Calendar
                                        mode="single"
                                        selected={dueDate ?? undefined}
                                        onSelect={(date) => setDueDate(date ?? null)}
                                        initialFocus
                                        className="
                                            rounded-md 
                                            w-[285px]

                                            /* Reduce outer padding */
                                            [&>div]:p-4

                                            /* Reduce month title + nav height */
                                            [&_.rdp-caption-label]:text-lg
                                            [&_.rdp-nav]:h-6

                                            /* Reduce weekday header spacing */
                                            [&_.rdp-weekday]:py-1

                                            /* Reduce gaps between rows */
                                            [&_.rdp-month_grid]:gap-0

                                            /* Smaller day cells */
                                            [&_.rdp-day_button]:h-7 
                                            [&_.rdp-day_button]:w-7
                                            [&_.rdp-day_button]:text-sm
                                        "
                                        />

                                </PopoverContent>
                            </Popover>

                        </div>
                    </div>

                    {/* FOOTER BUTTONS */}
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
                title="SAVE NEW DEADLINE?"
                description="Are you sure you want to save the new deadline? Information will be saved."
                confirmText="Save"
                cancelText="Go Back"
                onConfirm={confirmSave}
                onCancel={() => setConfirmOpen(false)}
            />
        </>
    )
}