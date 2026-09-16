"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import MagneticButton from "@/components/ui/buttons/MagneticButton";

interface ProductCardProps {
  name: string;
  description: string;
  smallDescription: string;
  image: string;

  category: string;
  features: string[];
  applications: string[];

  isActive?: boolean;
  hasActiveProduct?: boolean;

  onHoverStart?: () => void;
  onClick?: () => void;
}

const smoothEase = [0.16, 1, 0.3, 1] as const;

export default function ProductCard({
  name,
  description,
  smallDescription,
  image,
  category,
  features,
  applications,
  isActive = false,
  hasActiveProduct = false,
  onHoverStart,
  onClick,
}: ProductCardProps) {
  const isCollapsed = hasActiveProduct && !isActive;

  return (
    <motion.article
      layout
      initial={false}
      animate={{
        flexGrow: isActive ? 18 : 1,
        flexShrink: 1,
        flexBasis: 0,
      }}
      transition={{
        duration: 1.9,
        ease: smoothEase,
      }}
      onMouseEnter={onHoverStart}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.();
        }
      }}
      className="
  group
  relative
  h-[430px]
  min-h-[430px]
  w-full
  min-w-0
  !basis-auto
  !shrink-0
  cursor-pointer
  overflow-hidden
  rounded-[8px]
  border
  border-[#e5e3dd]
  bg-[#faf9f5]
  focus:outline-none
  lg:!basis-0
"
    >
      {/* =========================================
    IMAGE AREA
    Image stays attached to LEFT side
========================================= */}

      <motion.div
        initial={false}
        animate={{
          width: isActive ? "40%" : "100%",
        }}
        transition={{
          duration: 1.9,
          ease: smoothEase,
        }}
        className="
    absolute
    inset-y-0
    left-0
    z-10
    overflow-hidden
    bg-[#f1eee8]
  "
      >
        <div
          className="
      absolute
      inset-0
      flex
      items-center
      justify-center
    "
        >
          <div
            className="
        relative
        h-[68%]
        w-[78%]
        max-h-[340px]
        max-w-[360px]
      "
          >
            <Image
              src={image}
              alt={name}
              fill
              sizes="360px"
              className="object-contain"
            />
          </div>
        </div>

        {/* CATEGORY */}

        <motion.div
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 10,
          }}
          transition={{
            duration: 0.8,
            delay: isActive ? 0.55 : 0,
            ease: smoothEase,
          }}
          className="
      absolute
      bottom-5
      left-5
      rounded-full
      bg-white/85
      px-4
      py-2
      text-[8px]
      font-semibold
      uppercase
      tracking-[0.22em]
      text-[#566168]
      backdrop-blur-sm
    "
        >
          {category}
        </motion.div>
      </motion.div>

      {/* =====================================================
          COLLAPSED CARD LABEL

          NO IMAGE HERE.
          Only the product name remains.
      ====================================================== */}

      <motion.div
        initial={false}
        animate={{
          opacity: isCollapsed ? 1 : 0,
        }}
        transition={{
          duration: 0.9,
          ease: smoothEase,
        }}
        className="
          pointer-events-none
          absolute
          inset-0
          z-20
          flex
          items-center
          justify-center
          bg-[#faf9f5]
        "
      >
        <motion.span
          initial={false}
          animate={{
            rotate: isCollapsed ? -90 : 0,
            scale: isCollapsed ? 1 : 0.9,
          }}
          transition={{
            duration: 1.35,
            delay: isCollapsed ? 0.18 : 0,
            ease: smoothEase,
          }}
          className="
            whitespace-nowrap
            text-[16px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-[#15252e]
          "
        >
          {name}
        </motion.span>
      </motion.div>

      {/* =====================================================
          NORMAL BOTTOM INFORMATION

          Visible only before a product is active.
      ====================================================== */}

      <motion.div
        initial={false}
        animate={{
          opacity: hasActiveProduct ? 0 : 1,
          y: hasActiveProduct ? 8 : 0,
        }}
        transition={{
          duration: 1,
          ease: smoothEase,
        }}
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-10
          flex
          h-[78px]
          items-center
          justify-between
          border-t
          border-[#eceae5]
          bg-white
          px-5
        "
      >
        <div className="min-w-0">
          <h3
            className="
              font-heading
              truncate
              text-[14px]
              font-bold
              leading-tight
              tracking-[-0.02em]
              text-[#15252e]
            "
          >
            {name}
          </h3>

          <p
            className="
              mt-1
              truncate
              text-[10px]
              leading-[1.4]
              text-[#7b8387]
            "
          >
            {smallDescription}
          </p>
        </div>

        <span
          className="
            ml-3
            flex
            h-[30px]
            w-[30px]
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[#d7dadd]
            text-[16px]
            text-[#15252e]
          "
        >
          →
        </span>
      </motion.div>

      {/* =====================================================
          EXPANDED DETAILS

          Always positioned on the RIGHT.
          It simply reveals after the card expands.
      ====================================================== */}

      <motion.div
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0,
          x: isActive ? 0 : 45,
        }}
        transition={{
          duration: 1.25,
          delay: isActive ? 0.42 : 0,
          ease: smoothEase,
        }}
        className="
          pointer-events-auto
          absolute
          bottom-0
          right-0
          top-0
          z-30
          w-[60%]
          overflow-hidden
          bg-[#faf9f5]
        "
      >
        <div
          className="
            flex
            h-full
            flex-col
            justify-center
            overflow-hidden
            px-7
            py-8
            sm:px-8
            lg:px-10
            lg:py-10
          "
        >
          {/* LABEL */}

          <motion.div
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 14,
            }}
            transition={{
              duration: 0.8,
              delay: isActive ? 0.48 : 0,
              ease: smoothEase,
            }}
            className="mb-4 flex items-center gap-3"
          >
            <span className="h-[2px] w-5 shrink-0 bg-[#f26522]" />

            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.35em]
                text-[#6a7377]
              "
            >
              Product Details
            </span>
          </motion.div>

          {/* TITLE */}

          <motion.h2
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 20,
            }}
            transition={{
              duration: 0.9,
              delay: isActive ? 0.54 : 0,
              ease: smoothEase,
            }}
            className="
              font-heading
              text-[clamp(1.8rem,3vw,3rem)]
              font-extrabold
              leading-[0.98]
              tracking-[-0.05em]
              text-[#15252e]
            "
          >
            {name}
          </motion.h2>

          {/* DESCRIPTION */}

          <motion.p
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 18,
            }}
            transition={{
              duration: 0.9,
              delay: isActive ? 0.62 : 0,
              ease: smoothEase,
            }}
            className="
              mt-5
              max-w-[520px]
              text-[11px]
              leading-[1.7]
              text-[#687277]
              sm:text-[12px]
              lg:text-[13px]
            "
          >
            {description}
          </motion.p>

          {/* FEATURES */}

          <motion.div
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 18,
            }}
            transition={{
              duration: 0.9,
              delay: isActive ? 0.7 : 0,
              ease: smoothEase,
            }}
            className="mt-6"
          >
            <h3
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#15252e]
              "
            >
              Key Features
            </h3>

            <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="
                    flex
                    items-center
                    gap-2
                    text-[10px]
                    text-[#626c70]
                  "
                >
                  <span className="shrink-0 text-[#f26522]">
                    ✓
                  </span>

                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* APPLICATIONS */}

          <motion.div
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 16,
            }}
            transition={{
              duration: 0.9,
              delay: isActive ? 0.78 : 0,
              ease: smoothEase,
            }}
            className="mt-6"
          >
            <h3
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#15252e]
              "
            >
              Suitable For
            </h3>

            <div className="mt-3 flex flex-wrap gap-2">
              {applications.map((application) => (
                <span
                  key={application}
                  className="
                    rounded-full
                    border
                    border-[#ddd9d1]
                    bg-white
                    px-3
                    py-1.5
                    text-[9px]
                    text-[#687277]
                  "
                >
                  {application}
                </span>
              ))}
            </div>
          </motion.div>

          {/* GET A QUOTE */}

          <motion.div
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              y: isActive ? 0 : 14,
            }}
            transition={{
              duration: 0.85,
              delay: isActive ? 0.9 : 0,
              ease: smoothEase,
            }}
            className="pointer-events-auto mt-7"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <MagneticButton
              href="#contact"
              className="
                wp-magnetic-button--dark
                px-6
                py-3.5
                text-[10px]
                font-semibold
              "
            >
              <span>Get a Quote  </span>

              <span className="text-[14px]">
                →
              </span>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* ACTIVE BORDER */}

      <motion.div
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0,
        }}
        transition={{
          duration: 0.9,
          ease: smoothEase,
        }}
        className="
          pointer-events-none
          absolute
          inset-0
          z-50
          rounded-[8px]
          border-2
          border-[#f26522]/35
        "
      />
    </motion.article>
  );
}