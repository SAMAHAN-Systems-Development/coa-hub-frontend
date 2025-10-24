"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const navFont = { fontFamily: "'Bebas Neue', sans-serif" };

const Navbar = () => {
  const router = useRouter();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [binsOpen, setBinsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const aboutRef = useRef<HTMLButtonElement | null>(null);
  const binsRef = useRef<HTMLButtonElement | null>(null);
  const profileRef = useRef<HTMLButtonElement | null>(null);
  const mobileRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isAdmin = true;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (!containerRef.current) return;
      if (containerRef.current.contains(target)) return;
      setAboutOpen(false);
      setBinsOpen(false);
      setProfileOpen(false);
      setMobileOpen(false);
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setAboutOpen(false);
        setBinsOpen(false);
        setProfileOpen(false);
        setMobileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <nav
      className="w-full shadow-sm relative"
      style={{
        ...navFont,
        backgroundImage: "url('assets/images/header-bg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/70 pointer-events-none"></div>
      <div className="relative max-w-7xl mx-auto flex items-center px-6 py-8">
        {/* logo */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <img
            src="assets/images/logo-dark.png"
            alt="COA Logo"
            className="w-12 h-12 rounded-full"
          />
          <span className="text-2xl tracking-wide font-bebas">
            COMMISSION ON AUDIT
          </span>
        </div>
        <div className="flex-1"></div>

        {/* nav links */}
        <div className="flex items-center gap-8 ml-0 md:ml-50">
          {/* desktop nav */}
          <ul className="hidden md:flex items-center gap-10 text-lg flex-nowrap">
            <li>
              <Link
                href="/"
                className="px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white hover:underline transition-all font-montserrat whitespace-nowrap"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/announcements"
                className="px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white hover:underline transition-all font-montserrat whitespace-nowrap"
              >
                Announcements
              </Link>
            </li>
            {/* about us dropdown */}
            <li className="relative">
              <button
                ref={aboutRef}
                id="about-button"
                aria-expanded={aboutOpen}
                aria-controls="about-menu"
                className={`flex items-center px-4 py-2 rounded-lg transition-all font-montserrat whitespace-nowrap ${
                  aboutOpen
                    ? "bg-gray-700 text-white underline"
                    : "hover:bg-gray-700 hover:text-white hover:underline"
                }`}
                type="button"
                onClick={() => setAboutOpen((prev) => !prev)}
              >
                About Us
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {aboutOpen && (
                <ul
                  id="about-menu"
                  role="menu"
                  aria-labelledby="about-button"
                  className="absolute right-0 left-auto mt-2 min-w-[220px] bg-[#e7eaef] rounded-lg shadow-lg py-2 z-10 font-montserrat"
                >
                  <li>
                    <Link
                      href="/about"
                      className="block px-4 py-2 hover:bg-[#9a9fa7] hover:text-white font-montserrat"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-[#9a9fa7] hover:text-white font-montserrat"
                    >
                      Members
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-[#9a9fa7] hover:text-white font-montserrat"
                    >
                      Log In (Admin)
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            {/* submission bins dropdown */}
            <li className="relative">
              <button
                ref={binsRef}
                id="bins-button"
                aria-expanded={binsOpen}
                aria-controls="bins-menu"
                className={`flex items-center px-4 py-2 rounded-lg transition-all font-montserrat whitespace-nowrap ${
                  binsOpen
                    ? "bg-gray-700 text-white underline"
                    : "hover:bg-gray-700 hover:text-white hover:underline"
                }`}
                type="button"
                onClick={() => setBinsOpen((prev) => !prev)}
              >
                Submission Bins
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {binsOpen && (
                <ul
                  id="bins-menu"
                  role="menu"
                  aria-labelledby="bins-button"
                  className="absolute left-1/2 -translate-x-1/2 mt-2 min-w-[260px] bg-[#e7eaef] rounded-lg shadow-lg py-2 z-10 font-montserrat"
                >
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-[#9a9fa7] hover:text-white font-montserrat"
                    >
                      Clusters
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-[#9a9fa7] hover:text-white font-montserrat"
                    >
                      Offices
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-[#9a9fa7] hover:text-white font-montserrat"
                    >
                      Departments
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-[#9a9fa7] hover:text-white font-montserrat"
                    >
                      Autonomous Commissions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-[#9a9fa7] hover:text-white font-montserrat"
                    >
                      Independent Bodies
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-[#9a9fa7] hover:text-white font-montserrat"
                    >
                      Events
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
          {/* search button */}
          <button
            className="hidden md:flex items-center justify-center p-2 rounded-full hover:bg-gray-200 transition"
            aria-label="Search"
          >
            <FaSearch className="w-6 h-6 text-gray-700" />
          </button>
          {/* user button */}
          <div className="relative hidden md:block">
            <button
              ref={profileRef}
              id="profile-button"
              aria-expanded={profileOpen}
              aria-controls="profile-menu"
              className={`flex items-center px-4 py-2 rounded-lg transition-all font-montserrat ${
                profileOpen
                  ? "bg-gray-700 text-white underline"
                  : "hover:bg-gray-700 hover:text-white hover:underline"
              }`}
              onClick={() => setProfileOpen((prev) => !prev)}
              aria-label="User menu"
            >
              <FaUserCircle className="w-6 h-6 mr-2" />
              User
              {isAdmin && (
                <span className="ml-2 px-2 py-0.5 bg-gradient-to-br from-[#373C44] to-[#49515A] text-white text-xs rounded font-bold">
                  ADMIN
                </span>
              )}
            </button>
            {profileOpen && (
              <ul
                id="profile-menu"
                role="menu"
                aria-labelledby="profile-button"
                className="absolute right-0 mt-2 min-w-[160px] bg-[#e7eaef] rounded-lg shadow-lg py-2 z-10 font-montserrat"
              >
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-[#9a9fa7] hover:text-white font-montserrat"
                    onClick={() => router.push("/logged-out")}
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            )}
          </div>
          {/* hamburger */}
          <button
            ref={mobileRef}
            type="button"
            className="md:hidden z-40 ml-4"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-8 h-8 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* mobile nav */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          role="menu"
          aria-labelledby="mobile-button"
          className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-30"
        >
          <ul className="flex flex-col gap-2 p-4 text-lg">
            <li>
              <Link
                href="/"
                className="block px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white hover:underline transition-all font-montserrat"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/announcements"
                className="block px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white hover:underline transition-all font-montserrat"
                onClick={() => setMobileOpen(false)}
              >
                Announcements
              </Link>
            </li>
            <li>
              <button
                className="flex items-center w-full px-4 py-2 rounded-lg transition-all font-montserrat hover:bg-gray-700 hover:text-white hover:underline"
                type="button"
                onClick={() => setAboutOpen((prev) => !prev)}
              >
                About Us
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {aboutOpen && (
                <ul
                  role="menu"
                  className="ml-4 mt-1 bg-[#e7eaef] rounded-lg shadow-lg py-2 font-montserrat"
                >
                  <li>
                    <Link
                      href="/about"
                      className="block px-4 py-2 hover:bg-[#9a9fa7] hover:text-white font-montserrat"
                      onClick={() => setMobileOpen(false)}
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-[#9a9fa7] hover:text-white font-montserrat"
                      onClick={() => setMobileOpen(false)}
                    >
                      Members
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-[#9a9fa7] hover:text-white font-montserrat"
                      onClick={() => setMobileOpen(false)}
                    >
                      Log In (Admin)
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                className="flex items-center w-full px-4 py-2 rounded-lg transition-all font-montserrat hover:bg-gray-700 hover:text-white hover:underline"
                type="button"
                onClick={() => setBinsOpen((prev) => !prev)}
              >
                Submission Bins
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {binsOpen && (
                <ul
                  role="menu"
                  className="ml-4 mt-1 bg-[#e7eaef] rounded-lg shadow-lg py-2 font-montserrat"
                >
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-[#9a9fa7] hover:text-white font-montserrat"
                      onClick={() => setMobileOpen(false)}
                    >
                      Clusters
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-[#9a9fa7] hover:text-white font-montserrat"
                      onClick={() => setMobileOpen(false)}
                    >
                      Offices
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-[#9a9fa7] hover:text-white font-montserrat"
                      onClick={() => setMobileOpen(false)}
                    >
                      Departments
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-[#9a9fa7] hover:text-white font-montserrat"
                      onClick={() => setMobileOpen(false)}
                    >
                      Autonomous Commissions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-[#9a9fa7] hover:text-white font-montserrat"
                      onClick={() => setMobileOpen(false)}
                    >
                      Independent Bodies
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-[#9a9fa7] hover:text-white font-montserrat"
                      onClick={() => setMobileOpen(false)}
                    >
                      Events
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
