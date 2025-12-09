"use client";

import Link from "next/link";
import { FolderOpen, ArrowRight } from "lucide-react";

import { useSubmissionBinsQuery } from "@/lib/api/queries/use-submission-bins";

export function SubmissionBinsGrid() {
    const { data: submissionBins, isLoading } = useSubmissionBinsQuery();

    const activeBins = submissionBins?.filter((bin) => !bin.deletedAt) || [];

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                        key={i}
                        className="h-24 bg-gradient-to-r from-[#49515A] to-[#373C44] rounded-xl animate-pulse"
                    />
                ))}
            </div>
        );
    }

    if (activeBins.length === 0) {
        return (
            <div className="bg-gradient-to-r from-[#49515A] to-[#373C44] rounded-xl p-8 text-center">
                <FolderOpen className="w-12 h-12 text-white/60 mx-auto mb-4" />
                <p className="text-white font-montserrat">No submission bins available</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeBins.map((bin) => (
                <Link
                    key={bin.id}
                    href={`/submission-bin/${bin.id}`}
                    className="group relative bg-gradient-to-r from-[#49515A] to-[#373C44] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />

                    <div className="relative flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                            <div className="p-3 bg-white/10 rounded-lg">
                                <FolderOpen className="w-6 h-6 text-white" />
                            </div>
                            <div className="min-w-0">
                                <h4 className="text-white font-bebas-neue text-xl truncate">
                                    {bin.name}
                                </h4>
                                <p className="text-gray-400 text-sm font-montserrat truncate">
                                    {bin.fileFormat}
                                </p>
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default SubmissionBinsGrid;
