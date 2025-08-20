
import { Extra, Size } from "@/generated/prisma";
import { Rootstate } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  name: string;
  image: string;
  basePrice: number;
  id: string;
  quantity?: number;
  size?: Size;
  extra?: Extra[];
};
type CartState = {
  items: CartItem[];
};
let initialCartItems: string | null = null;
if (typeof window !== "undefined") {
  initialCartItems = localStorage.getItem("cartItems");
}
const initialState: CartState = {
  items: initialCartItems ? JSON.parse(initialCartItems) : [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addCartItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
        existingItem.size = action.payload.size;
        existingItem.extra = action.payload.extra;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCartItem: (state, action: PayloadAction<{ id: string }>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.items.filter((item) => item.id !== action.payload.id);
        } else {
          existingItem.quantity! -= 1;
        }
      }
    },
    removeItemFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});
export const { addCartItem, removeCartItem, removeItemFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems = (state: Rootstate) => state.cart.items;




// deepseek 
// import { Extra, Size } from "@/generated/prisma";
// import { Rootstate } from "@/redux/store";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export type CartItem = {
//   name: string;
//   image: string;
//   basePrice: number;
//   id: string;
//   quantity?: number;
//   size?: Size;
//   extra?: Extra[];
// };

// type CartState = {
//   items: CartItem[];
// };

// // دالة مساعدة للوصول الآمن إلى localStorage
// const getInitialCartItems = (): CartItem[] => {
//   if (typeof window === 'undefined') {
//     return [];
//   }
  
//   try {
//     const initialCartItems = localStorage.getItem('cartItems');
//     return initialCartItems ? JSON.parse(initialCartItems) : [];
//   } catch (error) {
//     console.error('Error accessing localStorage:', error);
//     return [];
//   }
// };

// const initialState: CartState = {
//   items: getInitialCartItems(),
// };

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addCartItem: (state, action: PayloadAction<CartItem>) => {
//       const existingItem = state.items.find(
//         (item) => item.id === action.payload.id
//       );
//       if (existingItem) {
//         existingItem.quantity = (existingItem.quantity || 0) + 1;
//         existingItem.size = action.payload.size;
//         existingItem.extra = action.payload.extra;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 });
//       }
      
//       // حفظ في localStorage عند التحديث (فقط في المتصفح)
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('cartItems', JSON.stringify(state.items));
//       }
//     },
//     removeCartItem: (state, action: PayloadAction<{ id: string }>) => {
//       const existingItem = state.items.find(
//         (item) => item.id === action.payload.id
//       );
//       if (existingItem) {
//         if (existingItem.quantity === 1) {
//           state.items = state.items.filter((item) => item.id !== action.payload.id);
//         } else {
//           existingItem.quantity! -= 1;
//         }
//       }
      
//       // حفظ في localStorage عند التحديث (فقط في المتصفح)
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('cartItems', JSON.stringify(state.items));
//       }
//     },
//     removeItemFromCart: (state, action: PayloadAction<{ id: string }>) => {
//       state.items = state.items.filter(
//         (item) => item.id !== action.payload.id
//       );
      
//       // حفظ في localStorage عند التحديث (فقط في المتصفح)
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('cartItems', JSON.stringify(state.items));
//       }
//     },
//     clearCart: (state) => {
//       state.items = [];
      
//       // مسح من localStorage أيضاً (فقط في المتصفح)
//       if (typeof window !== 'undefined') {
//         localStorage.removeItem('cartItems');
//       }
//     },
//     setCartItems: (state, action: PayloadAction<CartItem[]>) => {
//       state.items = action.payload;
//     }
//   },
// });

// export const { 
//   addCartItem, 
//   removeCartItem, 
//   removeItemFromCart, 
//   clearCart,
//   setCartItems
// } = cartSlice.actions;

// export default cartSlice.reducer;
// export const selectCartItems = (state: Rootstate) => state.cart.items;