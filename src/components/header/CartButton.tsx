"use client";
import React from "react";
import Link from "../link";
import { Routes } from "@/constants/enums";
import { ShoppingCartIcon } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { getCartQuantity } from "@/lib/cart";
import { useIsClient } from "@/app/[locale]/cart/_components/UseIsClient";

const CartButton = () => {
  const cart = useAppSelector(selectCartItems);
  const numerOfItems = getCartQuantity(cart);
  const isClient = useIsClient();

  if (!isClient) {
    return <p></p>; // أو null أو أي placeholder
  }
  return (
    <Link href={`/${Routes.CART}`} className="block group relative">
      <span className=" absolute -top-4 start-4 w-5 h-5 text-sm bg-primary rounded-full text-center text-white">
        {numerOfItems}
      </span>
      <ShoppingCartIcon
        className={`text-accent group-hover:text-primary duration-200 transition-colors !w-6 !h-6`}
      />
    </Link>
  );
};
export default CartButton;
