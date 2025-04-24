import MainHeading from "@/components/main-heading";
import Menu from "@/components/menu";


export default function BestSellers() {
  const BestSellers = [
    {
      id: crypto.randomUUID(),
      name: "pizza x",
      description: "this is delision pizza",
      basePrice: 14,
      image: "/assets/images/pizza.png",
    },
    {
      id: crypto.randomUUID(),
      name: "pizza x",
      description: "this is delision pizza",
      basePrice: 14,
      image: "/assets/images/pizza.png",
    },
    {
      id: crypto.randomUUID(),
      name: "pizza x",
      description: "this is delision pizza",
      basePrice: 14,
      image: "/assets/images/pizza.png",
    },
    {
      id: crypto.randomUUID(),
      name: "pizza x",
      description: "this is delision pizza",
      basePrice: 14,
      image: "/assets/images/pizza.png",
    },
  ];
  return (
    <section className="section-gap">
      <div className=" container ">
        <div className=" text-center mb-4">
          <MainHeading subTitle="Checkout" title="Our Best Sellers" />
        </div>
       <Menu items={BestSellers}/>
      </div>
    </section>
  );
}
