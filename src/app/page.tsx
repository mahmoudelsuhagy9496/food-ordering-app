import BestSellers from "./_components/BestSellers";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      <BestSellers />
      <div className="py-40"></div>
    </main>
  );
}
