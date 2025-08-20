import Menu from "@/components/menu";
import { getProductsByCategory } from "@/server/db/product";

export default async function MenuPage() {
  const categories = await getProductsByCategory();
  return (
    <main>
      {categories.map((category) => (
        <section key={category.id} className=" section-gap">
          <div className=" container text-center">
            <h1 className=" text-primary text-4xl font-bold italic mb-4">
              {category.name}
            </h1>
            <Menu items={category.products} />
          </div>
        </section>
      ))}
    </main>
  );
}
