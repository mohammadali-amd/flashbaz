import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { type RootState } from '@/store/store';
import { useGetOrdersQuery } from '@/slices/ordersApiSlice';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';
import Paginate from '@/components/Paginate';

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
   const router = useRouter()

   const [isLoading, setIsLoading] = useState(true);

   const { userInfo } = useSelector((state: RootState) => state.auth)

   const pageNumber = parseInt((router.query.page as string) || '1', 10);
   const keyword = (router.query.keyword as string)

   const { data, isLoading: loadingOrders, error } = useGetOrdersQuery({ keyword, pageNumber })

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

      <div className="border border-stone-200 shadow-lg shadow-gray-300 rounded-xl 10 px-3 py-6 lg:p-8 mx-6 lg:mx-20 my-10 space-y-5">
         <h1 className='px-2 text-center lg:text-right text-3xl'>
            لیست سفارشات
         </h1>
         {loadingOrders ? (
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
                           <th className='px-4 py-2 border-b'>کاربر</th>
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
                                 <Link href={`/order/${order._id}`} className='text-theme-color'>
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
   )
}

export default OrdersListPage
