import { configureStore } from '@reduxjs/toolkit';

import { cartSlice } from '@/slices/cartSlice'
import { authSlice } from '@/slices/authSlice';
import { apiSlice } from '@/slices/apiSlice';
import { filtersSlice } from '@/slices/filtersSlice';

export const store = configureStore({
   reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      cart: cartSlice.reducer,
      auth: authSlice.reducer,
      filters: filtersSlice.reducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
   devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;