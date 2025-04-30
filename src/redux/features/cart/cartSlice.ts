import { Extra, Size } from "@/generated/prisma";
import { Rootstate } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit"


export type CartItem={
    name :string,
    image:string,
    basePrice:number,
    id:string,
    quantity?:number,
    size?:Size,
    extra?:Extra[],
}
type CartState={
    items:CartItem[],
}

const initialState:CartState={
    items:[],
}
export const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{},
    
})
export const {}=cartSlice.actions;
export default cartSlice.reducer;
export const selectCartItems=(state:Rootstate)=>state.cart.items;