import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
   brand: string;
   rating: number;
   minPrice: number;
   maxPrice: number;
}

const initialState: FiltersState = {
   brand: '',
   rating: 0,
   minPrice: 0,
   maxPrice: 10000000,
};

export const filtersSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      setBrand(state, action: PayloadAction<string>) {
         state.brand = action.payload;
      },
      setRating(state, action: PayloadAction<number>) {
         state.rating = action.payload;
      },
      setPriceRange(state, action: PayloadAction<[number, number]>) {
         state.minPrice = action.payload[0];
         state.maxPrice = action.payload[1];
      },
      resetFilters(state) {
         state.brand = '';
         state.rating = 0;
         state.minPrice = 0;
         state.maxPrice = 10000000;
      },
   },
});

export const { setBrand, setRating, setPriceRange, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
