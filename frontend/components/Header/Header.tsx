import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Search from './Search';
import Logo from '../Logo';
import Cart from './Cart';
import LoginButton from './LoginButton';
import { useScrollDirection } from '@/utils/ScrollDirection';
import { useClickOutside } from '@/utils/ClickOutside';
import { useIsClient } from '@/utils/useIsClient';

const links = [
   { name: 'صفحه اصلی', slug: '/' },
   { name: 'فروشگاه', slug: '/products' },
   { name: 'مقالات', slug: '/#pricing' },
   { name: 'درباره ما', slug: '/#about' },
   { name: 'تماس با ما', slug: '/#contact-us' },
];

const Header: React.FC = () => {
   const isClient = useIsClient()

   const [isToggle, setIsToggle] = useState(false);
   const [mobileMenu, setMobileMenu] = useState(false);

   const dropdownRef = useRef<HTMLDivElement | null>(null);
   const mobileMenuRef = useRef<HTMLDivElement | null>(null);

   useClickOutside(dropdownRef, () => setIsToggle(false));
   useClickOutside(mobileMenuRef, () => setMobileMenu(false));

   // Detect scroll direction
   const isScrolledUp = useScrollDirection(50);

   return (
      <header className={`px-5 sm:px-10 md:px-20 pt-2 lg:pt-5 pb-3 shadow-md border-b border-stone-300 sticky top-0 z-30 transition-all duration-200 bg-white ${isScrolledUp ? '-translate-y-16 md:-translate-y-0 lg:h-[6rem]' : 'lg:h-[8.5rem]'}`}>
         <div className={`flex items-center justify-between md:hidden`}>
            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenu(!mobileMenu)}>
               <i className="lni lni-menu text-2xl"></i>
            </button>
            {/* Logo */}
            <Logo />
            {/* Login Button */}
            {isClient && (
               <LoginButton isToggle={isToggle} dropdownRef={dropdownRef} setIsToggle={setIsToggle} />
            )}
         </div>

         <div className="flex items-center justify-between gap-4 mt-3 lg:mt-4 md:hidden">
            {/* Search */}
            <Search />
            {/* Cart */}
            {isClient && (
               <Cart />
            )}
         </div>

         {/* Desktop Header */}
         <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center gap-5 sm:gap-10">
               <Logo />
               <Search />
            </div>
            {isClient && (
               <div className="flex items-center gap-8">
                  <LoginButton isToggle={isToggle} dropdownRef={dropdownRef} setIsToggle={setIsToggle} />
                  <Cart />
               </div>
            )}
         </div>

         {/* Pages link */}
         <div className={`hidden md:flex pt-5 ${isScrolledUp ? 'hidden lg:opacity-0 duration-0' : 'duration-200'}`}>
            <ul className="flex gap-8 md:gap-16">
               {links.map((link) => (
                  <li key={link.slug} className='hover:text-theme-color duration-100'>
                     <Link href={link.slug}>{link.name}</Link>
                  </li>
               ))}
            </ul>
         </div>

         {/* Mobile Menu */}
         <div ref={mobileMenuRef} className={`${mobileMenu ? 'translate-x-0' : 'translate-x-full'} ${isScrolledUp ? 'translate-y-12' : ''} fixed z-20 right-0 bottom-0 h-full w-4/5 bg-slate-100 shadow-2xl transition-transform duration-200`}>
            <i onClick={() => setMobileMenu(false)} className="lni lni-close text-3xl absolute left-0 top-0 pl-6 pt-4 cursor-pointer"></i>
            <div className="relative">
               <ul className="flex flex-col items-center content-start mt-16">
                  {links.map((link) => (
                     <li key={link.slug} className="py-5 text-xl">
                        <Link href={link.slug} onClick={() => setMobileMenu(false)} className='hover:text-theme-color'>{link.name}</Link>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </header>
   );
};

export default Header;
