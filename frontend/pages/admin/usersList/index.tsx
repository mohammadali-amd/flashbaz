import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { UserInfo } from '@/types/types';
import { RootState } from '@/store/store';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';
import { useDeleteUserMutation, useGetUsersQuery } from '@/slices/usersApiSlice';
import Paginate from '@/components/Paginate';

const UsersListPage = () => {
   const router = useRouter()
   const [isLoading, setIsLoading] = useState(true);

   const { userInfo } = useSelector((state: RootState) => state.auth)

   const pageNumber = parseInt((router.query.page as string) || '1', 10);
   const keyword = (router.query.keyword as string)

   const { data, isLoading: loadingUsers, error, refetch } = useGetUsersQuery({ keyword, pageNumber })

   const [deleteUser, { isLoading: loadingDeleteUser }] = useDeleteUserMutation()

   useEffect(() => {
      if (!userInfo?.isAdmin) {
         router.push('/login');
      } else {
         setIsLoading(false);
      }
   }, [userInfo, router]);

   const deleteUserHandler = async (id: number) => {
      if (window.confirm('Are you sure to remove this user?')) {
         try {
            await deleteUser(id)
            refetch()
            toast.success('Product Deleted')
         } catch (error) {
            toast.error((error as any)?.data?.message || (error as any)?.message);
         }
      }
   }

   if (isLoading) {
      return <Loader />
   }

   return (
      <div className="border border-stone-200 shadow-lg shadow-gray-300 rounded-xl p-3 lg:p-8 space-y-4 my-10 mx-6 lg:mx-20">
         <h1 className='text-3xl text-center lg:text-right py-4'>
            لیست کاربران
         </h1>
         {loadingDeleteUser && <Loader />}

         {loadingUsers ? (
            <Loader />
         ) : error ? (
            <ErrorMessage>Error Load Users</ErrorMessage>
         ) : (
            <div>
               <div className="border border-gray-200 rounded-lg overflow-auto">
                  <table className='min-w-full text-center border-collapse'>
                     <thead className='bg-gray-100 border-b'>
                        <tr>
                           <th className='px-4 py-2'>شناسه کاربر</th>
                           <th className='px-4 py-2'>نام کاربری</th>
                           <th className='px-4 py-2'>ایمیل</th>
                           <th className='px-4 py-2'>تاریخ ثبت نام</th>
                           <th className='px-4 py-2'>سطح</th>
                           <th></th>
                           <th></th>
                        </tr>
                     </thead>
                     <tbody>
                        {data.users.map((user: UserInfo) => (
                           <tr key={user._id} className='hover:bg-gray-50 border-b'>
                              <td className='px-4 py-2'>{user._id}</td>
                              <td className='px-4 py-2'>{user.name}</td>
                              <td className='px-4 py-2'>{user.email}</td>
                              <td className='px-4 py-2'>{user.createdAt.substring(0, 10)}</td>
                              <td className='px-4 py-2'>{user.isAdmin ? <span className='text-red-600 font-bold'>مدیر</span> : 'کاربر'}</td>
                              <td className='pr-4 py-2'>
                                 <Link href={`/admin/usersList/edit/${user._id}`} className='text-teal-600'>
                                    <i className="text-xl lni lni-pencil"></i>
                                 </Link>
                              </td>
                              <td className='px-4 mx:pl-4 mx:pr-0 py-2'>
                                 <button onClick={() => { deleteUserHandler(user._id) }
                                 } className='text-red-600'>
                                    <i className="text-xl lni lni-trash-can"></i>
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>

               </div>
               <div className='mt-6'>
                  <Paginate totalPages={data.pages} currentPage={data.page} />
               </div>
            </div>
         )}
      </div>
   )
}

export default UsersListPage
