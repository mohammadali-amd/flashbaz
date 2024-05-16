import { PRODUCTS_URL } from "@/constants/constants";
import { Product } from "@/types/types";
import { apiSlice } from './apiSlice';

type Products = Product[]

export const productsApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getProducts: builder.query<Products, string>({
         query: () => ({
            url: PRODUCTS_URL
         }),
         keepUnusedDataFor: 5
      }),
      getProductDetails: builder.query<Product, string>({
         query: (productId) => ({
            url: `${PRODUCTS_URL}/${productId}`
         }),
         keepUnusedDataFor: 5
      })
   }),
})

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice