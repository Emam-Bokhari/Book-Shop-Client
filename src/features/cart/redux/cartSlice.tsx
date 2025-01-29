import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ id: string; title: string; price: number }>
    ) => {
      // Directly add the item to the cart without checking if it exists
      const newItem = {
        ...action.payload,
        quantity: 1,
      };
      state.items.push(newItem);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      // Remove the item from the cart based on its id
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      // Clear the entire cart by resetting items to an empty array
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
