import { MutableRefObject } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { useLogoutMutation } from '@/slices/usersApiSlice';
import { logout } from '@/slices/authSlice'
import { resetCart } from '@/slices/cartSlice';

interface LoginButtonProps {
   isToggle: boolean;
   dropdownRef: MutableRefObject<HTMLDivElement | null>;
   setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

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
            <div ref={dropdownRef} className="relative inline-block text-right">
               <div>
                  <button type="button" className="inline-flex items-end w-full justify-center gap-x-2 rounded-lg bg-white px-2 py-1 lg:px-3 lg:py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-black hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true"
                     onClick={() => setIsToggle((prev) => !prev)}
                  >
                     <span className='hidden lg:block'>{userInfo?.name}</span>
                     <i className="lni lni-user text-xl"></i>
                  </button>
               </div>
               <div className={`${isToggle ? '' : 'hidden'} text-center absolute left-0 w-36 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                  <div className="py-1" role="none">
                     <Link href="/profile" className="text-gray-700 block px-4 py-2 text-sm border-b hover:text-emerald-700" role="menuitem" tabIndex={-1} id="menu-item-0">پروفایل</Link>
                     {userInfo.isAdmin && (
                        <>
                           <Link href="/admin/productsList" className="text-gray-700 block px-4 py-2 text-sm border-b hover:text-emerald-700" role="menuitem" tabIndex={-1} id="menu-item-0">لیست محصولات</Link>
                           <Link href="/admin/ordersList" className="text-gray-700 block px-4 py-2 text-sm border-b hover:text-emerald-700" role="menuitem" tabIndex={-1} id="menu-item-0">لیست سفارشات</Link>
                           <Link href="/admin/usersList" className="text-gray-700 block px-4 py-2 text-sm border-b hover:text-emerald-700" role="menuitem" tabIndex={-1} id="menu-item-0">لیست کاربران</Link>
                        </>
                     )}
                     <button onClick={logoutHandler} className="text-gray-700 block w-full px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-3">خروج</button>
                  </div>
               </div>
            </div>
         ) : (
            <Link href={'/login'} className="border border-black rounded-lg py-2 px-4">
               ورود | ثبت نام
            </Link>
         )}
      </div>
   )
}

export default LoginButton
