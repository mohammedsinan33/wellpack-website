"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import ProductCard from "@/components/products/ProductCard";
import { PRODUCTS } from "@/lib/constants";

interface MobileProductCardProps {
  i: number;
  product: (typeof PRODUCTS)[number];
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  onClick: () => void;
}

export default function MobileProductCard({
  i,
  product,
  progress,
  range,
  targetScale,
  onClick,
}: MobileProductCardProps) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    /*
     * STICKY LAYER
     * - `sticky top-0`  → pins this layer once it reaches the top
     * - height: 100vh   → each layer occupies one screen height in the flow,
     *                      giving the scroll distance needed for stacking
     * - overflow visible → never clip the card
     */
    <div
      style={{ height: "100vh" }}
      className="sticky top-0 w-full overflow-visible"
    >
      {/*
       * CARD POSITIONER
       * - absolute so it doesn't affect flow height
       * - top: 50%  + translateY(-50%) → vertically centred in the viewport
       *   then shifted down by i * 20px for the stacking offset
       * - origin-top → scale shrinks downward (away from top)
       */}
      <motion.div
        style={{
          scale,
          position: "absolute",
          /*
           * 12vh from the top of the sticky viewport slot.
           * Card 0 → 12vh
           * Card 1 → 12vh + 20px (stacking offset)
           * Card 2 → 12vh + 40px
           *
           * Tune the 12vh up/down to control how close the
           * first card sits to the section heading.
           * Lower value  = higher on screen (closer to heading).
           * Higher value = more gap between heading and card.
           */
          top: `calc(12vh + ${i * 20}px)`,
          left: 0,
          right: 0,
          transformOrigin: "top center",
        }}
        className="w-full px-4"
      >
        <ProductCard
          name={product.name}
          description={product.description}
          smallDescription={product.smallDescription}
          image={product.image}
          category={product.category}
          features={product.features}
          applications={product.applications}
          isActive={false}
          onClick={onClick}
        />
      </motion.div>
    </div>
  );
}