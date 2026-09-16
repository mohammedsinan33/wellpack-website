"use client";

import {
  motion,
  AnimatePresence,
  type HTMLMotionProps,
} from "framer-motion";
import { ReactNode } from "react";

interface ProductExpandProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  isActive?: boolean;
  overlay?: boolean;
}

export default function ProductExpand({
  children,
  isActive = false,
  overlay = false,
  className = "",
  ...props
}: ProductExpandProps) {
  return (
    <motion.div
      layout
      initial={false}
      animate={{
        flexGrow: isActive ? 1.45 : 1,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {overlay && (
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="
                pointer-events-none
                absolute
                inset-0
                z-10
                bg-gradient-to-t
                from-[#15252e]/30
                via-transparent
                to-transparent
              "
            />
          )}
        </AnimatePresence>
      )}

      {children}
    </motion.div>
  );
}