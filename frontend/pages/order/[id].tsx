import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { useDeliverOrderMutation, useGetOrderDetailsQuery, useGetPayPalClientIdQuery, usePayOrderMutation } from '@/slices/ordersApiSlice'
import Loader from '@/components/Loader'
import ErrorMessage from '@/components/ErrorMessage'
import { PersianNumber } from '@/utils/PersianNumber'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Image from 'next/image'
import Link from 'next/link'

const OrderPage = () => {
   const router = useRouter()
   const orderId = router.query.id

   const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)

   const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()

   const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation({})

   // const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery({})

   const { userInfo } = useSelector((state: RootState) => state.auth)

   const onApproveTest = async () => {
      try {
         await payOrder({ orderId, details: { payer: {} } }).unwrap()
         refetch()
         toast.success('عملیات پرداخت با موفقیت انجام شد.')
      } catch (error) {
         console.log(error);
      }
   }

   const deliverOrderHandler = async () => {
      try {
         await deliverOrder(orderId)
         refetch()
         toast.success('Order Delivered')
      } catch (error) {
         toast.error((error as any)?.data?.message || (error as any)?.message);
      }
   }

   if (isLoading) {
      return <Loader />
   }

   if (error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error)
      return <ErrorMessage>{errMsg}</ErrorMessage>
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
                     <p className='flex justify-between items-center w-fit text-lg bg-green-300 text-green-700 border border-green-700 rounded-md p-4 my-4'>
                        در تاریخ {order.deliveredAt} ارسال شده
                     </p>
                  ) : (
                     <div className='flex gap-3'>
                        <p className='flex justify-between items-center w-fit text-lg bg-red-300 text-red-800 border border-red-800 rounded-md p-4 my-4'>
                           ارسال نشده
                        </p>
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                           <button onClick={deliverOrderHandler} className='flex justify-between items-center text-lg bg-cyan-300 text-cyan-800 border border-cyan-800 rounded-md p-4 my-4'>
                              ارسال شد ✔
                           </button>
                        )}
                     </div>
                  )}
               </div>
               <hr />
               {/* Payment */}
               <div>
                  <h2>وضعیت پرداخت</h2>
                  {order.isPaid ? (
                     <p className='flex justify-between items-center w-fit text-lg bg-green-300 text-green-700 border border-green-700 rounded-md p-4 my-4'>
                        در تاریخ {order.paidAt} پرداخت شده
                     </p>
                  ) : (
                     <p className='flex justify-between items-center w-fit text-lg bg-red-300 text-red-800 border border-red-800 rounded-md p-4 my-4'>
                        پرداخت نشده
                     </p>
                  )}
               </div>
               <hr />
               {/* Orders */}
               <div className="border border-gray-200 rounded-lg">
                  <table className='min-w-full border-collapse overflow-hidden'>
                     <thead className='bg-gray-100 border-b'>
                        <tr>
                           <th className='px-4 py-2 text-right'>نام محصول</th>
                           <th className='px-4 py-2 text-center'>فی ($)</th>
                           <th className='px-4 py-2 text-center'>تعداد</th>
                        </tr>
                     </thead>
                     <tbody>
                        {order.orderItems.map((item: any) => (
                           <tr key={item._id} className='hover:bg-gray-50 border-b'>
                              <td className='flex items-center gap-2 px-4 py-2 text-right'>
                                 <Image
                                    src={item.image}
                                    className='rounded-sm'
                                    alt={item.name}
                                    width={40}
                                    height={40}
                                 />
                                 <Link href={`/products/${item.product}`}>{item.name}</Link>
                              </td>
                              <td className='px-4 py-2 text-center'>{item.price}</td>
                              <td className='px-4 py-2 text-center'>{item.qty}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
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

                  {!order.isPaid && (
                     <button onClick={onApproveTest} className='flex justify-center items-center gap-3 bg-emerald-600 w-full text-xl p-4 rounded-md text-white'>
                        پرداخت
                        {loadingPay && <Loader size={20} />}
                     </button>
                  )}
               </div>
            </div>

         </div>
      </div>
   )
}

export default OrderPage
