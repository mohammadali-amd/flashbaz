import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { addItem, clearCart, removeItem } from '@/slices/cartSlice';
import { RootState } from '@/store/store'
import { Product } from '@/types/types';
import { PersianNumber } from '@/utils/PersianNumber';
import Link from 'next/link';

const Cart = () => {
   const dispatch = useDispatch();
   const [isClient, setIsClient] = useState(false)
   const cartItems = useSelector((state: RootState) => state.cart.items);

   // Hydration error: Initial UI does not match server render.
   // To prevent Hydration error, ensure consistency between server-side and client-side rendering. 👇
   useEffect(() => {
      setIsClient(true)
   }, []);

   const handleAddItem = (product: Product) => {
      dispatch(addItem(product));
   };

   const handleRemoveItem = (id: number) => {
      dispatch(removeItem(id));
   };

   const handleClearCart = () => {
      dispatch(clearCart());
   };

   const totalPrice = cartItems.reduce((total, { product, quantity }) => {
      const itemPrice = parseFloat(product.price) || 0;
      return total + (itemPrice * quantity);
   }, 0);

   return (
      <div className='mx-20 my-5'>
         <h2 className='text-4xl my-8 font-medium'>
            سبد خرید
         </h2>

         {isClient && cartItems.length === 0 ? (
            <div className='flex justify-between items-center md:w-1/4 text-lg bg-cyan-300 text-cyan-800 border border-cyan-800 rounded-md p-4 my-4'>
               <p>
                  سبد خرید شما خالی می باشد.
               </p>
               <Link href={'/products'} className='hover:text-white bg-cyan-500 hover:bg-cyan-600 rounded-md p-3 duration-200'>
                  ادامه خرید
               </Link>
            </div>
         ) : (
            <div className='flex justify-between gap-14'>
               {/* Cart */}
               <div className='w-3/4 space-y-8'>
                  {isClient && cartItems.map((item, index) => (
                     <div key={index} className="flex justify-between gap-6 border border-stone-200 shadow-lg  shadow-gray-300 rounded-xl py-8 px-10">
                        <div>
                           <h3 className='text-2xl'>
                              {item.product.name}
                           </h3>
                           <div className='text-stone-600 space-y-4 mt-10'>
                              <h4 className='flex items-center gap-2'>
                                 <i className="lni lni-drop"></i>
                                 آبی
                              </h4>
                              <h4 className='flex items-center gap-2'>
                                 <i className="lni lni-checkmark-circle"></i>
                                 18 ماه گارانتی
                              </h4>
                              <h4 className='flex items-center gap-2'>
                                 <i className="lni lni-checkmark-circle"></i>
                                 موجود در انبار
                              </h4>
                           </div>
                        </div>
                        <div>
                           {/* Product Photo */}
                           <div className='text-left mb-6'>
                              <i className="lni lni-image text-[14rem] text-stone-600"></i>
                           </div>
                           <div className='border border-stone-300 rounded-lg p-4'>
                              <h4 className='text-xl text-left pb-2'>
                                 {PersianNumber(parseInt(item.product.price).toLocaleString())} تومان
                              </h4>
                              <div className="flex justify-between items-center gap-3">
                                 <button onClick={() => handleAddItem(item.product)} className="lni lni-plus text-2xl cursor-pointer border border-stone-200 rounded-md p-2 hover:shadow-md duration-200 hover:border-stone-300"></button>
                                 <span className='text-xl font-medium'>
                                    {item.quantity}
                                 </span>
                                 <button
                                    onClick={() => handleRemoveItem(item.product._id)}
                                    className={
                                       `${item.quantity === 1 ? "lni lni-trash-can" : "lni lni-minus"}` +
                                       " text-2xl cursor-pointer border border-stone-200 rounded-md p-2 hover:shadow-md duration-200 hover:border-stone-300"
                                    }
                                 ></button>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}

               </div>
               {/* Submit */}
               <div className='w-1/4 min-w-fit'>
                  <div className='space-y-6 border border-stone-200 shadow-lg  shadow-gray-300 rounded-xl py-8 px-10'>
                     <div className="flex justify-between gap-20">
                        <h4>قیمت محصولات</h4>
                        <h5>{isClient && PersianNumber(totalPrice.toLocaleString())} تومان</h5>
                     </div>
                     <div className="flex justify-between gap-20 text-red-600">
                        <h4>تخفیف محصولات</h4>
                        <h5>0 تومان</h5>
                     </div>
                     <div className="flex justify-between gap-20 font-medium">
                        <h4>جمع کل</h4>
                        <h5>{isClient && PersianNumber(totalPrice.toLocaleString())} تومان</h5>
                     </div>

                     <button className='flex justify-center bg-emerald-600 w-full text-xl p-4 rounded-md text-white'>
                        تایید و تکمیل سفارش
                     </button>
                  </div>
               </div>

            </div>
         )}
      </div>
   )
}

export default Cart
