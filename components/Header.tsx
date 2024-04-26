import { PersianNumber } from '@/hooks/PersianNumber';
import { RootState } from '@/store/store';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Header = () => {
   const [query, setQuery] = useState('');
   const [isClient, setIsClient] = useState(false)

   useEffect(() => {
      setIsClient(true)
   }, []);

   const cartItems = useSelector((state: RootState) => state.cart.items);
   const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

   return (
      <div className='hidden lg:block px-20 pt-5 pb-3 shadow-md border-b border-stone-300'>
         <div className="flex items-center justify-between">
            <div className='flex items-center gap-10'>
               {/* Logo */}
               <div className="flex items-center gap-3">
                  <i className="lni lni-image rounded-full border border-stone-400 text-6xl overflow-hidden text-stone-700"></i>
                  <p className='text-2xl'>نام برند</p>
               </div>
               {/* Search */}
               <div className="relative">
                  <input
                     type="text"
                     className='bg-stone-200 rounded-lg p-4 pr-14 w-[40rem]'
                     placeholder='جستجو'
                     value={query}
                     onChange={(e) => setQuery(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                     <i className="lni lni-search-alt text-3xl text-stone-500"></i>
                  </div>
               </div>
            </div>
            <div className='flex items-center gap-8'>
               {/* Login/Signup */}
               <Link href={''} className="border border-black rounded-lg py-2 px-4">
                  ورود | ثبت نام
               </Link>
               {/* Cart */}
               <div className='relative'>
                  <Link href={'/cart'}>
                     <i className="lni lni-cart border border-black rounded-lg py-1 px-2 text-2xl"></i>
                     <span className='absolute bottom-1 right-1 bg-red-600 rounded-full text-white px-1 text-xs'>
                        {isClient && PersianNumber(totalQuantity.toString())}
                     </span>
                  </Link>
               </div>
            </div>
         </div>
         {/* Pages link */}
         <div className="flex pt-5">
            <ul className='flex gap-16'>
               <li>
                  <Link href='/'>صفحه اصلی</Link>
               </li>
               <li>
                  <Link href={"/products"}>فروشگاه</Link>
               </li>
               <li>
                  <Link href={"#"}>مقالات</Link>
               </li>
               <li>
                  <Link href={"#"}>درباره ما</Link>
               </li>
               <li>
                  <Link href={"#"}>تماس با ما</Link>
               </li>
            </ul>
         </div>
      </div>
   )
}

export default Header
