import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Loader from '@/components/Loader'
import { useRegisterMutation } from '@/slices/usersApiSlice'
import { setCredentials } from '@/slices/authSlice'
import { RootState } from '@/store/store'

const RegisterPage = () => {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [ConfirmPassword, setConfirmPassword] = useState('')

   const dispatch = useDispatch()
   const router = useRouter()

   const [register, { isLoading }] = useRegisterMutation()

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

      if (password !== ConfirmPassword) {
         toast.error('Password do not match')
         return
      } else {
         try {
            const res = await register({ name, email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            router.push(redirect)
            toast.success('خوش آمدید')
         } catch (error) {
            toast.error((error as any)?.data?.message || (error as any)?.message);
         }
      }
   }

   return (
      <div className='flex justify-center my-20'>
         <form onSubmit={submitHandler}>
            <div className='space-y-6 border border-stone-200 shadow-lg  shadow-gray-300 rounded-xl py-8 px-10'>
               <div className="flex justify-between items-center gap-10">
                  <h4 className='text-xl'>نام</h4>
                  <input className='text-center border border-stone-300 rounded-md py-2' type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
               </div>
               <div className="flex justify-between items-center gap-10">
                  <h4 className='text-xl'>ایمیل</h4>
                  <input className='text-center border border-stone-300 rounded-md py-2' type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
               </div>
               <div className="flex justify-between items-center gap-10">
                  <h4 className='text-xl'>رمز عبور</h4>
                  <input className='text-center border border-stone-300 rounded-md py-2' type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
               </div>
               <div className="flex justify-between items-center gap-10">
                  <h4 className='text-xl'>تایید رمز عبور</h4>
                  <input className='text-center border border-stone-300 rounded-md py-2' type="password" name="confirm-password" id="confirm-password" value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
               </div>
               <div className="flex justify-between items-center gap-10">
                  <h4 className='text-xl'>کد امنیتی</h4>
                  <input className='text-center border border-stone-300 rounded-md py-2' type="text" name="code" id="code" />
               </div>

               <button type='submit' className='flex justify-center bg-theme-color w-full text-xl py-3 rounded-md text-white disabled:bg-gray-400' disabled={isLoading}>
                  ثبت نام
               </button>

               {isLoading && <Loader />}
               <div className='text-center text-xl'>
                  <Link href={'/login'}>
                     ورود
                  </Link>
               </div>
            </div>
         </form>
      </div>
   )
}

export default RegisterPage
