import Image from "next/image";
import Navbar from "@/components/navbar/navbar";
import Hero from "@/components/home/hero";

export default function Home() {
  return (
      <main>
        <Navbar/>
        <Hero/>
      </main>
  );
}
