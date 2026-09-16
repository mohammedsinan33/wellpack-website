
"use client";
 
import Image from "next/image";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
 
import MagneticButton from "@/components/ui/buttons/MagneticButton";
import { Product } from "@/types";
 
interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
}
 
export default function ProductDetailsModal({
  product,
  onClose,
}: ProductDetailsModalProps) {
  // Close with Escape key
  useEffect(() => {
    if (!product) return;
 
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
 
    document.addEventListener("keydown", handleKeyDown);
 
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
 
    // NOTE: We intentionally do NOT lock body scroll here because
    // the modal coexists with the hover-expand cards — the user
    // needs to be able to mouse over the section while the modal is open.
  }, [product, onClose]);
 
  return (
    <AnimatePresence>
      {product && (
        /**
         * The outer wrapper is pointer-events-none so mouse events pass
         * straight through to the product cards underneath, keeping
         * the hover-expand behaviour alive while the modal is visible.
         * Only the modal panel itself re-enables pointer events.
         */
        <motion.div
          key={product.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            p-4
            sm:p-6
            pointer-events-none
          "
          style={{
            background: "rgba(21,37,46,0.35)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          {/* Modal panel — pointer events re-enabled here */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="
              pointer-events-auto
              relative
              w-full
              max-w-[980px]
              overflow-hidden
              rounded-[14px]
              border
              border-[#e4e1da]
              bg-[#faf9f5]
              shadow-[0_30px_100px_rgba(21,37,46,0.2)]
            "
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close product details"
              className="
                absolute
                right-5
                top-5
                z-10
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[#d9d6cf]
                bg-white/80
                text-[20px]
                leading-none
                text-[#15252e]
                transition-all
                duration-300
                hover:bg-[#15252e]
                hover:text-white
              "
            >
              ×
            </button>
 
            <div className="grid md:grid-cols-2">
              {/* Product Image */}
              <div className="relative min-h-[330px] bg-[#f1eee8] sm:min-h-[430px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-8 sm:p-12"
                />
 
                {/* Category badge */}
                <div
                  className="
                    absolute
                    bottom-5
                    left-5
                    rounded-full
                    bg-white/85
                    px-4
                    py-2
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-[#566168]
                    backdrop-blur-sm
                  "
                >
                  {product.category}
                </div>
              </div>
 
              {/* Content */}
              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                {/* Label */}
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-[2px] w-5 bg-[#f26522]" />
                  <span
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.35em]
                      text-[#6a7377]
                    "
                  >
                    Product Details
                  </span>
                </div>
 
                {/* Title */}
                <h2
                  className="
                    font-heading
                    text-[clamp(2rem,4vw,3rem)]
                    font-extrabold
                    leading-[0.98]
                    tracking-[-0.05em]
                    text-[#15252e]
                  "
                >
                  {product.name}
                </h2>
 
                {/* Description */}
                <p
                  className="
                    mt-5
                    max-w-[480px]
                    text-[13px]
                    leading-[1.7]
                    text-[#687277]
                  "
                >
                  {product.description}
                </p>
 
                {/* Features */}
                <div className="mt-7">
                  <h3
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-[#15252e]
                    "
                  >
                    Key Features
                  </h3>
 
                  <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-3">
                    {product.features.map((feature) => (
                      <div
                        key={feature}
                        className="
                          flex
                          items-center
                          gap-2
                          text-[11px]
                          text-[#626c70]
                        "
                      >
                        <span className="text-[#f26522]">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
 
                {/* Applications */}
                <div className="mt-7">
                  <h3
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-[#15252e]
                    "
                  >
                    Suitable For
                  </h3>
 
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.applications.map((application) => (
                      <span
                        key={application}
                        className="
                          rounded-full
                          border
                          border-[#ddd9d1]
                          bg-white
                          px-3
                          py-1.5
                          text-[10px]
                          text-[#687277]
                        "
                      >
                        {application}
                      </span>
                    ))}
                  </div>
                </div>
 
                {/* CTA */}
                  <div className="mt-8">
                    <MagneticButton
                      href="#contact"
                      className="
                        wp-magnetic-button--dark
                        px-6
                        py-3.5
                        text-[11px]
                        font-semibold
                      "
                    >
                      <span>Get a Quote</span>
                      <span className="text-[15px]">→</span>
                    </MagneticButton>
                  </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}