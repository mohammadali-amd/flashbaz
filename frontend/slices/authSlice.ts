import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserInfo {
   id: string;
   name: string;
   email: string;
   password: string;
   isAdmin: boolean;
}

interface AuthState {
   userInfo: UserInfo | null;
}

const getUserInfoFromLocalStorage = (): UserInfo | null => {
   if (typeof window !== 'undefined' && localStorage.getItem('userInfo')) {
      return JSON.parse(localStorage.getItem('userInfo') as string) as UserInfo;
   }
   return null;
}

const initialState: AuthState = {
   userInfo: getUserInfoFromLocalStorage()
}

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setCredentials: (state, action: PayloadAction<UserInfo>) => {
         state.userInfo = action.payload
         localStorage.setItem('userInfo', JSON.stringify(action.payload))
      },
      logout: (state) => {
         state.userInfo = null
         localStorage.removeItem('userInfo')
      }
   }
})

export const { setCredentials, logout } = authSlice.actions;