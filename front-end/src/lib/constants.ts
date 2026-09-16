import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "corrugated-box",
    name: "Corrugated Box",
    description:
      "Strong and versatile corrugated packaging designed to protect products during storage, handling and transportation.",
    smallDescription: "Strong. Reliable. Versatile.",

    category: "Corrugated Packaging",

    image:
      "/images/products/wellpck-product-corugatedbox.png",

    features: [
      "Strong construction",
      "Custom sizes",
      "Lightweight",
      "Impact protection",
    ],

    applications: [
      "Shipping",
      "Storage",
      "E-commerce",
      "Industrial",
    ],
  },

  {
    id: "slipper-box",
    name: "Slipper Box",
    description:
      "Custom-designed footwear packaging that provides a secure fit while giving your products a clean and professional presentation.",
    smallDescription: "Customized for Your Brand.",

    category: "Footwear Packaging",

    image:
      "/images/products/wellpck-product-slipperbox.png",

    features: [
      "Custom branding",
      "Secure fit",
      "Premium finish",
      "Multiple sizes",
    ],

    applications: [
      "Footwear",
      "Retail",
      "Shoes",
      "Slippers",
    ],
  },

  {
    id: "packing-box",
    name: "Packing Box",
    description:
      "Reliable packaging boxes designed for everyday shipping, storage and product handling across different business requirements.",
    
    smallDescription: "Durable for Every Shipment.",

    category: "General Packaging",

    image:
      "/images/products/wellpck-product-packingbox.png",

    features: [
      "Durable board",
      "Custom dimensions",
      "Easy handling",
      "Brand printing",
    ],

    applications: [
      "Shipping",
      "Retail",
      "Moving",
      "Storage",
    ],
  },
];