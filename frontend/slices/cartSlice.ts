import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '@/types/types';

interface CartItem {
   product: Product;
   quantity: number;
}

interface CartState {
   items: CartItem[];
   paymentMethod: string,
}

const initialState: CartState = {
   items: [],
   paymentMethod: 'PayPal',
};

const getInitialCartState = (): CartState => {
   if (typeof window !== 'undefined') {
      const storedCartData = localStorage.getItem('cart');
      const storedShippingAddress = localStorage.getItem('shippingAddress');

      return storedCartData
         ? {
            items: JSON.parse(storedCartData),
            paymentMethod: 'PayPal'
         }
         : initialState;
   }
   return initialState;
};

const initialCartState: CartState = getInitialCartState();

export const cartSlice = createSlice({
   name: 'cart',
   initialState: initialCartState,
   reducers: {
      addItem(state, action: PayloadAction<Product>) {
         const existingItem = state.items.find(item => item.product._id === action.payload._id);

         if (existingItem) {
            existingItem.quantity += 1;
         } else {
            state.items = [...state.items, { product: action.payload, quantity: 1 }];
         }

         localStorage.setItem('cart', JSON.stringify(state.items));
      },
      removeItem(state, action: PayloadAction<number>) {
         const existingItem = state.items.find(item => item.product._id === action.payload);

         if (existingItem) {
            if (existingItem.quantity === 1) {
               state.items = state.items.filter(item => item.product._id !== action.payload);
            } else {
               existingItem.quantity -= 1;
            }
         }

         localStorage.setItem('cart', JSON.stringify(state.items));
      },
      clearCart(state) {
         state.items = [];
         // localStorage.removeItem('cart');
         localStorage.setItem('cart', JSON.stringify(state.items))
      },
      savePaymentMethod: (state, action) => {
         state.paymentMethod = action.payload
         localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod));
      },
      resetCart: (state) => (state = initialState)
   },
});

export const { addItem, removeItem, clearCart, savePaymentMethod, resetCart } = cartSlice.actions;
