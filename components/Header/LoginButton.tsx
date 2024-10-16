import { MutableRefObject } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { useLogoutMutation } from '@/slices/usersApiSlice';
import { logout } from '@/slices/authSlice'
import { resetCart } from '@/slices/cartSlice';
import { GoPerson, GoPersonFill } from 'react-icons/go';

interface LoginButtonProps {
   isToggle: boolean;
   dropdownRef: MutableRefObject<HTMLDivElement | null>;
   setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const links = [
   {
      title: 'لیست محصولات',
      slug: '/admin/productsList'
   },
   {
      title: 'دسته بندی ها',
      slug: '/admin/categoryList'
   },
   {
      title: 'لیست سفارشات',
      slug: '/admin/ordersList'
   },
   {
      title: 'لیست کاربران',
      slug: '/admin/usersList'
   },
   {
      title: 'مدیریت تصاویر',
      slug: '/admin/media'
   }
]

const LoginButton: React.FC<LoginButtonProps> = ({ isToggle, dropdownRef, setIsToggle }) => {
   const router = useRouter()
   const dispatch = useDispatch()

   const { userInfo } = useSelector((state: RootState) => state.auth);

   const [logoutApiCall] = useLogoutMutation()

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

   return (
      <div>
         {userInfo ? (
            <div ref={dropdownRef} className="relative text-right">
               <div className='flex items-center'>
                  <button type="button" id="menu-button" aria-expanded="true" aria-haspopup="true"
                     onClick={() => setIsToggle((prev) => !prev)}
                  >
                     <span className='flex justify-center'>
                        {isToggle ? (
                           <GoPersonFill size={24} />
                        ) : (
                           <GoPerson size={24} />
                        )}
                     </span>
                     <span className='md:hidden'>حساب کاربری</span>
                  </button>
               </div>
               <div className={`${isToggle ? '' : 'hidden'} text-center absolute -top-72 md:top-full left-0 w-36 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                  <div className="py-1" role="none">
                     <Link href="/profile" onClick={() => setIsToggle(false)} className={`${router.pathname === '/profile' ? 'text-theme-color' : 'text-gray-700'} block px-4 py-2 text-sm border-b hover:text-theme-color active:text-theme-color`} role="menuitem" tabIndex={-1} id="menu-item-0">
                        پروفایل
                     </Link>
                     {userInfo.isAdmin && (
                        <>
                           {links.map((link) => (
                              <div key={link.title}>
                                 <Link
                                    href={`${link.slug}`}
                                    className={`${router.pathname === link.slug ? 'text-theme-color' : 'text-gray-700'} block px-4 py-2 text-sm border-b hover:text-theme-color active:text-theme-color`}
                                    role="menuitem"
                                    tabIndex={-1}
                                    id="menu-item-0"
                                    onClick={() => setIsToggle(false)}
                                 >
                                    {link.title}
                                 </Link>
                              </div>
                           ))}
                        </>
                     )}
                     <button onClick={logoutHandler} className="text-gray-700 block w-full px-4 py-2 text-sm hover:text-theme-color" role="menuitem" tabIndex={-1} id="menu-item-3">
                        خروج
                     </button>
                  </div>
               </div>
            </div>
         ) : (
            <>
               <Link href={'/login'} className="hidden md:block border border-black rounded-lg py-2 px-4">
                  ورود | ثبت نام
               </Link>
               <Link href={'/login'} className='md:hidden'>
                  <span className='flex justify-center'>
                     <GoPerson size={24} />
                  </span>
                  حساب کاربری
               </Link>
            </>
         )}
      </div>
   )
}

export default LoginButton
