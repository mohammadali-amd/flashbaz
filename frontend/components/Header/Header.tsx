import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Search from './Search';
import Logo from '../Logo';
import Cart from './Cart';
import LoginButton from './LoginButton';

const links = [
   { name: 'صفحه اصلی', slug: '/' },
   { name: 'فروشگاه', slug: '/products' },
   { name: 'مقالات', slug: '/#pricing' },
   { name: 'درباره ما', slug: '/#about' },
   { name: 'تماس با ما', slug: '/#contact-us' },
];

const Header: React.FC = () => {
   const [isClient, setIsClient] = useState(false);
   const [isToggle, setIsToggle] = useState(false);
   const [mobileMenu, setMobileMenu] = useState(false);
   const [isScroll, setIsScroll] = useState(0);

   const dropdownRef = useRef<HTMLDivElement | null>(null);
   const mobileMenuRef = useRef<HTMLDivElement | null>(null);

   const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
         const isLink = (event.target as HTMLElement).closest('div[role="menu"]');
         if (!isLink) {
            setIsToggle(false);
         }
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
         setMobileMenu(false);
      }
   };

   const mobileMenuHandler = () => {
      setMobileMenu((prev) => !prev);
   };

   const handleScroll = () => {
      setIsScroll(window.scrollY);
   };

   useEffect(() => {
      setIsClient(true);
      window.addEventListener('scroll', handleScroll);
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         window.removeEventListener('scroll', handleScroll);
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   return (
      <header className={`px-5 sm:px-10 md:px-20 pt-2 lg:pt-5 pb-3 shadow-md border-b border-stone-300 sticky top-0 z-30 transition-all duration-200 bg-white ${isScroll > 0 ? '-translate-y-12 md:-translate-y-0 lg:h-24' : 'lg:h-36'}`}>
         <div className={`flex items-center justify-between md:hidden`}>
            {/* Mobile Menu Button */}
            <button onClick={mobileMenuHandler}>
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
         <div className={`hidden md:flex pt-5 ${isScroll > 0 ? 'md:hidden' : ''}`}>
            <ul className="flex gap-8 md:gap-16">
               {links.map((link) => (
                  <li key={link.slug}>
                     <Link href={link.slug}>{link.name}</Link>
                  </li>
               ))}
            </ul>
         </div>

         {/* Mobile Menu */}
         <div ref={mobileMenuRef} className={`${mobileMenu ? 'translate-x-0' : 'translate-x-full'} ${isScroll > 0 ? 'translate-y-12 ' : ''} fixed z-20 right-0 bottom-0 h-full w-4/5 bg-slate-100 shadow-2xl transition-transform duration-200`}>
            <i onClick={mobileMenuHandler} className="lni lni-close text-3xl absolute left-0 top-0 pl-6 pt-4 cursor-pointer"></i>
            <div className="relative">
               <ul className="flex flex-col items-center content-start mt-16">
                  {links.map((link) => (
                     <li key={link.slug} className="py-5 text-xl">
                        <Link href={link.slug} onClick={mobileMenuHandler} className='hover:text-emerald-600'>{link.name}</Link>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </header>
   );
};

export default Header;
