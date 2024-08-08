import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { useLogoutMutation } from '@/slices/usersApiSlice';
import { logout } from '@/slices/authSlice'
import { PersianNumber } from '@/utils/PersianNumber';
import Search from './Search';
import { resetCart } from '@/slices/cartSlice';

const Header = () => {
   const [isToggle, setIsToggle] = useState(false)
   const [isClient, setIsClient] = useState(false)
   const dropdownRef = useRef<HTMLDivElement | null>(null);

   const router = useRouter()
   const dispatch = useDispatch()
   const [logoutApiCall] = useLogoutMutation()

   const cartItems = useSelector((state: RootState) => state.cart.items);

   const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

   const { userInfo } = useSelector((state: RootState) => state.auth);

   const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
         setIsToggle(false);
      }
   };

   const logoutHandler = async () => {
      try {
         await logoutApiCall('userInfo').unwrap()
         dispatch(logout())
         dispatch(resetCart())
         router.push('/login')
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      setIsClient(true)
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

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
               <Search />
            </div>
            {isClient && (
               <div className='flex items-center gap-8'>
                  {/* Login/Signup */}
                  {userInfo ? (
                     <div ref={dropdownRef} className="relative inline-block text-left">
                        <div>
                           <button type="button" className="inline-flex items-end w-full justify-center gap-x-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-black hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true"
                              onClick={() => setIsToggle((prev) => !prev)}
                           >
                              <span>{userInfo?.name}</span>
                              <i className="lni lni-user text-xl"></i>
                           </button>
                        </div>
                        <div className={`${isToggle ? '' : 'hidden'} absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                           <div className="py-1" role="none">
                              <Link href="/profile" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">پروفایل</Link>
                              {userInfo.isAdmin && (
                                 <>
                                    <Link href="/admin" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">مدیریت</Link>
                                    <Link href="/admin/productsList" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">لیست محصولات</Link>
                                    <Link href="/admin/ordersList" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">لیست سفارشات</Link>
                                    <Link href="/admin/usersList" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">لیست کاربران</Link>
                                 </>
                              )}
                              <button onClick={logoutHandler} className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabIndex={-1} id="menu-item-3">خروج</button>
                           </div>
                        </div>
                     </div>
                  ) : (
                     <Link href={'/login'} className="border border-black rounded-lg py-2 px-4">
                        ورود | ثبت نام
                     </Link>
                  )}
                  {/* Cart */}
                  <div className='relative'>
                     <Link href={'/cart'}>
                        <i className="lni lni-cart border border-black rounded-lg py-1 px-2 text-2xl"></i>
                        <span className='absolute bottom-1 right-1 bg-red-600 rounded-full text-white px-1 text-xs'>
                           {PersianNumber(totalQuantity.toString())}
                        </span>
                     </Link>
                  </div>
               </div>
            )}
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
