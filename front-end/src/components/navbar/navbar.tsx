"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import MagneticButton from "../ui/buttons/MagneticButton";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Products", href: "#products" },
  { name: "About", href: "#about" },
  { name: "Why Us", href: "#why-us" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-12 xl:px-16">

        {/* Logo */}
        <Link
          href="#home"
          className="relative block h-[38px] w-[140px]"
        >
          <Image
            src="/logos/wellpac-navbar-logo.png"
            alt="Wellpack Industries"
            fill
            priority
            className="object-contain object-left"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className={`group relative py-2 text-[12px] font-medium tracking-[-0.01em] text-[#18252d] transition-colors duration-300 hover:text-[#f26522] ${
                index === 0 ? "text-[#18252d]" : ""
              }`}
            >
              {link.name}

              {/* Active underline */}
              {index === 0 && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#f26522]" />
              )}

              {/* Hover underline */}
              {index !== 0 && (
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#f26522] transition-all duration-300 group-hover:w-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Quote Button */}
         <MagneticButton
  href="#contact"
  className="
    hidden
    px-5
    py-4
    text-[15px]
    font-semibold
    sm:inline-flex
    wp-magnetic-button--orange
  "
>
  <span>Get a Quote</span>
</MagneticButton>

          {/* Mobile Menu */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <div className="flex w-[21px] flex-col gap-[5px]">
              <span
                className={`block h-[1px] w-full bg-[#18252d] transition-transform duration-300 ${
                  isMenuOpen ? "translate-y-[3px] rotate-45" : ""
                }`}
              />

              <span
                className={`block h-[1px] w-full bg-[#18252d] transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />

              <span
                className={`block h-[1px] w-full bg-[#18252d] transition-transform duration-300 ${
                  isMenuOpen ? "-translate-y-[9px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`absolute left-0 top-[72px] w-full border-t border-black/5 bg-[#f5f2eb]/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="border-b border-black/5 py-4 text-sm font-medium text-[#18252d] transition-colors hover:text-[#f26522]"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-5 flex items-center justify-center gap-3 rounded-md bg-[#f26522] px-5 py-3 text-sm font-semibold text-white"
          >
            Get a Quote
            <span>→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}