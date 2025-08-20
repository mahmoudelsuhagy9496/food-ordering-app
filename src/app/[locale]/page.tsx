import About from "@/components/about";
import Contact from "@/components/contact";
import Hero from "./_components/Hero";
import BestSellers from "./_components/BestSellers";

export default async function Home() {
  return (
    <main>
      <Hero />
      <BestSellers />
      <About />
      <Contact />
      <div className="py-40"></div>
    </main>
  );
}
