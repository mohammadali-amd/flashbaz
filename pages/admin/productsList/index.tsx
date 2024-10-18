import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { Product } from '@/types/types';
import { RootState } from '@/store/store';
import Loader from '@/components/UI/Loader';
import ErrorMessage from '@/components/UI/ErrorMessage';
import { useCreateProductMutation, useDeleteProductMutation, useGetAdminProductsQuery } from '@/slices/productsApiSlice';
import Paginate from '@/components/Paginate';

const ProductsListPage = () => {
   const router = useRouter()

   const [isLoading, setIsLoading] = useState(true);

   const { userInfo } = useSelector((state: RootState) => state.auth)

   const pageNumber = parseInt((router.query.page as string) || '1', 10);
   const keyword = (router.query.keyword as string)

   const { data, isLoading: loadingProducts, error, refetch } = useGetAdminProductsQuery({ keyword, pageNumber })

   const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation()

   const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation()

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
      if (window.confirm('Are you sure to remove this product?')) {
         try {
            await deleteProduct(id)
            refetch()
            toast.success('محصول مورد نظر با موفقیت حذف شد')
         } catch (error) {
            toast.error((error as any)?.data?.message || (error as any)?.message);
         }
      }
   }

   if (isLoading) {
      return <Loader />
   }

   return (
      <div className="border border-stone-200 shadow-lg shadow-gray-300 rounded-xl p-4 space-y-8 my-10 mx-6 lg:mx-20">
         <div className='lg:flex space-y-6 text-center justify-between items-center'>
            <h1 className='text-3xl'>
               لیست محصولات
            </h1>
            <button onClick={createProductHandler} className='flex w-full lg:w-fit justify-center items-center gap-2 text-xl bg-theme-color text-white rounded-lg p-3 hover:shadow-lg hover:bg-theme-color/90 duration-200'>
               افزودن محصول
               <i className="lni lni-pencil-alt"></i>
            </button>
         </div>

         {loadingCreate && <Loader />}
         {loadingDelete && <Loader />}

         {loadingProducts ? (
            <Loader />
         ) : error ? (
            <ErrorMessage>Error Load Products</ErrorMessage>
         ) : (
            <div>
               <div className="border border-gray-200 rounded-lg overflow-auto">
                  <table className='min-w-full text-center border-collapse'>
                     <thead className='bg-gray-100 border-b'>
                        <tr>
                           <th className='px-4 py-2'>شناسه سفارش</th>
                           <th className='px-4 py-2'>نام محصول</th>
                           <th className='px-4 py-2'>قیمت</th>
                           <th className='px-4 py-2'>دسته بندی</th>
                           <th className='px-4 py-2'>تعداد</th>
                           <th></th>
                           <th></th>
                        </tr>
                     </thead>
                     <tbody>
                        {data.products.map((product: Product) => (
                           <tr key={product._id} className='hover:bg-gray-50 border-b'>
                              <td className='px-4 py-2'>{product._id}</td>
                              <td className='px-4 py-2'>
                                 <Link
                                    href={`/products/${product.category.slug ? `${product.category.slug}/` : ''}${product.subcategory?.slug ? `${product.subcategory?.slug}/` : ''}${product._id}`}
                                 >
                                    {product.name}
                                 </Link>
                              </td>
                              <td className='px-4 py-2'>{product.price}</td>
                              <td className='px-4 py-2'>{product.category.name}</td>
                              <td className='px-4 py-2'>{product.countInStock}</td>
                              <td className='pr-4 py-2'>
                                 <Link href={`/admin/productsList/edit/${product._id}`} className='text-teal-600'>
                                    <i className="text-xl lni lni-pencil"></i>
                                 </Link>
                              </td>
                              <td className='px-4 mx:pl-4 mx:pr-0 py-2'>
                                 <button onClick={() => { deleteHandler(product._id) }
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

export default ProductsListPage
