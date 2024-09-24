import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/store/store'
import Loader from '@/components/Loader'
import { clearCart, savePaymentMethod } from '@/slices/cartSlice'
import ErrorMessage from '@/components/ErrorMessage'
import { useCreateOrderMutation } from '@/slices/ordersApiSlice'
import { toast } from 'react-toastify'
import Image from 'next/image'
import Link from 'next/link'

const PaymentPage = () => {
   const { userInfo } = useSelector((state: RootState) => state.auth)
   const cart = useSelector((state: RootState) => state.cart)

   const [createOrder, { isLoading, error }] = useCreateOrderMutation()
   const [paymentMethod, setPaymentMethod] = useState('PayPal')

   const [isLoadingPage, setIsLoadingPage] = useState(true);

   const dispatch = useDispatch()
   const router = useRouter()

   useEffect(() => {
      if (!userInfo) {
         router.push('/login');
      } else {
         setIsLoadingPage(false);
      }
   }, [userInfo, router]);

   const totalPrice = cart.items.reduce((total, { product, quantity }) => {
      const itemPrice = product.price || 0;
      return total + (itemPrice * quantity);
   }, 0);

   const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch(savePaymentMethod({ paymentMethod }))

      try {
         const validOrderItems = cart.items.map(item => {
            if (!item.product || !item.product._id) {
               console.error('Invalid product in cart item:', item);
               throw new Error('Invalid product in cart item');
            }
            return {
               _id: item.product._id,
               quantity: item.quantity,
               name: item.product.name,
               // image: item.product.image,
            };
         });

         if (!userInfo?.address || !userInfo?.city || !userInfo?.postalCode) {
            router.push('/profile');
            throw new Error('لطفا نشانی ارسال کالا را وارد کنید');
         }

         const res = await createOrder({
            orderItems: validOrderItems,
            shippingAddress: {
               address: userInfo.address,
               city: userInfo.city,
               postalCode: userInfo.postalCode
            },
            paymentMethod: paymentMethod,
            // itemsPrice: cart.itemsPrice,
            // shippingPrice: cart.shippingPrice,
            // taxPrice: cart.taxPrice,
            totalPrice: totalPrice,
         }).unwrap()
         dispatch(clearCart())
         router.push(`/order/${res._id}`)
      } catch (error) {
         toast.error(error instanceof Error ? error.message : JSON.stringify(error))
      }
   }

   if (isLoadingPage) {
      return <Loader />
   }

   if (error) {
      <ErrorMessage>
         {error instanceof Error ? error.message : JSON.stringify(error)}
      </ErrorMessage>
   }

   console.log(error);


   return (
      <div className='mx-6 lg:mx-auto lg:w-1/2 justify-center my-20'>
         <form onSubmit={submitHandler}>
            <div className='space-y-6 border border-stone-200 shadow-lg shadow-gray-300 rounded-xl py-8 px-4 lg:px-10'>

               <div className="space-y-3">
                  <h4 className='text-xl font-semibold'>نشانی ارسال کالا</h4>
                  <p>
                     <strong>شهر: </strong>
                     {userInfo?.city}
                  </p>
                  <p>
                     <strong>آدرس: </strong>
                     {userInfo?.address}
                  </p>
                  <p>
                     <strong>کد پستی: </strong>
                     {userInfo?.postalCode}
                  </p>
               </div>

               <div className="space-y-3">
                  <h4 className='text-xl font-semibold'>محصولات</h4>
                  {cart.items.length === 0 ? (
                     <ErrorMessage>
                        سبد خرید شما خالی است.
                     </ErrorMessage>
                  ) : (
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
                              {cart.items.map((item) => (
                                 <tr key={item.product._id} className='hover:bg-gray-50 border-b text-sm md:text-base'>
                                    <td className='flex items-center gap-2 px-4 py-2 text-right'>
                                       <Image
                                          src={item.product.image}
                                          className='rounded-sm'
                                          alt={item.product.name}
                                          width={40}
                                          height={40}
                                       />
                                       <span>{item.product.name}</span>
                                    </td>
                                    <td className='px-4 py-2 text-center'>{item.product.price}</td>
                                    <td className='px-4 py-2 text-center'>{item.quantity}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  )}
               </div>

               <div className="flex items-end gap-4 font-semibold">
                  <h4 className='text-xl'>قیمت کل:</h4>
                  <span>{totalPrice} تومان</span>
               </div>

               <hr />
               <div className="flex justify-between">
                  <div className='space-y-3'>
                     <h4 className='text-xl font-semibold'>روش پرداخت</h4>
                     <label className='flex gap-3 items-center text-xl'>
                        <span>PayPal</span>
                        <input type="radio" value={paymentMethod} className='accent-theme-color' checked onChange={(e: any) => setPaymentMethod(e.target.value)} />
                     </label>
                  </div>

                  {/* {error && <ErrorMessage>{error instanceof Error ? error.message : JSON.stringify(error)}</ErrorMessage>} */}
                  <button type='submit' className='flex gap-3 justify-center items-center bg-theme-color lg:w-1/3 text-xl p-4 rounded-md text-white disabled:bg-gray-400'>
                     ادامه و پرداخت
                     {isLoading && <Loader />}
                  </button>
               </div>
            </div>
         </form>
      </div>
   )
}

export default PaymentPage
