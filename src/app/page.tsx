import { db } from "@/lib/prisma";
import BestSellers from "./_components/BestSellers";
import Hero from "./_components/Hero";

export default async function Home() {
  console.log("iam in server side ");
  const products = await db.products.findMany()
  console.log(products);
  
    
  return (
    <main>
      <Hero />
      <BestSellers />
      <div className="py-40"></div>
    </main>
  );
}
