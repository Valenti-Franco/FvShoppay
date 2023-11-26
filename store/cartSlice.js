import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload);
    },
    updateCart(state, action) {
      state.cartItems = action.payload;
    },
    emptyCart(state, action) {
      state.cartItems = [];
    },
    // reducers: {
    // addToCart(state, action) {
    //   state.cartItems.push(action.payload);
    // },
    // updateCart(state, action) {
    //   state.cartItems = action.payload;
    // },
    // emptyCart(state, action) {
    //   state.cartItems = [];
    // },
    // addToCart: (state, action) => {
    //   // state.cartItems.push(action.payload);
    //   const ItemExist = state?.cartItems?.find((item) => {
    //     item.id === action.payload.id;
    //   })
    //   if (ItemExist) {
    //     ItemExist.quantity++;

    //   } else {
    //     state?.cartItems?.push({ ...action.payload, quantity: 1 })
    //   }
    // },

    //  export const cartSlice = createSlice({
    //   name: 'cart',
    //   initialState,
    //   reducers: {
    // addToCart(state, action) {
    //   //console.log(action.payload);
    //   state.cartItems =[...state.cartItems, action.payload];
    //   //state.cartItems.push = action.payload;
    // },

    // updateCart(state, action) {
    //   state.cartItems = action.payload;
    // },
    // emptyCart(state, action) {
    //   state.cartItems = [];
    // },
  },
});

export const { addToCart, updateCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
