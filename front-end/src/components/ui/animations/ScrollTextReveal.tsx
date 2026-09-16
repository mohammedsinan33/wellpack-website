"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

interface CharacterProps {
  char: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

interface ScrollTextRevealProps {
  text: string;
  scrollYProgress: MotionValue<number>;
  className?: string;
}

function Character({
  char,
  index,
  total,
  scrollYProgress,
}: CharacterProps) {
  const isSpace = char === " ";

  // ─────────────────────────────────────────────────────────────
  // FIX: instead of distanceFromCenter (which makes outer chars
  // travel 10-20x further than inner chars and never fully land),
  // we give each character its own staggered input range.
  //
  // Character 0 finishes first (at 60% scroll),
  // last character finishes last (at 100% scroll).
  // Every char travels the same distance — only timing differs.
  // This means ALL chars are settled by scroll = 1.0, always,
  // regardless of word length or screen size.
  // ─────────────────────────────────────────────────────────────

  const centerIndex = total / 2;
  const distanceFromCenter = index - centerIndex;

  // Each char starts at a fixed offset based on its side
  const startX = distanceFromCenter < 0 ? -60 : distanceFromCenter > 0 ? 60 : 0;
  const startRotateX = distanceFromCenter * 8;

  // Stagger: chars near center animate slightly earlier
  const staggerOffset = (Math.abs(distanceFromCenter) / (total / 2)) * 0.3;
  const rangeStart = staggerOffset * 0.5;
  const rangeEnd = 0.6 + staggerOffset * 0.4;

  const x = useTransform(scrollYProgress, [rangeStart, rangeEnd], [startX, 0]);
  const rotateX = useTransform(scrollYProgress, [rangeStart, rangeEnd], [startRotateX, 0]);
  const opacity = useTransform(scrollYProgress, [rangeStart, rangeStart + 0.1], [0, 1]);

  return (
    <motion.span
      className={isSpace ? "inline-block w-[0.25em]" : "inline-block"}
      style={{ x, rotateX, opacity }}
    >
      {char}
    </motion.span>
  );
}

export default function ScrollTextReveal({
  text,
  scrollYProgress,
  className = "",
}: ScrollTextRevealProps) {
  const characters = text.split("");

  return (
    <span className={className}>
      {characters.map((char, index) => (
        <Character
          key={`${char}-${index}`}
          char={char}
          index={index}
          total={characters.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </span>
  );
}