import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Loader from '@/components/UI/Loader'
import { useLoginMutation } from '@/slices/usersApiSlice'
import { setCredentials } from '@/slices/authSlice'
import { RootState } from '@/store/store'

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
      <div className='flex justify-center my-20'>
         <form onSubmit={submitHandler}>
            <div className='space-y-6 border border-stone-200 shadow-lg  shadow-gray-300 rounded-xl py-8 px-10'>
               <div className="flex justify-between items-center gap-10">
                  <h4 className='text-xl'>ایمیل</h4>
                  <input className='text-center border border-stone-300 rounded-md py-2' type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
               </div>
               <div className="flex justify-between items-center gap-10">
                  <h4 className='text-xl'>رمز عبور</h4>
                  <input className='text-center border border-stone-300 rounded-md py-2' type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
               </div>
               {/* <div className="flex justify-between items-center gap-10">
                  <h4 className='text-xl'>کد امنیتی</h4>
                  <input className='text-center border border-stone-300 rounded-md py-2' type="text" name="code" id="code" />
               </div> */}

               <button type='submit' className='flex justify-center bg-theme-color w-full text-xl py-3 rounded-md text-white disabled:bg-gray-400' disabled={isLoading}>
                  ورود
               </button>

               {isLoading && <Loader />}
               <div className='text-center text-xl'>
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
