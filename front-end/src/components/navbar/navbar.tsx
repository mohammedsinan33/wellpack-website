"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  /*
   * Keep the previous scroll position in a ref.
   *
   * Using a ref prevents a state update on every
   * scroll event.
   */
  const lastScrollY = useRef(0);

  /*
   * Prevent tiny scroll movements from constantly
   * showing/hiding the navbar.
   */
  const scrollThreshold = 5;

  // ============================================================
  // NAVBAR SHOW / HIDE ON SCROLL DIRECTION
  // ============================================================

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      /*
       * ========================================================
       * AT THE TOP
       * ========================================================
       *
       * Always show navbar when the user reaches the
       * very top of the website.
       */

      if (currentScrollY <= 10) {
        setIsNavbarVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      /*
       * Calculate scroll movement.
       */
      const difference =
        currentScrollY - lastScrollY.current;

      /*
       * Ignore very small movements.
       */
      if (Math.abs(difference) < scrollThreshold) {
        return;
      }

      /*
       * ========================================================
       * SCROLLING DOWN
       * ========================================================
       *
       * Hide navbar immediately.
       */

      if (difference > 0) {
        setIsNavbarVisible(false);

        /*
         * Close mobile menu when scrolling down.
         */
        setIsMenuOpen(false);
      }

      /*
       * ========================================================
       * SCROLLING UP
       * ========================================================
       *
       * Show navbar.
       */

      else {
        setIsNavbarVisible(true);
      }

      /*
       * Store current position.
       */
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  // ============================================================
  // CLOSE MENU WHEN ESCAPE IS PRESSED
  // ============================================================

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  // ============================================================
  // BODY SCROLL LOCK WHEN MOBILE MENU IS OPEN
  // ============================================================

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <header
      className={`
        fixed
        left-0
        top-0
        z-50
        w-full

        transition-transform
        duration-500
        ease-[cubic-bezier(0.4,0,0.2,1)]

        ${
          isNavbarVisible
            ? "translate-y-0"
            : "-translate-y-full"
        }
      `}
    >
      <div
        className="
          mx-auto
          flex
          h-[72px]
          max-w-[1440px]
          items-center
          justify-between
          px-6
          md:px-10
          lg:px-12
          xl:px-16
        "
      >
        {/* ======================================================
            LOGO
        ====================================================== */}

        <Link
          href="#home"
          className="
            relative
            block
            h-[38px]
            w-[140px]
          "
          onClick={() => {
            setIsMenuOpen(false);
            setIsNavbarVisible(true);
          }}
        >
          <Image
            src="/logos/wellpac-navbar-logo.png"
            alt="Wellpack Industries"
            fill
            priority
            className="
              object-contain
              object-left
            "
          />
        </Link>

        {/* ======================================================
            DESKTOP NAVIGATION
        ====================================================== */}

        <nav
          className="
            hidden
            items-center
            gap-8
            lg:flex
          "
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className="
                group
                relative
                py-2
                text-[12px]
                font-medium
                tracking-[-0.01em]
                text-[#18252d]
                transition-colors
                duration-300
                hover:text-[#f26522]
              "
            >
              {link.name}

              {/* ==================================================
                  ACTIVE HOME UNDERLINE
              ================================================== */}

              {index === 0 && (
                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-full
                    bg-[#f26522]
                  "
                />
              )}

              {/* ==================================================
                  HOVER UNDERLINE
              ================================================== */}

              {index !== 0 && (
                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-0
                    bg-[#f26522]
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />
              )}
            </Link>
          ))}
        </nav>

        {/* ======================================================
            RIGHT SIDE
        ====================================================== */}

        <div className="flex items-center gap-4">
          {/* ====================================================
              QUOTE BUTTON
          ==================================================== */}

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

          {/* ====================================================
              MOBILE MENU BUTTON
          ==================================================== */}

          <button
            type="button"
            aria-label={
              isMenuOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={isMenuOpen}
            onClick={() =>
              setIsMenuOpen((prev) => !prev)
            }
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              lg:hidden
            "
          >
            <div
              className="
                flex
                w-[21px]
                flex-col
                gap-[5px]
              "
            >
              {/* Top */}
              <span
                className={`
                  block
                  h-[1px]
                  w-full
                  bg-[#18252d]
                  transition-transform
                  duration-300
                  ${
                    isMenuOpen
                      ? "translate-y-[6px] rotate-45"
                      : ""
                  }
                `}
              />

              {/* Middle */}
              <span
                className={`
                  block
                  h-[1px]
                  w-full
                  bg-[#18252d]
                  transition-opacity
                  duration-300
                  ${
                    isMenuOpen
                      ? "opacity-0"
                      : "opacity-100"
                  }
                `}
              />

              {/* Bottom */}
              <span
                className={`
                  block
                  h-[1px]
                  w-full
                  bg-[#18252d]
                  transition-transform
                  duration-300
                  ${
                    isMenuOpen
                      ? "-translate-y-[6px] -rotate-45"
                      : ""
                  }
                `}
              />
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================
          MOBILE NAVIGATION
      ======================================================== */}

      <div
        className={`
          absolute
          left-0
          top-[72px]
          w-full
          border-t
          border-black/5
          bg-[#f5f2eb]/95
          backdrop-blur-xl
          transition-all
          duration-300
          lg:hidden

          ${
            isMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-3 opacity-0"
          }
        `}
      >
        <nav className="flex flex-col px-6 py-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() =>
                setIsMenuOpen(false)
              }
              className="
                border-b
                border-black/5
                py-4
                text-sm
                font-medium
                text-[#18252d]
                transition-colors
                hover:text-[#f26522]
              "
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="#contact"
            onClick={() =>
              setIsMenuOpen(false)
            }
            className="
              mt-5
              flex
              items-center
              justify-center
              gap-3
              rounded-md
              bg-[#f26522]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
            "
          >
            Get a Quote
            <span>→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}