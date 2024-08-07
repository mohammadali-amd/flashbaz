import { PRODUCTS_URL, UPLOAD_URL } from "@/constants/constants";
import { Product } from "@/types/types";
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getProducts: builder.query({
         query: ({ keyword, pageNumber }) => ({
            url: PRODUCTS_URL,
            params: {
               keyword,
               pageNumber
            }
         }),
         providesTags: ['Product'],
         keepUnusedDataFor: 5
      }),
      getAdminProducts: builder.query({
         query: ({ keyword, pageNumber }) => ({
            url: `${PRODUCTS_URL}/admin`,
            params: {
               keyword,
               pageNumber
            }
         }),
         providesTags: ['Product'],
         keepUnusedDataFor: 5
      }),
      getProductDetails: builder.query<Product, string>({
         query: (productId) => ({
            url: `${PRODUCTS_URL}/${productId}`
         }),
         keepUnusedDataFor: 5
      }),
      createProduct: builder.mutation({
         query: () => ({
            url: PRODUCTS_URL,
            method: 'POST',
         }),
         invalidatesTags: ['Product']
      }),
      updateProduct: builder.mutation({
         query: (data) => ({
            url: `${PRODUCTS_URL}/${data.productId}`,
            method: 'PUT',
            body: data
         }),
         invalidatesTags: ['Product']
      }),
      deleteProduct: builder.mutation({
         query: (productId) => ({
            url: `${PRODUCTS_URL}/${productId}`,
            method: 'DELETE',
         }),
      }),
      uploadProductImage: builder.mutation({
         query: (data) => ({
            url: UPLOAD_URL,
            method: 'POST',
            body: data
         })
      }),
      addReview: builder.mutation({
         query: ({ productId, review }) => ({
            url: `${PRODUCTS_URL}/${productId}/reviews`,
            method: 'POST',
            body: review,
         }),
         invalidatesTags: ['Product']
      }),
      getTopProducts: builder.query({
         query: () => ({
            url: `${PRODUCTS_URL}/top`,
         }),
         keepUnusedDataFor: 5
      }),
   }),
})

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation, useUploadProductImageMutation, useAddReviewMutation, useGetTopProductsQuery, useGetAdminProductsQuery } = productsApiSlice