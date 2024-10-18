import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Search from './Search';
import Logo from '../Logo';
import Cart from './Cart';
import LoginButton from './LoginButton';
import MegaMenu from './MegaMenu/MegaMenu';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useIsClient } from '@/hooks/useIsClient';
import MobileMenu from './MobileMenu';
import MobileMegaMenu from './MegaMenu/MobileMegaMenu';
import { IoCloseOutline } from 'react-icons/io5';
import { FaChevronLeft } from 'react-icons/fa6';

const links = [
   { name: 'فروشگاه', slug: '/products' },
   { name: 'مقالات', slug: '/#pricing' },
   { name: 'درباره ما', slug: '/#about' },
   { name: 'تماس با ما', slug: '/#contact-us' },
];

const Header: React.FC = () => {
   const isClient = useIsClient()

   const [isToggleDesktop, setIsToggleDesktop] = useState(false);
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

   const dropdownRefDesktop = useRef<HTMLDivElement | null>(null);
   const mobileMenuRef = useRef<HTMLDivElement | null>(null);

   useClickOutside(dropdownRefDesktop, () => setIsToggleDesktop(false));
   useClickOutside(mobileMenuRef, () => setMobileMenuOpen(false));

   // Detect scroll direction
   const isScrolledUp = useScrollDirection(50);

   return (
      <header className={`px-4 sm:px-10 md:px-20 pt-1 lg:pt-5 pb-2 shadow-md border-b border-stone-300 sticky top-0 right-0 z-30 transition-all duration-200 bg-white ${isScrolledUp ? 'lg:h-[6rem]' : 'lg:h-[8.5rem]'}`}>
         <div className={`md:hidden`}>
            {/* Mobile Menu Button */}
            {isClient && <MobileMenu mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />}
         </div>

         <div className="flex items-center justify-between gap-4 mt-3 lg:mt-4 md:hidden">
            {/* Logo */}
            <Logo />
            {/* Search */}
            <Search />
         </div>

         {/* Desktop Header */}
         <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center gap-5 sm:gap-10">
               <Logo />
               <Search />
            </div>
            {isClient && (
               <div className="flex items-center gap-8">
                  <LoginButton isToggle={isToggleDesktop} dropdownRef={dropdownRefDesktop} setIsToggle={setIsToggleDesktop} />
                  <Cart />
               </div>
            )}
         </div>

         {/* Pages link */}
         <div className={`hidden md:flex items-center pt-5 ${isScrolledUp ? 'hidden lg:opacity-0 duration-0' : 'duration-200'}`}>
            {isClient && (<MegaMenu />)}
            <ul className="flex gap-8 md:gap-16">
               {links.map((link) => (
                  <li key={link.slug} className='hover:text-theme-color duration-100'>
                     <Link href={link.slug}>{link.name}</Link>
                  </li>
               ))}
            </ul>
         </div>

         {/* Mobile Menu */}
         <div ref={mobileMenuRef} className={`${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} fixed z-20 right-0 bottom-0 h-full w-11/12 bg-slate-50 shadow-2xl transition-transform duration-200 overflow-y-auto`}>
            <div className='flex justify-between items-center px-6 pt-6' onClick={() => setMobileMenuOpen(false)}>
               <Logo />
               <IoCloseOutline size={40} />
            </div>
            <div className="relative">
               <ul className="mt-4 px-6 border-b" onClick={() => setMobileMenuOpen(false)}>
                  {links.map((link) => (
                     <li key={link.slug} className="py-3 text-lg">
                        <Link href={link.slug} className='flex justify-between items-center w-full hover:text-theme-color'>
                           {link.name}
                           <span>
                              <FaChevronLeft size={16} />
                           </span>
                        </Link>
                     </li>
                  ))}
               </ul>
               <MobileMegaMenu setMobileMenuOpen={setMobileMenuOpen} />
            </div>
         </div>
      </header>
   );
};

export default Header;
