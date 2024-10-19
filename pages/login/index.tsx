import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Loader from '@/components/UI/Loader'
import { useLoginMutation } from '@/slices/usersApiSlice'
import { setCredentials } from '@/slices/authSlice'
import { RootState } from '@/store/store'
import InputField from '@/components/UI/InputField'

const LoginPage = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const dispatch = useDispatch()
   const router = useRouter()

   const [login, { isLoading }] = useLoginMutation()

   const { userInfo } = useSelector((state: RootState) => state.auth)

   const { query } = router
   const redirect = query.redirect as string || '/';

   useEffect(() => {
      if (userInfo) {
         router.push(redirect)
      }
   }, [userInfo, redirect, router])

   const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // // Get Cookie from backend
      // const response = await fetch('http://localhost:5000/api/users/login', {
      //    method: 'POST',
      //    credentials: 'include', // This ensures cookies are included in the request
      //    headers: {
      //       'Content-Type': 'application/json'
      //    },
      //    body: JSON.stringify({ email, password })
      // });
      // await response.json();

      try {
         const res = await login({ email, password }).unwrap()
         dispatch(setCredentials({ ...res }))
         router.push(redirect)
         toast.success('خوش آمدید')
      } catch (error) {
         toast.error((error as any)?.data?.message || (error as any)?.message);
      }
   }

   return (
      <div className='lg:flex lg:justify-center my-10 lg:my-20 px-6'>
         <form onSubmit={submitHandler}>
            <div className='space-y-6 lg:border lg:border-stone-200 lg:shadow-lg  lg:shadow-gray-300 lg:rounded-xl py-8 lg:px-10'>
               <InputField
                  label='ایمیل'
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <InputField
                  label='رمز عبور'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />

               <button type='submit' className='flex justify-center bg-theme-color w-full text-xl py-3 rounded-md text-white disabled:bg-gray-400' disabled={isLoading}>
                  ورود
               </button>

               {isLoading && <Loader />}
               <div className='text-center text-lg'>
                  <Link href={'/register'}>
                     ثبت نام
                  </Link>
               </div>
            </div>
         </form>
      </div>
   )
}

export default LoginPage
