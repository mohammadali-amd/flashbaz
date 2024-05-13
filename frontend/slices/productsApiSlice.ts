import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { PRODUCTS_URL, BASE_URL } from "@/constants/constants";
import { Product } from "@/types/types";

type Products = Product[]

export const productsApiSlice = createApi({
   reducerPath: 'productsApiSlice',
   baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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