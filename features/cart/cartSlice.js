import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  total: 0,
  totalItems: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload);
      const { data, quantity } = action.payload;
      const { cart } = state;
      const cartItem = cart.find((item) => item.id === data.id);
      if (cartItem) {
        cartItem.quantity = quantity;
      } else {
        state.cart.push({ ...data, quantity });
      }
      state.totalItems += 1;
      state.totalPrice += data.price * quantity;
    },
    removeFromCart: (state, action) => {
      const { data } = action.payload;
      const { cart } = state;
      state.totalItems -= 1
      state.totalPrice -= data.price * data.quantity;
      state.cart = cart.filter((item) => item.id !== data.id);
      

    },
    clearCart: (state) => {
      state.cart = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
    getTotal: (state) => {
      state.total = state.totalItems;
    },
    reduceQuantity: (state, action) => {
      const { product } = action.payload;
      const { cart } = state;
      const cartItem = cart.find((item) => item.id === product.id);
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        state.totalPrice -= product.price;
      }
    },

    increaseQuantity: (state, action) => {
      const { product } = action.payload;
      const { cart } = state;
      const cartItem = cart.find((item) => item.id === product.id);
      cartItem.quantity += 1;
      state.totalPrice += product.price;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  reduceQuantity,
  getTotal,
} = cartSlice.actions;

export const cartSelector = (state) => state.cart;

export default cartSlice.reducer;
