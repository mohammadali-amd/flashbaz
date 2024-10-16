import React, { useRef, useState } from 'react'
import LoginButton from './LoginButton'
import { useClickOutside } from '@/utils/ClickOutside';
import { useIsClient } from '@/utils/useIsClient';
import Cart from './Cart';
import Link from 'next/link';
import { HiHome, HiOutlineHome } from 'react-icons/hi';
import { BiCategoryAlt, BiSolidCategoryAlt } from 'react-icons/bi';
import { MdOutlinePersonOutline, MdPerson } from 'react-icons/md';
import { useRouter } from 'next/router';

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
      <div className='fixed bottom-0 right-0 w-full bg-white shadow-md border-t px-6 py-3 flex items-center justify-between z-30 text-xs text-center'>
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
         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className='flex justify-center'>
               {mobileMenuOpen ? (
                  <BiSolidCategoryAlt size={24} />
               ) : (
                  <BiCategoryAlt size={24} />
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
