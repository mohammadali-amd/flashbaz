import React from 'react';
import { SwiperSlide } from 'swiper/react';

import CarouselLayout from './CarouselLayout';
import Link from 'next/link';
import { PersianNumber } from '@/utils/PersianNumber';
import { useGetTopProductsQuery } from '@/slices/productsApiSlice';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import Image from 'next/image';
import { Product } from '@/types/types';

const BestSellingProducts = (): JSX.Element => {
   const { data: products, isLoading, error } = useGetTopProductsQuery('bestSelling_products')

   if (isLoading) {
      return <Loader />
   }

   if (error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error)
      return <ErrorMessage>{errMsg}</ErrorMessage>
   }

   return (
      <div className='my-20 md:mx-20'>
         <h3 className='text-4xl'>
            پرفروش ترین محصولات
         </h3>
         <div>
            <CarouselLayout mobileSlidesPerView={1} tabletSlidesPerView={2} laptopSlidesPerView={3} desktopSlidesPerView={5} spaceBetween={50}>
               {products?.map((product: Product) => (
                  <SwiperSlide key={product._id}>
                     <Link href={`/products/${product._id}`}>
                        <div className='border border-stone-200 shadow-lg hover:shadow-xl duration-200 shadow-gray-300 hover:shadow-gray-400 rounded-xl my-10 pb-4'>
                           <div className="flex justify-center pb-4">
                              <div className="relative w-80 h-52">
                                 <Image
                                    src={product.image}
                                    className='rounded-t-xl'
                                    alt={product.name}
                                    layout='fill'
                                    objectFit='cover'
                                 />
                              </div>
                           </div>
                           <div className="px-4 space-y-4">
                              <h4 className='text-2xl font-medium overflow-hidden overflow-ellipsis whitespace-nowrap'>
                                 {product.name}
                              </h4>
                              <h5 className='text-lg text-left'>
                                 {PersianNumber(product.price.toLocaleString())} تومان
                              </h5>
                           </div>
                        </div>
                     </Link>
                  </SwiperSlide>
               ))}
            </CarouselLayout>
         </div>
      </div>
   )
}

export default BestSellingProducts;