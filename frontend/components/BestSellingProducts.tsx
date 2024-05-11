import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { useFetchProducts } from '@/utils/useFetchProducts';
import CarouselLayout from './CarouselLayout';
import Link from 'next/link';
import { PersianNumber } from '@/utils/PersianNumber';

const BestSellingProducts = (): JSX.Element => {
   const products = useFetchProducts();

   return (
      <div className='my-20 md:mx-20'>
         <h3 className='text-4xl'>
            پرفروش ترین محصولات
         </h3>
         <div>
            <CarouselLayout mobileSlidesPerView={1} tabletSlidesPerView={2} laptopSlidesPerView={3} desktopSlidesPerView={5} spaceBetween={50}>
               {products?.map(product => (
                  <SwiperSlide key={product._id}>
                     <Link href={`/products/${product._id}`}>
                        <div className='space-y-8 border border-stone-200 shadow-lg hover:shadow-xl duration-200 shadow-gray-300 hover:shadow-gray-400 rounded-xl my-10 py-8 px-10'>
                           <div className="flex justify-center">
                              <i className="lni lni-image text-[14rem] text-stone-600"></i>
                           </div>
                           <h4 className='text-2xl font-medium overflow-hidden overflow-ellipsis whitespace-nowrap'>
                              {product.product}
                           </h4>
                           <h5 className='text-lg text-left'>
                              {PersianNumber(parseInt(product.price, 10).toLocaleString())} تومان
                           </h5>
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