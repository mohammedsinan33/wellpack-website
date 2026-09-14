"use client";



import Image from "next/image";
import Link from "next/link";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function Hero() {

  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
  if (!heroRef.current || !headingRef.current) return;

  const ctx = gsap.context(() => {
    // Split heading into characters
    const split = SplitText.create(headingRef.current!, {
      type: "chars",
      charsClass: "hero-char",
    });

    // Initial states
    gsap.set(
      [
        ".hero-eyebrow",
        ".hero-divider",
        ".hero-description",
        ".hero-cta",
        ".hero-right-message",
        ".hero-slider",
        ".hero-scroll",
      ],
      {
        opacity: 0,
        y: 30,
      }
    );

    gsap.set(".hero-char", {
      opacity: 0,
      scale: 0,
      y: 80,
      rotationX: 180,
      transformOrigin: "0% 50% -50px",
    });

    // Main timeline
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    // 1. Eyebrow
    tl.to(".hero-eyebrow", {
      opacity: 1,
      y: 0,
      duration: 0.55,
    })

      // 2. Heading
      .to(
        ".hero-char",
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotationX: 0,
          duration: 0.9,
          stagger: 0.045,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      )

      // 3. Divider
      .to(
        ".hero-divider",
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
        },
        "-=0.45"
      )

      // 4. Description
      .to(
        ".hero-description",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.2"
      )

      // 5. CTA
      .to(
        ".hero-cta",
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
        },
        "-=0.3"
      )

      // 6. Right-side text
      .to(
        ".hero-right-message",
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
        },
        "-=0.25"
      )

      // 7. Slider
      .to(
        ".hero-slider",
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
        },
        "-=0.2"
      )

      // 8. Scroll indicator
      .to(
        ".hero-scroll",
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
        },
        "-=0.2"
      );

    // Revert SplitText when component is destroyed
    return () => {
      split.revert();
    };
  }, heroRef);

  return () => ctx.revert();
}, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="hero-section relative min-h-[100svh] w-full overflow-hidden bg-[#f5ede2]"
    >
      {/* Hero Background */}
      <div className="hero-background absolute inset-0">
        <Image
          src="/images/wellpack-hero-bg.png"
          alt="Wellpack packaging boxes"
          fill
          priority
          quality={100}

          className="hero-image object-cover object-[58%_center]"
        />

        {/* Very subtle overlay to keep text readable */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(72,48,32,0.16),rgba(109,75,45,0.06),rgba(35,28,22,0.14))]" />
      </div>

      {/* Decorative diagonal brand shape */}
      <div
        className="
          pointer-events-none
          absolute
          -right-[-20%]
          top-[-25%]
          hidden
          h-[85%]
          w-[8%]
          bg-[#30485b]/40
          lg:block
          hero-diagonal-slate
        "
      />

      {/* Orange decorative shape */}
      <div
        className="
          pointer-events-none
          absolute
          -right-[0%]
          top-[30%]
          hidden
          h-[60%]
          w-[9%]
          bg-[#f26522]/85
          lg:block
          hero-diagonal-orange
        "
      />

      <div className="hero-box-layer pointer-events-none absolute inset-0 z-[20]">
        <Image
          src="/images/wellpack-hero-box.png"
          alt="Wellpack packaging boxes"
          fill
          priority
          quality={100}
          className="object-contain object-center"
        />

      </div>

      {/* Hero Content */}
      <div className="hero-content relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] items-center px-6 pt-16 sm:px-8 lg:px-12 xl:px-20">
        <div className="w-full max-w-[570px]">

          {/* Eyebrow */}
          <div className="hero-eyebrow mb-6 overflow-hidden">
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.38em]
                text-[#30485b]
                sm:text-[11px]
              "
            >
              Packaging A Better Tomorrow
            </p>
          </div>

          {/* Main Heading */}
          <h1
            ref={headingRef}
            className="
    font-heading
    text-[clamp(3rem,5vw,5.5rem)]
    font-extrabold
    leading-[0.88]
    tracking-[-0.055em]
    text-[#15252e]
  "
          >
            <span className="block">Ideas</span>
            <span className="block">Packed</span>
            <span className="block text-[#f26522]">
              Better.
            </span>
          </h1>

          {/* Small Divider */}
          <div className="hero-divider my-7 h-[2px] w-12 bg-[#15252e]/50" />

          {/* Description */}
          <p
            className="
              max-w-[430px]
              text-[15px]
              font-normal
              leading-[1.65]
              text-[#15252e]/85
              sm:text-[16px]
               hero-description
            "
          >
            High-quality corrugated and packaging
            solutions for businesses that move forward.
          </p>

          {/* CTA */}
          <Link
            href="#products"
            className="
              group
              mt-9
              inline-flex
              items-center
              gap-4
              text-[13px]
              font-semibold
              text-[#15252e]
              hero-cta
            "
          >
            {/* Orange Circle */}
            <span
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-[#f26522]
                text-xl
                text-white
                transition-all
                duration-300
                group-hover:translate-x-1
                group-hover:shadow-[0_8px_25px_rgba(242,101,34,0.25)]
              "
            >
              →
            </span>

            <span className="transition-colors duration-300 group-hover:text-[#f26522]">
              Explore Our Products
            </span>
          </Link>
        </div>
      </div>

      {/* Right Side Message */}
      <div
        className="
          hero-right-message
          absolute
          right-[5%]
          top-[27%]
          z-10
          hidden
          w-[145px]
          xl:block
        "
      >
        <p
          className="
            text-[10px]
            font-medium
            uppercase
            leading-[1.8]
            tracking-[0.25em]
            text-[#15252e]
          "
        >
          Packaging
          <br />
          Solutions
          <br />
          For A Brighter
          <br />
          Tomorrow
        </p>

        <div className="mt-5 h-[1px] w-12 bg-[#15252e]" />
      </div>

      {/* Hero Slider Indicator */}
      <div
        className="
          hero-slider
          absolute
          bottom-8
          left-6
          z-10
          flex
          items-center
          gap-6
          sm:left-10
          lg:left-16
          xl:left-20
        "
      >
        <div className="flex items-center gap-6">
          {/* Active */}
          <div className="relative">
            <span className="text-[12px] font-semibold text-[#15252e]">
              01
            </span>

            <span className="absolute -bottom-3 left-0 h-[2px] w-7 bg-[#f26522]" />
          </div>

          {/* Inactive */}
          <span className="text-[12px] text-[#15252e]/45">
            02
          </span>

          <span className="text-[12px] text-[#15252e]/45">
            03
          </span>
        </div>
      </div>

      {/* Scroll Down */}
      <div
        className="
          absolute
          bottom-8
          right-6
          z-10
          hidden
          items-center
          gap-3
          sm:flex
          lg:right-16
          xl:right-20
        "
      >
        <span
          className="
            text-[9px]
            font-medium
            uppercase
            tracking-[0.18em]
            text-[#15252e]/70
          "
        >
          Scroll Down
        </span>

        <span className="text-sm text-[#15252e]">
          ↓
        </span>
      </div>
    </section>
  );
}