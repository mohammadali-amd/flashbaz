import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';

import Loader from '@/components/UI/Loader';
import ErrorMessage from '@/components/UI/ErrorMessage';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '@/slices/usersApiSlice';

const EditUserPage = () => {
   const router = useRouter();
   const userId = router.query.id;

   const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId as string);

   const [updateUser, { isLoading: loadingUpdateUser }] = useUpdateUserMutation();

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [passwordConfirm, setPasswordConfirm] = useState('');
   const [isAdmin, setIsAdmin] = useState(false);

   useEffect(() => {
      if (user) {
         setName(user.name);
         setEmail(user.email);
         setPassword(user.password);
         setPasswordConfirm(user.passwordConfirm);
         setIsAdmin(user.isAdmin);
      }
   }, [user]);

   const submitHandler = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         await updateUser({
            userId,
            name,
            email,
            password,
            passwordConfirm,
            isAdmin,
         }).unwrap()

         toast.success('User updated successfully');
         refetch()
         router.push('/admin/usersList');
      } catch (error) {
         toast.error((error as any)?.data?.message || (error as any)?.message);
      }
   };

   if (isLoading) {
      return <Loader />;
   }

   if (error) {
      return <ErrorMessage>Error</ErrorMessage>;
   }

   return (
      <div className="border border-stone-200 shadow-lg shadow-gray-300 rounded-xl p-8 m-10">
         <Link href='/admin/usersList' className='flex items-center gap-2 text-xl bg-slate-200 w-fit py-1 px-2 rounded-md hover:shadow-md hover:bg-slate-300 duration-200'>
            <i className="lni lni-arrow-right"></i>
            بازگشت
         </Link>
         <h1 className="text-3xl pb-6 pt-4">ویرایش کاربر</h1>
         {loadingUpdateUser && <Loader />}

         {isLoading ? <Loader /> : error ? (
            <ErrorMessage>Error</ErrorMessage>
         ) : (
            <form onSubmit={submitHandler} className="space-y-4">
               <div>
                  <label className="block text-gray-700">نام کاربری</label>
                  <input
                     type="text"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className="w-full px-4 py-2 border rounded-lg"
                  />
               </div>
               <div>
                  <label className="block text-gray-700">ایمیل</label>
                  <input
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full px-4 py-2 border rounded-lg"
                  />
               </div>
               <div>
                  <label className="block text-gray-700">رمز عبور</label>
                  <input
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full px-4 py-2 border rounded-lg"
                  />
               </div>
               <div>
                  <label className="block text-gray-700">تایید رمز عبور</label>
                  <input
                     type="password"
                     value={passwordConfirm}
                     onChange={(e) => setPasswordConfirm(e.target.value)}
                     className="w-full px-4 py-2 border rounded-lg"
                  />
               </div>
               <div>
                  <label className="flex items-center gap-2 text-gray-700">
                     مدیر
                     <input
                        type="checkbox"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                     />
                  </label>
               </div>
               <button
                  type="submit"
                  className="w-full py-2 px-4 bg-theme-color text-white rounded-lg hover:shadow-md hover:bg-theme-color/90 duration-200"
               >
                  اعمال تغییرات
               </button>
            </form>
         )}
      </div>
   );
};

export default EditUserPage;
