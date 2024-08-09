import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';

import Search from './Search';
import Logo from '../Logo';
import Cart from './Cart';
import LoginButton from './LoginButton';

const Header = () => {
   const [isClient, setIsClient] = useState(false)
   const [isToggle, setIsToggle] = useState(false)

   const dropdownRef = useRef<HTMLDivElement | null>(null);

   const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
         setIsToggle(false);
      }
   };

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
               <Logo />
               {/* Search */}
               <Search />
            </div>
            {isClient && (
               <div className='flex items-center gap-8'>
                  {/* Login/Signup */}
                  <LoginButton isToggle={isToggle} dropdownRef={dropdownRef} setIsToggle={setIsToggle} />
                  {/* Cart */}
                  <Cart />
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
