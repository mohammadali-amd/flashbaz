import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { RootState } from '@/store/store'
// import { saveShippingAddress } from '@/slices/cartSlice'
import Loader from '@/components/Loader'
import { useProfileMutation } from '@/slices/usersApiSlice'
import { setCredentials } from '@/slices/authSlice'
import { useGetMyOrdersQuery } from '@/slices/ordersApiSlice'
import ErrorMessage from '@/components/ErrorMessage'
import Link from 'next/link'
import Paginate from '@/components/Paginate'
// import { GetServerSideProps } from 'next'

interface Orders {
   _id: string
   totalPrice: number
   createdAt: string
   isDelivered: boolean
   isPaid: boolean
   paidAt: string
   deliveredAt: string
}

const ProfilePage = () => {
   const dispatch = useDispatch()
   const router = useRouter()

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [phone, setPhoneNumber] = useState<string | number>('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const [address, setAddress] = useState('')
   const [city, setCity] = useState('')
   const [postalCode, setPostalCode] = useState('')
   const [isLoading, setIsLoading] = useState(true);

   // const { shippingAddress } = useSelector((state: RootState) => state.cart)
   const { userInfo } = useSelector((state: RootState) => state.auth)

   const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation()

   const pageNumber = parseInt((router.query.page as string) || '1', 10);
   const keyword = (router.query.keyword as string)

   const { data, isLoading: loadingMyOrders, error } = useGetMyOrdersQuery({ keyword, pageNumber })

   useEffect(() => {
      if (!userInfo) {
         router.push('/login');
      } else {
         setIsLoading(false);
         setName(userInfo.name)
         setEmail(userInfo.email)
         setPhoneNumber(userInfo.phone || '')
         setAddress(userInfo.address || '')
         setCity(userInfo.city || '')
         setPostalCode(userInfo.postalCode || '')
      }
   }, [userInfo, router]);

   const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (password !== confirmPassword) {
         toast.error("Password do not match")
      } else {
         try {
            const res = await updateProfile({
               name, email, phone, address, city, postalCode, password
            }).unwrap()
            console.log(res);

            dispatch(setCredentials({ ...res }))
            toast.success('Profile Updated Successfully')
         } catch (error) {
            toast.error((error as any)?.data?.message || (error as any)?.message);
            console.log(error);

         }
      }
   }

   if (isLoading) {
      return <Loader />
   }

   return (
      <div className='my-10 mx-6 lg:mx-20'>
         <h1 className='text-3xl mb-8 font-semibold'>پروفایل</h1>
         <div className='xl:flex xl:gap-10 space-y-10 xl:space-y-0'>
            <div className='xl:w-1/3'>
               <form onSubmit={submitHandler}>
                  <div className='space-y-6 border border-stone-200 shadow-lg shadow-gray-300 rounded-xl py-8 px-10'>
                     <div className="flex justify-between items-center gap-10">
                        <h4 className='text-xl w-1/5'>نام</h4>
                        <input className='w-4/5 border border-stone-300 rounded-md p-2' type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                     </div>
                     <div className="flex justify-between items-center gap-10">
                        <h4 className='text-xl w-1/5'>شماره تماس</h4>
                        <input className='w-4/5 border border-stone-300 rounded-md p-2' type="number" name="phone" value={phone !== 0 ? phone : ''} onChange={(e) => setPhoneNumber(e.target.value)} />
                     </div>
                     <div className="flex justify-between items-center gap-10">
                        <h4 className='text-xl w-1/5'>ایمیل</h4>
                        <input className='w-4/5 border border-stone-300 rounded-md p-2' type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                     </div>
                     <div className="flex justify-between items-center gap-10">
                        <h4 className='text-xl w-1/5'>رمز عبور</h4>
                        <input className='w-4/5 border border-stone-300 rounded-md p-2' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                     </div>
                     <div className="flex justify-between items-center gap-10">
                        <h4 className='text-xl w-1/5'>تایید رمز عبور</h4>
                        <input className='w-4/5 border border-stone-300 rounded-md p-2' type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                     </div>
                     <div className="flex justify-between items-center gap-10">
                        <h4 className='text-xl w-1/5'>شهر</h4>
                        <input className='w-4/5 border border-stone-300 rounded-md p-2' type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
                     </div>
                     <div className="flex justify-between items-center gap-10">
                        <h4 className='text-xl w-1/5'>آدرس</h4>
                        <input className='w-4/5 border border-stone-300 rounded-md p-2' type='text' name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                     </div>
                     <div className="flex justify-between items-center gap-10">
                        <h4 className='text-xl w-1/5'>کد پستی</h4>
                        <input className='w-4/5 border border-stone-300 rounded-md p-2' type="text" name="postalCard" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                     </div>

                     <button type='submit' className='flex justify-center bg-emerald-600 w-full lg:w-1/3 mx-auto text-xl p-4 rounded-md text-white disabled:bg-gray-400'>
                        {loadingUpdateProfile ? <Loader size={20} /> : <>ثبت</>}
                     </button>
                  </div>
               </form>
            </div>
            <div className="xl:w-2/3 space-y-6 border border-stone-200 shadow-lg shadow-gray-300 rounded-xl p-5">
               {loadingMyOrders ? (
                  <Loader />
               ) : error ? (
                  <ErrorMessage>Error</ErrorMessage>
               ) : (
                  <div>
                     <div className="border border-gray-200 rounded-lg overflow-auto">
                        <table className='min-w-full text-center border-collapse'>
                           <thead className='bg-gray-100'>
                              <tr>
                                 <th className='px-4 py-2 border-b'>سفارش</th>
                                 <th className='px-4 py-2 border-b'>تاریخ</th>
                                 <th className='px-4 py-2 border-b'>مبلغ</th>
                                 <th className='px-4 py-2 border-b'>پرداخت شده</th>
                                 <th className='px-4 py-2 border-b'>ارسال</th>
                                 <th className='px-4 py-2 border-b'></th>
                              </tr>
                           </thead>
                           <tbody>
                              {data.orders.map((order: Orders) => (
                                 <tr key={order._id} className='hover:bg-gray-50'>
                                    <td className='px-4 py-2 border-b'>{order._id}</td>
                                    <td className='px-4 py-2 border-b'>{order.createdAt.substring(0, 10)}</td>
                                    <td className='px-4 py-2 border-b'>{order.totalPrice}</td>
                                    <td className='px-4 py-2 border-b'>
                                       {order.isPaid ? (
                                          order.paidAt.substring(0, 10)
                                       ) : (
                                          <span className='text-red-600'>✖</span>
                                       )}
                                    </td>
                                    <td className='px-4 py-2 border-b'>
                                       {order.isDelivered ? (
                                          order.deliveredAt.substring(0, 10)
                                       ) : (
                                          <span className='text-red-600'>✖</span>
                                       )}
                                    </td>
                                    <td className='px-4 py-2 border-b'>
                                       <Link href={`/order/${order._id}`} className='text-teal-600'>
                                          جزئیات
                                       </Link>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>

                     </div>
                     <div className='mt-6'>
                        <Paginate totalPages={data.pages} currentPage={data.page} />
                     </div>
                  </div>
               )}
            </div>
         </div>
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
