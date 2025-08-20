import CartForm from "./_components/CartForm";
import CartItem from "./_components/CartItem";

export default function CartPage() {
  return (
    <section className=" section-gap">
      <div className="container ">
        <h2 className="text-primary text-center font-bold text-4xl italic mb-3 ">
          Cart
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {" "}
          <CartItem />
          <CartForm />
        </div>
      </div>
    </section>
  );
}
