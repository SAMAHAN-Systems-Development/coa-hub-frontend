"use client";
import Link from "next/link";
import { LuFacebook, LuTwitter, LuInstagram } from "react-icons/lu";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-[#373C44] to-[#49515A] text-white py-12 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start">
        <div>
          <span
            className="text-2xl tracking-wide text-[#E7EAEF]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            COMMISSION ON AUDIT
          </span>
          <hr className="my-4 border-gray-400" />
          <ul className="my-4 border-gray-400">
            <li>
              <Link
                href="/"
                className="font-montserrat text-lg hover:underline hover:underline-offset-4 transition-all"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-montserrat text-lg hover:underline hover:underline-offset-4 transition-all"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-montserrat text-lg hover:underline hover:underline-offset-4 transition-all"
              >
                Announcements
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-montserrat text-lg hover:underline hover:underline-offset-4 transition-all"
              >
                Submission Bins
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="font-montserrat text-lg hover:underline hover:underline-offset-4 transition-all"
              >
                Members
              </Link>
            </li>
          </ul>
          <div className="flex gap-4 mt-8">
            <a href="#" aria-label="Facebook">
              <LuFacebook className="w-7 h-7" />
            </a>
            <a href="#" aria-label="Twitter">
              <LuTwitter className="w-7 h-7" />
            </a>
            <a href="#" aria-label="Instagram">
              <LuInstagram className="w-7 h-7" />
            </a>
          </div>
        </div>
        <div className="mt-12 md:mt-0 flex justify-center items-center w-full md:w-auto">
          <img
            src="assets/images/footer-logo.png"
            alt="COA Footer Logo"
            className="w-72 h-auto"
          />
        </div>
      </div>
    </footer>
  );
}
