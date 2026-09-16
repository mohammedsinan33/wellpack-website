"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import ProductCard from "@/components/products/ProductCard";
import ProductDetailsModal from "@/components/products/ProductDetailsModal";
import ScrollTextReveal from "@/components/ui/animations/ScrollTextReveal";
import MobileProductCard from "@/components/ui/animations/MobileProductCard";

import { PRODUCTS } from "@/lib/constants";

// ============================================================
// DESKTOP 3D SPLIT CARD
// ============================================================

const PANEL_ORIGINS = ["100% 50%", "50% 50%", "0% 50%"] as const;
const PANEL_START_ROT = [-85, 0, 85] as const;

function SplitCard({
  product,
  index,
  cardsProgress,
  isActive,
  hasActiveProduct,
  onHoverStart,
}: {
  product: (typeof PRODUCTS)[number];
  index: number;
  cardsProgress: MotionValue<number>;
  isActive: boolean;
  hasActiveProduct: boolean;
  onHoverStart: () => void;
}) {
  const stagger = index * 0;

const rotateY = useTransform(
  cardsProgress,
  [0.05 + stagger, 0.5 + stagger, 1],
  [PANEL_START_ROT[index], 0, 0]
);
  const opacity = useTransform(
    cardsProgress,
    [0.1 + stagger, 0.4 + stagger],
    [0, 1]
  );

  return (
    <div
      style={{
        flex: isActive
          ? "0 0 calc(90% - 1.5rem)"
          : hasActiveProduct
            ? "0 0 5%"
            : "1 1 0%",
        transition: "flex .8s cubic-bezier(0.4,0,0.2,1)",
        minWidth: 0,
        height: "100%",
      }}
      onMouseEnter={onHoverStart}
    >
      <motion.div
        style={{
          rotateY,
          opacity,
          transformOrigin: PANEL_ORIGINS[index],
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
        }}
      >
        <ProductCard
          name={product.name}
          description={product.description}
          smallDescription={product.smallDescription}
          image={product.image}
          category={product.category}
          features={product.features}
          applications={product.applications}
          isActive={isActive}
          hasActiveProduct={hasActiveProduct}
          onHoverStart={onHoverStart}
        />
      </motion.div>
    </div>
  );
}

// ============================================================
// MOBILE PRODUCT STACK
// ============================================================

function MobileProductStack({
  products,
  onSelectProduct,
}: {
  products: typeof PRODUCTS;
  onSelectProduct: (product: (typeof PRODUCTS)[number]) => void;
}) {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const visibleProducts = products.slice(0, 3);

  return (
    <div ref={container} className="relative w-full">
      {visibleProducts.map((product, i) => {
        const targetScale = Math.max(
          0.5,
          1 - (visibleProducts.length - i - 1) * 0.1
        );

        return (
          <MobileProductCard
            key={product.id}
            i={i}
            product={product}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
            onClick={() => onSelectProduct(product)}
          />
        );
      })}
    </div>
  );
}

// ============================================================
// PRODUCTS SECTION
// ============================================================

export default function Products() {
  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<
    (typeof PRODUCTS)[number] | null
  >(null);

  // ============================================================
  // ELEMENT REFS
  // ============================================================

  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // ============================================================
  // ELEMENT SCROLL PROGRESS
  // ============================================================

  const { scrollYProgress: labelProgress } = useScroll({
    target: labelRef,
    offset: ["start 92%", "start 50%"],
  });

  const { scrollYProgress: headingProgress } = useScroll({
    target: headingRef,
    offset: ["start 88%", "start 28%"],
  });

  const { scrollYProgress: descriptionProgress } = useScroll({
    target: descriptionRef,
    offset: ["start 88%", "start 45%"],
  });

  const { scrollYProgress: linkProgress } = useScroll({
    target: linkRef,
    offset: ["start 92%", "start 55%"],
  });

  const { scrollYProgress: cardsProgress } = useScroll({
    target: cardsRef,
    offset: ["start 95%", "start 5%"],
  });

  // ============================================================
  // LABEL ANIMATION
  // ============================================================

  const labelOpacity = useTransform(
    labelProgress,
    [0, 1],
    [0, 1]
  );

  const labelY = useTransform(
    labelProgress,
    [0, 1],
    [14, 0]
  );

  const lineWidth = useTransform(
    labelProgress,
    [0, 1],
    ["0px", "20px"]
  );

  // ============================================================
  // DESCRIPTION ANIMATION
  // ============================================================

  const descriptionOpacity = useTransform(
    descriptionProgress,
    [0, 0.7],
    [0, 1]
  );

  const descriptionY = useTransform(
    descriptionProgress,
    [0, 0.7],
    [28, 0]
  );

  const descriptionBlur = useTransform(
    descriptionProgress,
    [0, 0.5],
    [6, 0]
  );

  const descriptionFilter = useTransform(
    descriptionBlur,
    (value) => `blur(${value}px)`
  );

  // ============================================================
  // VIEW ALL ANIMATION
  // ============================================================

  const buttonOpacity = useTransform(
    linkProgress,
    [0, 1],
    [0, 1]
  );

  const buttonX = useTransform(
    linkProgress,
    [0, 1],
    [-14, 0]
  );

  return (
    <section
      id="products"
      className="w-full bg-[#faf9f5] py-20 md:py-24"
    >
      {/* ======================================================
          HEADER
          ====================================================== */}

      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid items-end gap-8 md:grid-cols-[1.05fr_1fr_auto]">
          {/* ==================================================
              HEADING
              ================================================== */}

          <div>
            <motion.div
              ref={labelRef}
              className="mb-4 flex items-center gap-3"
              style={{
                opacity: labelOpacity,
                y: labelY,
              }}
            >
              <motion.span
                className="block h-[2px] bg-[#f26522]"
                style={{
                  width: lineWidth,
                }}
              />

              <span className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#566168]">
                Our Products
              </span>
            </motion.div>

            <h2
              ref={headingRef}
              className="font-heading text-[clamp(2rem,3vw,2.85rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-[#15252e]"
              style={{
                perspective: "600px",
              }}
            >
              <span className="block">
                <ScrollTextReveal
                  text="Packaging Solutions"
                  scrollYProgress={headingProgress}
                />
              </span>

              <span className="block">
                <ScrollTextReveal
                  text="for Every Need."
                  scrollYProgress={headingProgress}
                />
              </span>
            </h2>
          </div>

          {/* ==================================================
              DESCRIPTION
              ================================================== */}

          <motion.div
            ref={descriptionRef}
            className="max-w-[390px]"
            style={{
              opacity: descriptionOpacity,
              y: descriptionY,
              filter: descriptionFilter,
            }}
          >
            <p className="text-[12px] leading-[1.55] text-[#687277] sm:text-[13px]">
              From corrugated boxes to customized packaging, we deliver
              reliable solutions tailored to your business requirements.
            </p>
          </motion.div>

          {/* ==================================================
              VIEW ALL
              ================================================== */}

          <motion.div
            ref={linkRef}
            style={{
              opacity: buttonOpacity,
              x: buttonX,
            }}
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 border-b border-[#15252e] pb-1 text-[10px] font-semibold text-[#15252e] transition-colors duration-300 hover:border-[#f26522] hover:text-[#f26522] md:justify-self-end"
            >
              <span>View All Products</span>

              <span className="text-[14px] transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>

        {/* ====================================================
            DESKTOP CARDS
            ==================================================== */}

        <div
          ref={cardsRef}
          className="mt-10 hidden h-[430px] w-full gap-3 lg:flex"
          style={{
            perspective: "1600px",
          }}
          onMouseLeave={() => setActiveProduct(null)}
        >
          {PRODUCTS.slice(0, 3).map((product, index) => (
            <SplitCard
              key={product.id}
              product={product}
              index={index}
              cardsProgress={cardsProgress}
              isActive={activeProduct === product.id}
              hasActiveProduct={activeProduct !== null}
              onHoverStart={() => setActiveProduct(product.id)}
            />
          ))}
        </div>
      </div>

      {/* ======================================================
          MOBILE STICKY STACK
          ====================================================== */}

      <div className="mt-10 lg:hidden">
        <MobileProductStack
          products={PRODUCTS}
          onSelectProduct={setSelectedProduct}
        />
      </div>

      {/* ======================================================
          MODAL
          ====================================================== */}

      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}