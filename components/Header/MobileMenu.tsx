import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';

import LoginButton from './LoginButton'
import Cart from './Cart';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useIsClient } from '@/hooks/useIsClient';

import { HiHome, HiOutlineHome } from 'react-icons/hi';
import { BiCategoryAlt, BiSolidCategoryAlt } from 'react-icons/bi';

type MobileMenuProps = {
   mobileMenuOpen: boolean
   setMobileMenuOpen: (mobileMenuOpen: boolean) => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
   const router = useRouter()
   const isClient = useIsClient()

   const [isToggleMobile, setIsToggleMobile] = useState(false);
   const dropdownRefMobile = useRef<HTMLDivElement | null>(null);

   useClickOutside(dropdownRefMobile, () => setIsToggleMobile(false));

   return (
      <div className='fixed bottom-0 right-0 w-full bg-white shadow-md border-t px-6 pt-1 pb-2 flex items-center justify-between z-30 text-xs text-center'>
         <Link href={'/'}>
            <span className='flex justify-center'>
               {router.pathname === '/' ? (
                  <HiHome size={24} />
               ) : (
                  <HiOutlineHome size={24} />
               )}
            </span>
            خانه
         </Link>
         <button>
            <span className='flex justify-center'>
               {mobileMenuOpen ? (
                  <BiSolidCategoryAlt size={24} />
               ) : (
                  <BiCategoryAlt size={24} onClick={() => setMobileMenuOpen(true)} />
               )}
            </span>
            دسته بندی
         </button>
         {/* Cart */}
         {isClient && (
            <div>
               <span className='flex justify-center'>
                  <Cart />
               </span>
               سبد خرید
            </div>
         )}
         {/* Login Button */}
         {isClient && <LoginButton isToggle={isToggleMobile} dropdownRef={dropdownRefMobile} setIsToggle={setIsToggleMobile} />}
      </div>
   )
}

export default MobileMenu
