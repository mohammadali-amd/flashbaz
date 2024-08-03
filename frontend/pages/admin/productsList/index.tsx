import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { Product } from '@/types/types';
import { RootState } from '@/store/store';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';
import { useCreateProductMutation, useGetProductsQuery } from '@/slices/productsApiSlice';

const OrdersListPage = () => {
   const router = useRouter()

   const [isLoading, setIsLoading] = useState(true);

   const { userInfo } = useSelector((state: RootState) => state.auth)

   const { data: products, isLoading: loadingProducts, error, refetch } = useGetProductsQuery('admin_products')

   const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation()

   useEffect(() => {
      if (!userInfo?.isAdmin) {
         router.push('/login');
      } else {
         setIsLoading(false);
      }
   }, [userInfo, router]);

   const createProductHandler = async () => {
      if (window.confirm('Are you sure?')) {
         try {
            await createProduct({})
            refetch()
         } catch (error) {
            toast.error((error as any)?.data?.message || (error as any)?.message);
         }
      }
   }

   const deleteHandler = async (id: number) => {
      console.log('delet ', id);
   }

   if (isLoading) {
      return <Loader />
   }

   return (
      <div className="border border-stone-200 shadow-lg shadow-gray-300 rounded-xl p-8 space-y-8 m-10">
         <div className='flex justify-between'>
            <h1 className='text-3xl'>
               لیست محصولات
            </h1>
            <button onClick={createProductHandler} className='flex items-center gap-2 text-xl bg-teal-500 text-white rounded-lg p-3 hover:shadow-lg hover:bg-teal-600 duration-200'>
               افزودن محصول
               <i className="lni lni-pencil-alt"></i>
            </button>
         </div>

         {loadingCreate && <Loader />}

         {loadingProducts ? (
            <Loader />
         ) : error ? (
            <ErrorMessage>Error Load Products</ErrorMessage>
         ) : (
            <div className="border border-gray-200 rounded-lg">
               <table className='min-w-full text-center border-collapse overflow-hidden'>
                  <thead className='bg-gray-100 border-b'>
                     <tr>
                        <th className='px-4 py-2'>شناسه سفارش</th>
                        <th className='px-4 py-2'>نام محصول</th>
                        <th className='px-4 py-2'>قیمت</th>
                        <th className='px-4 py-2'>دسته بندی</th>
                        <th className='px-4 py-2'>تعداد</th>
                        <th className='px-4 py-2'></th>
                     </tr>
                  </thead>
                  <tbody>
                     {products?.slice().reverse().map((product: Product) => (
                        <tr key={product._id} className='hover:bg-gray-50 border-b'>
                           <td className='px-4 py-2'>{product._id}</td>
                           <td className='px-4 py-2'>{product.name}</td>
                           <td className='px-4 py-2'>{product.price}</td>
                           <td className='px-4 py-2'>{product.category}</td>
                           <td className='px-4 py-2'>{product.countInStock}</td>
                           <td className='px-4 py-2'>
                              <Link href={`/admin/productsList/edit/${product._id}`} className='text-teal-600'>
                                 <i className="text-xl lni lni-pencil"></i>
                              </Link>
                              <button onClick={() => { deleteHandler(product._id) }
                              } className='text-red-600 mr-6'>
                                 <i className="text-xl lni lni-trash-can"></i>
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         )}
      </div>
   )
}

export default OrdersListPage
