import { USERS_URL } from "@/constants/constants";
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      login: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/login`,
            method: 'POST',
            credentials: 'include',
            body: data
         }),
      }),
      register: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}`,
            method: 'POST',
            body: data
         }),
      }),
      logout: builder.mutation({
         query: () => ({
            url: `${USERS_URL}/logout`,
            method: 'POST',
            credentials: 'include',
         }),
      }),
      profile: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/profile`,
            method: 'PUT',
            body: data
         }),
      }),
   }),
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation } = usersApiSlice