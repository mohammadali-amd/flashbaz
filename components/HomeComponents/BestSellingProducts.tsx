import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SwiperSlide } from 'swiper/react';

import CarouselLayout from '../CarouselLayout';
import { PersianNumber } from '@/utils/PersianNumber';
import { useGetTopProductsQuery } from '@/slices/productsApiSlice';
import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';
import { type Product } from '@/types/types';

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
      <div className='my-28 md:mx-20'>
         <div className="md:flex justify-between mx-8 space-y-4 md:space-y-0 text-xl md:text-3xl">
            <h3 className='font-bold md:font-semibold'>پرفروش ترین محصولات</h3>
            <Link href={'/products'} className='flex items-center gap-3 w-fit'>
               مشاهده همه
               <i className="lni lni-arrow-left"></i>
            </Link>
         </div>
         <div>
            <CarouselLayout mobileSlidesPerView={1} tabletSlidesPerView={2} laptopSlidesPerView={3} desktopSlidesPerView={4} spaceBetween={50}>
               {products?.map((product: Product) => (
                  <SwiperSlide key={product._id}>
                     <Link href={`/products/${product.category}/${product.subcategory}/${product._id}`}>
                        <div className='border border-stone-200 shadow-lg hover:shadow-xl duration-200 shadow-gray-300 hover:shadow-gray-400 rounded-xl pt-2 pb-6'>
                           <div className="relative flex justify-center pb-4">
                              <div className="relative w-full h-52 m-8">
                                 <Image
                                    src={product.image}
                                    className='rounded-t-xl'
                                    alt={product.name}
                                    layout='fill'
                                    objectFit='contain'
                                    quality={60}
                                 />
                              </div>
                              {product.priceWithOff > 0 && (
                                 <div className='absolute top-2 right-5 text-sm bg-orange-600/90 rounded-full px-3 py-1 text-white'>
                                    %{PersianNumber(product.discount.toLocaleString())} تخفیف
                                 </div>
                              )}
                           </div>
                           <div className="px-4 space-y-3">
                              <h4 className='text-xl font-medium overflow-hidden overflow-ellipsis whitespace-nowrap'>
                                 {product.name}
                              </h4>
                              <h5 className='text-center'>
                                 {product.category.name} ، {product.brand} {product.subcategory && `، ${product.subcategory.name}`}
                              </h5>
                              <div className="flex justify-between items-center md:text-xl font-semibold">
                                 <h5 className='hidden md:block'>قیمت:</h5>
                                 <div className="flex justify-center md:justify-end w-full items-center gap-2">
                                    {product.priceWithOff > 0 ? (
                                       <>
                                          <h5 className='text-sm md:text-base text-red-600 font-light line-through'>
                                             {PersianNumber(product.price.toLocaleString())}
                                          </h5>
                                          <h5 className='font-semibold'>
                                             {PersianNumber(product.priceWithOff.toLocaleString())} تومان
                                          </h5>
                                       </>
                                    ) : (
                                       <h5 className='font-semibold'>
                                          {PersianNumber(product.price.toLocaleString())} تومان
                                       </h5>
                                    )}
                                 </div>
                              </div>
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