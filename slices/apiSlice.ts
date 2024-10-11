import { fetchBaseQuery, createApi, FetchArgs } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/constants/constants';
import { RootState } from '@/store/store';
import { logout } from './authSlice';

const baseQuery = fetchBaseQuery({
   baseUrl: BASE_URL,
   credentials: 'include',  // This will include cookies in requests
   prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.userInfo;

      if (token) {
         headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
   }
});

async function baseQueryWithAuth(args: FetchArgs, api: any, extra: any) {
   const result = await baseQuery(args, api, extra);

   // Dispatch the logout action on 401.
   if (result.error && result.error.status === 401) {
      api.dispatch(logout());
   }
   return result;
}

export const apiSlice = createApi({
   baseQuery: baseQueryWithAuth, // Use the customized baseQuery
   tagTypes: ['Product', 'Order', 'User', 'Category', 'Media'],
   endpoints: (builder) => ({}),
});