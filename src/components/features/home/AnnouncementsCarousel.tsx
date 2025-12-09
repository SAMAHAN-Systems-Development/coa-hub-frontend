"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Megaphone } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { useRecentAnnouncementsQuery } from "@/lib/api/queries/use-announcements";
import { toAnnouncementDisplay } from "@/lib/types/entities/announcement";

export function AnnouncementsCarousel() {
    const { data: announcements, isLoading } = useRecentAnnouncementsQuery(7);

    const displayAnnouncements = useMemo(() => {
        if (!announcements || announcements.length === 0) return [];
        return announcements.map(toAnnouncementDisplay);
    }, [announcements]);

    if (isLoading) {
        return (
            <div className="w-full h-64 bg-gradient-to-r from-[#49515A] to-[#373C44] rounded-xl animate-pulse flex items-center justify-center">
                <p className="text-white/60">Loading announcements...</p>
            </div>
        );
    }

    if (displayAnnouncements.length === 0) {
        return (
            <div className="w-full py-12 bg-gradient-to-r from-[#49515A] to-[#373C44] rounded-xl flex flex-col items-center justify-center text-white">
                <Megaphone className="w-12 h-12 mb-4 opacity-60" />
                <p className="text-lg font-montserrat">No recent announcements</p>
                <p className="text-sm opacity-60">Check back later for updates</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 5000,
                        stopOnInteraction: true,
                    }),
                ]}
                className="w-full"
            >
                <CarouselContent>
                    {displayAnnouncements.map((announcement) => (
                        <CarouselItem key={announcement.id} className="md:basis-1/2 lg:basis-1/3">
                            <Link href="/announcements" className="block h-full">
                                <div className="h-full bg-gradient-to-br from-[#49515A] to-[#373C44] rounded-xl p-5 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer">
                                    {/* Image */}
                                    {announcement.image && (
                                        <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden">
                                            <Image
                                                src={announcement.image}
                                                alt={announcement.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="space-y-2">
                                        <h3 className="text-white font-bebas-neue text-xl line-clamp-2">
                                            {announcement.title}
                                        </h3>
                                        <p className="text-gray-300 font-montserrat text-sm line-clamp-3">
                                            {announcement.body}
                                        </p>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-4 flex items-center justify-between text-xs text-gray-400 font-montserrat">
                                        <span className="bg-white/10 px-2 py-1 rounded">
                                            {announcement.author.role}
                                        </span>
                                        <span>
                                            {format(new Date(announcement.createdAt), "MMM d, yyyy")}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-4 bg-white/10 border-white/20 text-white hover:bg-white/20" />
                <CarouselNext className="hidden md:flex -right-4 bg-white/10 border-white/20 text-white hover:bg-white/20" />
            </Carousel>

            {/* Indicator dots for mobile */}
            <div className="flex justify-center gap-2 mt-4 md:hidden">
                {displayAnnouncements.slice(0, 5).map((_, index) => (
                    <div
                        key={index}
                        className="w-2 h-2 rounded-full bg-white/30"
                    />
                ))}
            </div>
        </div>
    );
}

export default AnnouncementsCarousel;
