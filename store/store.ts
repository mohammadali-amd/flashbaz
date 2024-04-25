import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Product } from '@/types/types';

interface CartItem {
   product: Product;
   quantity: number;
}

interface CartState {
   items: CartItem[];
}

const initialState: CartState = {
   items: [],
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem(state, action: PayloadAction<Product>) {
         const existingItem = state.items.find(item => item.product.id === action.payload.id);
         if (existingItem) {
            existingItem.quantity++;
         } else {
            state.items.push({ product: action.payload, quantity: 1 });
         }
         localStorage.setItem('cart', JSON.stringify(state.items));
      },
      removeItem(state, action: PayloadAction<number>) {
         const existingItem = state.items.find(item => item.product.id === action.payload);
         if (existingItem) {
            if (existingItem.quantity === 1) {
               state.items = state.items.filter(item => item.product.id !== action.payload);
            } else {
               existingItem.quantity--;
            }
         }
         localStorage.setItem('cart', JSON.stringify(state.items));
      },
      clearCart(state) {
         state.items = [];
         localStorage.removeItem('cart');
      },
   },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

let initialCartState: CartState = initialState;
if (typeof window !== 'undefined') {
   const storedCartData = localStorage.getItem('cart');
   initialCartState = storedCartData ? { items: JSON.parse(storedCartData) } : initialState;
}

export const store = configureStore({
   reducer: {
      cart: cartSlice.reducer,
   },
   preloadedState: {
      cart: initialCartState,
   },
});

export type RootState = ReturnType<typeof store.getState>;