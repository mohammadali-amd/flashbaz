import { apiSlice } from './apiSlice';
import { UPLOAD_URL } from "@/constants/constants";

export const productsApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      fetchMedia: builder.query({
         query: () => ({
            url: UPLOAD_URL
         }),
         providesTags: ['Media'],
         keepUnusedDataFor: 600
      }),
      deleteImage: builder.mutation({
         query: (key: string) => ({
            url: `${UPLOAD_URL}/${key}`,
            method: 'DELETE',
         }),
      }),
      uploadImages: builder.mutation({
         query: (formData: FormData) => ({
            url: UPLOAD_URL,
            method: 'POST',
            body: formData,
         }),
      }),
   }),
})

export const { useFetchMediaQuery, useDeleteImageMutation, useUploadImagesMutation } = productsApiSlice