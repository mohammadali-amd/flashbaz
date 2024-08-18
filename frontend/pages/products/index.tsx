import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/types/types';
import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';
import { useGetProductsQuery } from '@/slices/productsApiSlice';
import { PersianNumber } from '@/utils/PersianNumber';
import { useRouter } from 'next/router';
import Paginate from '@/components/Paginate';
import { GetServerSideProps } from 'next';

interface ProductsProps {
   initialKeyword: string;
   initialPageNumber: number;
}

const Products: React.FC<ProductsProps> = ({ initialKeyword, initialPageNumber }) => {
   const router = useRouter();
   const pageNumber = parseInt((router.query.page as string) || `${initialPageNumber}`, 10);
   const keyword = (router.query.keyword as string) || initialKeyword

   const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber })

   if (isLoading) {
      return <Loader />
   }

   if (error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error)
      return <ErrorMessage>{errMsg}</ErrorMessage>
   }

   return (
      <div className='mx-6 lg:mx-20 my-5'>
         <div className="breadcrumb">
            Breadcrumb
         </div>
         <h2 className='text-3xl my-5'>
            فروشگاه
         </h2>

         <div className='lg:flex lg:justify-between lg:gap-8'>
            {/* Filters */}
            <div className="filter">
               <div className='space-y-8 border border-stone-300 rounded-xl py-8 px-10'>
                  <h4 className='text-xl font-medium'>
                     فیلترها
                  </h4>
                  <div className="flex justify-center">
                     <i className="lni lni-image text-[1//4rem] text-stone-600"></i>
                  </div>
               </div>
            </div>

            <div>
               {/* Products */}
               <div className="lg:grid lg:grid-cols-4 lg:gap-8">
                  {data?.products.map((product: Product) => (
                     <Link href={`/products/${product._id}`} key={product._id}>
                        <div className='border border-stone-200 shadow-lg hover:shadow-xl duration-200 shadow-gray-300 hover:shadow-gray-400 rounded-xl pb-4 my-8 lg:my-0'>
                           <div className="flex justify-center pb-4">
                              <div className="relative min-w-full h-60">
                                 <Image
                                    src={product.image}
                                    className='rounded-t-xl'
                                    alt='Product image'
                                    layout='fill'
                                    objectFit='cover'
                                 />
                              </div>
                           </div>
                           <div className="space-y-4 px-4">
                              <h4 className='text-2xl font-medium overflow-hidden overflow-ellipsis whitespace-nowrap'>
                                 {product.name}
                              </h4>
                              <h5 className='text-lg text-left overflow-hidden overflow-ellipsis whitespace-nowrap'>
                                 {PersianNumber(product.price.toLocaleString())} تومان
                              </h5>
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>

               <div className='mt-14'>
                  <Paginate totalPages={data.pages} currentPage={data.page} />
               </div>
            </div>

         </div>
      </div>
   )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { keyword = '', page = '1' } = context.query;
   return {
      props: {
         initialKeyword: keyword,
         initialPageNumber: parseInt(page as string, 10),
      },
   };
};

export default Products;