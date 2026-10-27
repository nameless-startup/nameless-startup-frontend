"use client";

import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Places from "@/components/sections/places";
import Shops from "@/components/sections/shops";
import Products from "@/components/sections/products";
import Blogs from "@/components/sections/blogs";
import Footer from "@/components/sections/footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Hero />
      <About />
      <Places />
      <Shops />
      <Products />
      <Blogs />
      <Footer />
    </div>
  );
}