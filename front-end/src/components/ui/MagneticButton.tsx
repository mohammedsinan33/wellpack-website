"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function MagneticButton({
  href,
  children,
  className = "",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const flairRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
  const button = buttonRef.current;
  const flair = flairRef.current;

  if (!button || !flair) return;
  // if (!window.matchMedia("(hover: hover)").matches) return;

  const getPosition = (event: PointerEvent) => {
    const rect = button.getBoundingClientRect();

    return {
      x: ((event.clientX - rect.left) / rect.width) * 100 - 50,
      y: ((event.clientY - rect.top) / rect.height) * 100 - 50,
    };
  };

  const handlePointerEnter = (event: PointerEvent) => {
    const { x, y } = getPosition(event);

    gsap.set(flair, {
      xPercent: x,
      yPercent: y,
      duration: 1.2,
      scale: 1,
    });
  };

  const handlePointerMove = (event: PointerEvent) => {
    const { x, y } = getPosition(event);

    gsap.to(flair, {
      xPercent: x,
      yPercent: y,
      duration: 1.2,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handlePointerLeave = () => {
    gsap.to(flair, {
      scale: 0,
      duration: 1.2,
      ease: "power2.inOut",
      overwrite: true,
    });
  };

  button.addEventListener("pointerenter", handlePointerEnter);
  button.addEventListener("pointermove", handlePointerMove);
  button.addEventListener("pointerleave", handlePointerLeave);

  return () => {
    button.removeEventListener("pointerenter", handlePointerEnter);
    button.removeEventListener("pointermove", handlePointerMove);
    button.removeEventListener("pointerleave", handlePointerLeave);
    gsap.killTweensOf(flair);
  };
}, []);

  return (
    <Link
      ref={buttonRef}
      href={href}
      data-block="button"
      className={`wp-magnetic-button ${className}`}
    >
      {/* Flair — now has its own ref */}
      <span
        ref={flairRef}
        className="wp-magnetic-button__flair"
        aria-hidden="true"
      />

      {/* Label */}
      <span className="wp-magnetic-button__label">
        {children}
      </span>
    </Link>
  );
}