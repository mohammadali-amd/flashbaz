import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';
import { useGetProductsQuery } from '@/slices/productsApiSlice';
import { PersianNumber } from '@/utils/PersianNumber';
import Image from 'next/image';
import Link from 'next/link';

const Products = () => {
   const { data: products, isLoading, error } = useGetProductsQuery('flashbaz_products')

   if (isLoading) {
      return <Loader />
   }

   if (error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error)
      return <ErrorMessage>{errMsg}</ErrorMessage>
   }

   return (
      <div className='mx-20 my-5'>
         <div className="breadcrumb">
            Breadcrumb
         </div>
         <h2 className='text-3xl my-5'>
            فروشگاه
         </h2>

         <div className='flex justify-between gap-8'>
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

            {/* Products */}
            <div className="grid grid-cols-4 gap-8">
               {products?.map((product) => (
                  <Link href={`/products/${product._id}`} key={product._id}>
                     <div className='border border-stone-200 shadow-lg hover:shadow-xl duration-200 shadow-gray-300 hover:shadow-gray-400 rounded-xl pb-4'>
                        <div className="flex justify-center pb-4">
                           <div className="relative w-96 h-60">
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
         </div>
      </div>
   )
}

export default Products;