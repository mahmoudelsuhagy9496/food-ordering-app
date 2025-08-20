import { CartItem } from "@/redux/features/cart/cartSlice";

export const getCartQuantity = (cart: CartItem[]) => {
  return cart.reduce((total, item) => total + item.quantity!, 0);
};

export const getItemQuantity = (id: string, cart: CartItem[]) => {
  return cart.find((Item) => Item.id === id)?.quantity || 0;
};
export const getSubTotal = (cart: CartItem[]) => {
  return cart.reduce((total, cartItem) => {
    const extrasTotal = cartItem.extra?.reduce(
      (sumExtras, extars) => sumExtras + (extars?.price || 0),
      0
    );
    const itemTotal =
      (cartItem.size?.price || 0) + cartItem.basePrice + (extrasTotal || 0);
    return total + (itemTotal * cartItem.quantity!);
  }, 0);
};

export const deliveryFees=5
export const getTotalAmount=(cart:CartItem[])=>{
  return getSubTotal(cart) + deliveryFees
}