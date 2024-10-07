import { CATEGORIES_URL } from "@/constants/constants";
import { apiSlice } from './apiSlice';

export const categoriesApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getCategories: builder.query({
         query: () => ({
            url: CATEGORIES_URL,
            method: 'GET',
         }),
         keepUnusedDataFor: 600,
         providesTags: ['Category'],
      }),
      createCategory: builder.mutation({
         query: (newCategory) => ({
            url: CATEGORIES_URL,
            method: 'POST',
            body: newCategory,
         }),
         invalidatesTags: ['Category'],
      }),
      updateCategory: builder.mutation({
         query: ({ id, ...updatedCategory }) => ({
            url: `${CATEGORIES_URL}/${id}`,
            method: 'PUT',
            body: updatedCategory,
         }),
         invalidatesTags: ['Category'],
      }),
      deleteCategory: builder.mutation({
         query: (id) => ({
            url: `${CATEGORIES_URL}/${id}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Category'],
      }),
      addSubCategory: builder.mutation({
         query: ({ id, name, slug }) => ({
            url: `${CATEGORIES_URL}/${id}/subcategories`,
            method: 'POST',
            body: { name, slug },
         }),
         invalidatesTags: ['Category'],
      }),
      updateSubCategory: builder.mutation({
         query: ({ categoryId, subId, name, slug }) => ({
            url: `${CATEGORIES_URL}/${categoryId}/subcategories/${subId}`,
            method: 'PUT',
            body: { name, slug },
         }),
         invalidatesTags: ['Category'],
      }),
      deleteSubCategory: builder.mutation({
         query: ({ categoryId, subId }) => ({
            url: `${CATEGORIES_URL}/${categoryId}/subcategories/${subId}`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Category'],
      }),
   }),
});

export const {
   useGetCategoriesQuery,
   useCreateCategoryMutation,
   useUpdateCategoryMutation,
   useDeleteCategoryMutation,
   useAddSubCategoryMutation,
   useUpdateSubCategoryMutation,
   useDeleteSubCategoryMutation
} = categoriesApiSlice;
