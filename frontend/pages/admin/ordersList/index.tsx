import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { RootState } from '@/store/store';
import { useGetOrdersQuery } from '@/slices/ordersApiSlice';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';

type User = {
   name: string
};

interface Orders {
   _id: string
   totalPrice: number
   createdAt: string
   isDelivered: boolean
   isPaid: boolean
   paidAt: string
   deliveredAt: string
   user: User
}

const OrdersListPage = () => {
   const dispatch = useDispatch()
   const router = useRouter()

   const [isLoading, setIsLoading] = useState(true);

   const { userInfo } = useSelector((state: RootState) => state.auth)

   const { data: orders, isLoading: loadingOrders, error } = useGetOrdersQuery({})

   useEffect(() => {
      if (!userInfo?.isAdmin) {
         router.push('/login');
      } else {
         setIsLoading(false);
      }
   }, [userInfo, router]);


   if (isLoading) {
      return <Loader />
   }

   return (
      <div className="border border-stone-200 shadow-lg shadow-gray-300 rounded-xl py-8 px-10 m-10">
         {loadingOrders ? (
            <Loader />
         ) : error ? (
            <ErrorMessage>Error</ErrorMessage>
         ) : (
            <div className="border border-gray-200 rounded-lg">
               <table className='min-w-full text-center border-collapse overflow-hidden'>
                  <thead className='bg-gray-100'>
                     <tr>
                        <th className='px-4 py-2 border-b'>سفارش</th>
                        <th className='px-4 py-2 border-b'>کاربر</th>
                        <th className='px-4 py-2 border-b'>تاریخ</th>
                        <th className='px-4 py-2 border-b'>مبلغ</th>
                        <th className='px-4 py-2 border-b'>پرداخت شده</th>
                        <th className='px-4 py-2 border-b'>ارسال</th>
                        <th className='px-4 py-2 border-b'></th>
                     </tr>
                  </thead>
                  <tbody>
                     {orders.slice().reverse().map((order: Orders) => (
                        <tr key={order._id} className='hover:bg-gray-50'>
                           <td className='px-4 py-2 border-b'>{order._id}</td>
                           <td className='px-4 py-2 border-b'>{order.user && order.user.name}</td>
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
         )}
      </div>
   )
}

export default OrdersListPage
