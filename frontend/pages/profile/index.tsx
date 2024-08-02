import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { RootState } from '@/store/store'
import { saveShippingAddress } from '@/slices/cartSlice'
import Loader from '@/components/Loader'
import { useProfileMutation } from '@/slices/usersApiSlice'
import { setCredentials } from '@/slices/authSlice'
// import { GetServerSideProps } from 'next'

const ProfilePage = () => {
   const { shippingAddress } = useSelector((state: RootState) => state.cart)
   const { userInfo } = useSelector((state: RootState) => state.auth)

   const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation()

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [address, setAddress] = useState('')
   const [city, setCity] = useState('')
   const [postalCode, setPostalCode] = useState('')

   const [isLoading, setIsLoading] = useState(true);

   const dispatch = useDispatch()
   const router = useRouter()

   useEffect(() => {
      if (!userInfo) {
         router.push('/login');
      } else {
         setIsLoading(false);
         setName(userInfo.name)
         setEmail(userInfo.email)
         setAddress(shippingAddress.address)
         setCity(shippingAddress.city)
         setPostalCode(shippingAddress.postalCode)
      }
   }, [userInfo, shippingAddress, router]);

   const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (password !== confirmPassword) {
         toast.error("Password do not match")
      } else {
         try {
            const res = await updateProfile({ name, email, password }).unwrap()
            dispatch(setCredentials({ ...res }))
            dispatch(saveShippingAddress({ address, city, postalCode }))
            toast.success('Profile Updated Successfully')
         } catch (error) {
            toast.error((error as any)?.data?.message || (error as any)?.message);
         }
      }
   }

   if (isLoading) {
      return <Loader />
   }

   return (
      <div className='mx-auto w-1/3 justify-center my-20'>
         <form onSubmit={submitHandler}>
            <div className='space-y-6 border border-stone-200 shadow-lg shadow-gray-300 rounded-xl py-8 px-10'>

               <div className="flex justify-between items-center gap-10">
                  <h4 className='text-xl'>نام</h4>
                  <input className='w-3/4 border border-stone-300 rounded-md p-2' type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
               </div>
               <div className="flex justify-between items-center gap-10">
                  <h4 className='text-xl'>ایمیل</h4>
                  <input className='w-3/4 border border-stone-300 rounded-md p-2' type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
               </div>
               <div className="flex justify-between items-center gap-10">
                  <h4 className='text-xl'>رمز عبور</h4>
                  <input className='w-3/4 border border-stone-300 rounded-md p-2' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
               </div>
               <div className="flex justify-between items-center gap-10">
                  <h4 className='text-xl'>تایید رمز عبور</h4>
                  <input className='w-3/4 border border-stone-300 rounded-md p-2' type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
               </div>
               <div className="flex justify-between items-center gap-10">
                  <h4 className='text-xl'>شهر</h4>
                  <input className='w-3/4 border border-stone-300 rounded-md p-2' type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
               </div>
               <div className="flex justify-between items-center gap-10">
                  <h4 className='text-xl'>آدرس</h4>
                  <input className='w-3/4 border border-stone-300 rounded-md p-2' type='text' name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
               </div>
               <div className="flex justify-between items-center gap-10">
                  <h4 className='text-xl'>کد پستی</h4>
                  <input className='w-3/4 border border-stone-300 rounded-md p-2' type="text" name="postalCard" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
               </div>

               <button type='submit' className='flex justify-center bg-emerald-600 w-1/3 mx-auto text-xl p-4 rounded-md text-white disabled:bg-gray-400'>
                  {loadingUpdateProfile ? <Loader size={20} /> : <>ثبت</>}
               </button>
            </div>
         </form>
      </div>
   )
}

/*
export const getServerSideProps: GetServerSideProps = async (context) => {
   const { req } = context;
   const token = req.cookies.token; // Or however you manage tokens

   // console.log(req.cookies);

   if (token) {
      return {
         redirect: {
            destination: '/login',
            permanent: false,
         },
      };
   }

   // Optionally validate the token here

   return {
      props: {}, // Pass any props if needed
   };
};
*/

export default ProfilePage
