import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/store/store'
import Loader from '@/components/Loader'
import { clearCart, savePaymentMethod } from '@/slices/cartSlice'
import ErrorMessage from '@/components/ErrorMessage'
import { useCreateOrderMutation } from '@/slices/ordersApiSlice'
import { toast } from 'react-toastify'

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
   }, [userInfo, cart.shippingAddress, router]);

   if (!cart.shippingAddress) {
      router.push('/profile');
   }

   const totalPrice = cart.items.reduce((total, { product, quantity }) => {
      const itemPrice = parseFloat(product.price) || 0;
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

         if (!cart.shippingAddress) {
            throw new Error('Shipping address is missing');
         }

         const res = await createOrder({
            orderItems: validOrderItems,
            shippingAddress: cart.shippingAddress,
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

   return (
      <div className='mx-auto w-1/2 justify-center my-20'>
         <form onSubmit={submitHandler}>
            <div className='space-y-6 border border-stone-200 shadow-lg shadow-gray-300 rounded-xl py-8 px-10'>

               <div className="space-y-3">
                  <h4 className='text-xl font-semibold'>نشانی ارسال کالا</h4>
                  <p>
                     <strong>شهر: </strong>
                     {cart.shippingAddress.city}
                  </p>
                  <p>
                     <strong>آدرس: </strong>
                     {cart.shippingAddress.address}
                  </p>
                  <p>
                     <strong>کد پستی: </strong>
                     {cart.shippingAddress.postalCode}
                  </p>
               </div>

               <div className="space-y-3">
                  <h4 className='text-xl font-semibold'>محصولات</h4>
                  {cart.items.length === 0 ? (
                     <ErrorMessage>
                        سبد خرید شما خالی است.
                     </ErrorMessage>
                  ) : (
                     <div>
                        {cart.items.map((item, index) => (
                           <li key={index}>
                              {item.product.name}
                           </li>
                        ))}
                     </div>
                  )}
               </div>

               <hr />
               <div className="flex justify-between">
                  <div className='space-y-3'>
                     <h4 className='text-xl font-semibold'>روش پرداخت</h4>
                     <label className='flex gap-3 items-center text-xl'>
                        <span>PayPal</span>
                        <input type="radio" value={paymentMethod} className='accent-teal-600' checked onChange={(e: any) => setPaymentMethod(e.target.value)} />
                     </label>
                  </div>

                  {error && <ErrorMessage>{error instanceof Error ? error.message : JSON.stringify(error)}</ErrorMessage>}
                  <button type='submit' className='flex gap-3 justify-center items-center bg-emerald-600 w-1/3 text-xl p-4 rounded-md text-white disabled:bg-gray-400'>
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
