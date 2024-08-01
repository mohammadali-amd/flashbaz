import { useRouter } from 'next/router'

import { useGetOrderDetailsQuery } from '@/slices/ordersApiSlice'
import Loader from '@/components/Loader'
import ErrorMessage from '@/components/ErrorMessage'
import { PersianNumber } from '@/utils/PersianNumber'

const OrderPage = () => {
   const router = useRouter()
   const orderId = router.query.id

   const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)

   console.log(order);

   if (isLoading) {
      return <Loader />
   }

   if (error) {
      return <ErrorMessage>ABCD</ErrorMessage>
   }

   return (
      <div className='mx-20 my-5'>
         <h2 className='text-4xl my-8 font-medium'>
            شماره سفارش {order._id}
         </h2>

         <div className='flex justify-between gap-14'>
            <div className='w-3/4 space-y-8 border border-stone-200 shadow-lg  shadow-gray-300 rounded-xl py-8 px-10'>
               {/* User Info */}
               <div>
                  <h2>مشخصات کاربر</h2>
                  <h3>نام: {order.user.name}</h3>
                  <h3>ایمیل: {order.user.email}</h3>
                  <h3>آدرس: {order.shippingAddress.address}</h3>
                  {order.isDelivered ? (
                     <p className='flex justify-between items-center md:w-1/4 text-lg bg-green-300 text-green-700 border border-green-700 rounded-md p-4 my-4'>
                        در تاریخ {order.deliveredAt} ارسال شده
                     </p>
                  ) : (
                     <p className='flex justify-between items-center md:w-1/4 text-lg bg-red-300 text-red-800 border border-red-800 rounded-md p-4 my-4'>
                        ارسال نشده
                     </p>
                  )}
               </div>
               <hr />
               {/* Payment */}
               <div>
                  <h2>وضعیت پرداخت</h2>
                  {order.isPaid ? (
                     <p className='flex justify-between items-center md:w-1/4 text-lg bg-green-300 text-green-700 border border-green-700 rounded-md p-4 my-4'>
                        در تاریخ {order.paidAt} پرداخت شده
                     </p>
                  ) : (
                     <p className='flex justify-between items-center md:w-1/4 text-lg bg-red-300 text-red-800 border border-red-800 rounded-md p-4 my-4'>
                        پرداخت نشده
                     </p>
                  )}
               </div>
               <hr />
               {/* Orders */}
               <div>
                  {order.orderItems.map((item: any) => (
                     <div key={item._id} >
                        <div>
                           <h3 className='text-2xl'>
                              {item.name}
                           </h3>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            {/* Submit */}
            <div className='w-1/4 min-w-fit'>
               <div className='space-y-6 border border-stone-200 shadow-lg  shadow-gray-300 rounded-xl py-8 px-10'>
                  <div className="flex justify-between gap-20">
                     <h4>قیمت محصولات</h4>
                     <h5>تومان {PersianNumber(parseFloat(order.itemsPrice).toLocaleString())}</h5>
                  </div>
                  <div className="flex justify-between gap-20">
                     <h4>هزینه ارسال</h4>
                     <h5>تومان {PersianNumber(parseFloat(order.shippingPrice).toLocaleString())}</h5>
                  </div>
                  <div className="flex justify-between gap-20">
                     <h4>مالیات</h4>
                     <h5>تومان {PersianNumber(parseFloat(order.taxPrice).toLocaleString())}</h5>
                  </div>
                  <div className="flex justify-between gap-20 font-medium">
                     <h4>جمع کل</h4>
                     <h5>تومان {PersianNumber(parseFloat(order.totalPrice).toLocaleString())}</h5>
                  </div>

                  <button className='flex justify-center bg-emerald-600 w-full text-xl p-4 rounded-md text-white'>
                     تایید و تکمیل سفارش
                  </button>
               </div>
            </div>

         </div>
      </div>
   )
}

export default OrderPage
