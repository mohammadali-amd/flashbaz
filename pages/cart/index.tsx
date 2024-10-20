import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { addItem, clearCart, removeItem } from '@/slices/cartSlice';
import { RootState } from '@/store/store'
import type { Color, Product } from '@/types/types';
import { PersianNumber } from '@/utils/PersianNumber';
import { useIsClient } from '@/hooks/useIsClient';
import Breadcrumb from '@/components/UI/Breadcrumb';
import { IoTrashOutline } from 'react-icons/io5';

const Cart = () => {
   const isClient = useIsClient();
   const router = useRouter()

   const dispatch = useDispatch();
   const cartItems = useSelector((state: RootState) => state.cart.items);

   const handleAddItem = (product: Product, color: Color) => dispatch(addItem({ product, color }));
   const handleRemoveItem = (id: number) => dispatch(removeItem(id));
   const handleClearCart = () => dispatch(clearCart());

   const totalPrice = cartItems.reduce((total, { product, quantity }) => {
      const itemPrice = product.price || 0;
      return total + (itemPrice * quantity);
   }, 0);

   const totalPriceWithOff = cartItems.reduce((total, { product, quantity }) => {
      const itemPrice = product.priceWithOff || 0;
      return total + (itemPrice * quantity);
   }, 0);

   const discount = totalPrice - totalPriceWithOff

   return (
      <div className='mx-6 lg:mx-20 my-5'>
         <Breadcrumb
            items={[
               { name: 'صفحه اصلی', slug: '/' },
               { name: 'سبد خرید', slug: '/cart' },
            ]}
         />
         <div className='flex justify-between items-center'>
            <h2 className='text-4xl my-8 font-medium'>
               سبد خرید
            </h2>
            {isClient && cartItems.length > 0 && (
               <button className='flex items-center gap-1 bg-theme-color py-1 px-2 rounded-md text-white text-sm' onClick={handleClearCart}>
                  حذف کل سبد
                  <IoTrashOutline />
               </button>
            )}
         </div>

         {isClient && cartItems.length === 0 ? (
            <div className='lg:flex gap-4 items-center text-lg mt-4 mb-20'>
               <p className='mb-8 lg:mb-0'>
                  سبد خرید شما خالی می باشد.
               </p>
               <Link href={'/products'} className='text-white bg-theme-color hover:bg-theme-color/90 rounded-md py-2 px-3 duration-200'>
                  ادامه خرید
               </Link>
            </div>
         ) : (
            <div className='lg:flex justify-between gap-14'>
               {/* Cart */}
               <div className='lg:w-3/4 space-y-8'>
                  {isClient && cartItems.map((item) => (
                     <div key={item.product._id + item.color.code} className="md:flex justify-between gap-6 border-t md:border md:border-stone-200 md:shadow-lg  md:shadow-gray-300 md:rounded-xl py-8 md:px-10 space-y-6 md:space-y-0">
                        <div>
                           <Link href={`/products/${item.product.category.slug ? `${item.product.category.slug}/` : ''}${item.product.subcategory?.slug ? `${item.product.subcategory?.slug}/` : ''}${item.product._id}`} className='text-lg lg:text-2xl'>
                              {item.product.name}
                           </Link>
                           <div className='text-stone-600 space-y-4 mt-10'>
                              <h4 className='flex items-center gap-2'>
                                 <i className="lni lni-drop"></i>
                                 {item.color?.name}
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
                           <div className='mb-6'>
                              {/* <i className="lni lni-image text-[14rem] text-stone-600"></i> */}
                              <Image
                                 src={item.product.image}
                                 className='rounded-md lg:rounded-xl'
                                 alt={item.product.name}
                                 loading='lazy'
                                 width={300}
                                 height={300}
                              />
                           </div>
                           <div className='flex justify-center'>
                              <div className='lg:border lg:border-stone-300 lg:rounded-lg lg:p-4 wfit'>
                                 <h4 className='text-xl text-left pb-2'>
                                    {PersianNumber(item.product.priceWithOff.toLocaleString())}
                                    <span className='line-through px-2 text-base'>
                                       {PersianNumber(item.product.price.toLocaleString())}
                                    </span>
                                    <span className='pr-2'>تومان</span>
                                 </h4>
                                 <div className="flex justify-between items-center gap-3">
                                    <button onClick={() => handleAddItem(item.product, item.color)} className="lni lni-plus text-xl cursor-pointer border border-stone-200 rounded-md p-2 hover:shadow-md duration-200 hover:border-stone-300"></button>
                                    <span className='text-xl font-medium'>
                                       {PersianNumber(item.quantity.toLocaleString())}
                                    </span>
                                    <button
                                       onClick={() => handleRemoveItem(item.product._id)}
                                       className={
                                          `${item.quantity === 1 ? "lni lni-trash-can" : "lni lni-minus"}` +
                                          " text-xl cursor-pointer border border-stone-200 rounded-md p-2 hover:shadow-md duration-200 hover:border-stone-300"
                                       }
                                    ></button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}

               </div>
               {/* Submit */}
               <div className='lg:w-1/4 min-w-fit mt-10 lg:mt-0'>
                  <div className='space-y-6 border border-stone-200 shadow-lg  shadow-gray-300 rounded-xl py-8 px-6 md:px-10'>
                     <div className="flex justify-between">
                        <h4>قیمت محصولات</h4>
                        <h5>{isClient && PersianNumber(totalPrice.toLocaleString())} تومان</h5>
                     </div>
                     <div className="flex justify-between text-red-600">
                        <h4>تخفیف محصولات</h4>
                        <h5>{isClient && PersianNumber(discount.toLocaleString())} تومان</h5>
                     </div>
                     <div className="flex justify-between font-medium">
                        <h4>جمع کل</h4>
                        <h5>{isClient && PersianNumber(totalPriceWithOff.toLocaleString())} تومان</h5>
                     </div>

                     <button onClick={() => { router.push('payment') }} className='flex justify-center bg-theme-color w-full text-xl p-4 rounded-md text-white'>
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
