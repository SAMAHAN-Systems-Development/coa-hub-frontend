"use client";

import { useState } from "react";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import AnnouncementCard from "@/components/announcements/AnnouncementCard";
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";

//mock data for testing lang
const mockAnnouncements = [
  {
    id: "1",
    author: {
      name: "John Doe",
      avatar: undefined,
    },
    createdAt: "2025-08-05T22:00:00Z",
    title: "ANNOUNCEMENT TITLE",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image: undefined,
    category: "HEAD_COMMISSIONER" as const,
  },
  {
    id: "2",
    author: {
      name: "John Doe",
      avatar: undefined,
    },
    createdAt: "2025-08-04T15:30:00Z",
    title: "ANNOUNCEMENT TITLE",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: undefined,
    category: "HEAD_COMMISSIONER" as const,
  },
  {
    id: "3",
    author: {
      name: "Jane Smith",
      avatar: undefined,
    },
    createdAt: "2025-08-03T10:00:00Z",
    title: "IMPORTANT UPDATE",
    body: "This is another announcement with important information for all students.",
    image: undefined,
    category: "OTHER" as const,
  },
];

export default function AnnoncementsPage() {
  const [headCommissionerExpanded, setHeadCommissionerExpanded] =
    useState(false);
  const [otherAnnouncementsExpanded, setOtherAnnouncementsExpanded] =
    useState(false);

  //filter announcement by category

  const headCommissionerAnnouncements = mockAnnouncements.filter(
    (ann) => ann.category === "HEAD_COMMISSIONER"
  );
  const otherAnnouncements = mockAnnouncements.filter(
    (ann) => ann.category === "OTHER"
  );

  return (
    <LayoutWrapper>
      {/* hero - full screen */}
      <section className="relative h-[50vh] sm:h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#6C7178] to-[#373C44] rounded-b-3xl sm:rounded-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-lg text-[#E7EAEF] uppercase tracking-wide"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Announcements
          </h1>
        </div>
      </section>

      {/* main content */}
      <div className="min-h-screen bg-white py-8 sm:py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* From the Head Commissioner Section */}
          <section className="mb-6">
            {/*  the collapsible header */}
            <div className="w-full flex items-center justify-between sm:border-b-2 sm:border-gray-900 sm:pb-4 lg:pb-5 border-b-0 bg-gradient-to-r from-[#6C7178] to-[#49515A] sm:bg-none rounded-lg sm:rounded-none p-4 sm:p-0">
              <button
                onClick={() =>
                  setHeadCommissionerExpanded(!headCommissionerExpanded)
                }
                className="flex items-center gap-3 sm:gap-4 lg:gap-5 hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center justify-center">
                  {headCommissionerExpanded ? (
                    <IoChevronUpSharp className="h-5 w-5 sm:h-8 sm:w-8 lg:w-9 lg:h-9 text-white sm:text-gray-900" />
                  ) : (
                    <IoChevronDownSharp className="h-5 w-5 sm:h-8 sm:w-8 lg:w-9 lg:h-9 text-white sm:text-gray-900" />
                  )}
                </div>
                {/* Mobile layout */}
                <div className="flex flex-col justify-center sm:hidden text-left">
                  <div
                    className="text-xl uppercase tracking-wider leading-none"
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      color: "#E7EAEF",
                    }}
                  >
                    From the
                  </div>
                  <h2
                    className="text-3xl font-normal uppercase tracking-wide leading-none mt-1"
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      color: "#E7EAEF",
                    }}
                  >
                    Head Commissioner
                  </h2>
                </div>
                {/* Desktop layout */}
                <h2 className="hidden sm:block text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 uppercase tracking-wide">
                  From the Head Commissioner
                </h2>
              </button>
            </div>

            {/* expandable content */}
            {headCommissionerExpanded && (
              <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
                {headCommissionerAnnouncements.length > 0 ? (
                  headCommissionerAnnouncements.map((announcement) => (
                    <AnnouncementCard
                      key={announcement.id}
                      announcement={announcement}
                      variant="public"
                      isExpanded={true}
                    />
                  ))
                ) : (
                  <div className="p-8 bg-gray-50 rounded-lg text-center border border-gray-200">
                    <p className="text-gray-500">
                      No announcements from the Head Commissioner yet.
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>
          {/* other announcements section */}
          <section className="mb-6">
            <div className="w-full flex items-center justify-between sm:border-b-2 sm:border-gray-900 sm:pb-4 lg:pb-5 border-b-0 bg-gradient-to-r from-[#6C7178] to-[#49515A] sm:bg-none rounded-lg sm:rounded-none p-4 sm:p-0">
              <button
                onClick={() =>
                  setOtherAnnouncementsExpanded(!otherAnnouncementsExpanded)
                }
                className="flex items-center gap-3 sm:gap-4 lg:gap-5 hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center justify-center">
                  {otherAnnouncementsExpanded ? (
                    <IoChevronUpSharp className="h-5 w-5 sm:h-8 sm:w-8 lg:w-9 lg:h-9 text-white sm:text-gray-900" />
                  ) : (
                    <IoChevronDownSharp className="h-5 w-5 sm:h-8 sm:w-8 lg:w-9 lg:h-9 text-white sm:text-gray-900" />
                  )}
                </div>
                {/* Mobile layout */}
                <div className="flex flex-col justify-center sm:hidden text-left">
                  <h2
                    className="text-xl font-normal uppercase tracking-wide leading-none"
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      color: "#E7EAEF",
                    }}
                  >
                    Other
                  </h2>
                  <h2
                    className="text-3xl font-normal uppercase tracking-wide leading-none"
                    style={{
                      fontFamily: "Bebas Neue, sans-serif",
                      color: "#E7EAEF",
                    }}
                  >
                    Announcements
                  </h2>
                </div>
                {/* Desktop layout */}
                <h2 className="hidden sm:block text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 uppercase tracking-wide">
                  Other Announcements
                </h2>
              </button>
            </div>

            {/* expandable content */}
            {otherAnnouncementsExpanded && (
              <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
                {otherAnnouncements.length > 0 ? (
                  otherAnnouncements.map((announcement) => (
                    <AnnouncementCard
                      key={announcement.id}
                      announcement={announcement}
                      variant="public"
                      isExpanded={true}
                    />
                  ))
                ) : (
                  <div className="p-8 bg-gray-50 rounded-lg text-center border border-gray-200">
                    <p className="text-gray-500">No other announcements yet.</p>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* empty state - show only if no announcements */}
          {mockAnnouncements.length === 0 && (
            <div className="text-center py-16 sm:py-20 bg-gray-50 rounded-lg border border-gray-200">
              <div className="max-w-md mx-auto px-4">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  No Announcements Yet
                </h3>
                <p className="text-base sm:text-lg text-gray-600">
                  Check back later for updates and announcements.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}
