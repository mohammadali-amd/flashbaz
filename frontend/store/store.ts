import { configureStore } from '@reduxjs/toolkit';

import { productsApiSlice } from '@/slices/productsApiSlice';
import { cartSlice } from '@/slices/cartSlice'

export const store = configureStore({
   reducer: {
      [productsApiSlice.reducerPath]: productsApiSlice.reducer,
      cart: cartSlice.reducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApiSlice.middleware),
   devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;