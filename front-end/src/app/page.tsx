import Image from "next/image";
import Navbar from "@/components/navbar/navbar";
import Hero from "@/components/home/hero";
import Products from "@/components/home/Products";

export default function Home() {
  return (
      <main>
        <Navbar/>
        <Hero/>
        <Products/>
      </main>
  );
}
