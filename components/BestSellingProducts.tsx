import React from 'react';
import { SwiperSlide } from 'swiper/react';

import { useFetchProducts } from '@/hooks/useFetchProducts';
import CarouselLayout from './CarouselLayout';
import Link from 'next/link';

const BestSellingProducts = (): JSX.Element => {
   const products = useFetchProducts();

   return (
      <div className='m-20'>
         <h3 className='text-4xl'>
            پرفروش ترین محصولات
         </h3>
         <div>
            <CarouselLayout slidesPerView={5} navigation={true} spaceBetween={50}>
               {products?.map(product => (
                  <SwiperSlide key={product.id}>
                     <Link href={`/products/${product.id}`}>
                        <div className='space-y-8 border border-stone-200 shadow-lg hover:shadow-xl duration-200 shadow-gray-300 hover:shadow-gray-400 rounded-xl my-10 py-8 px-10'>
                           <div className="flex justify-center">
                              <i className="lni lni-image text-[14rem] text-stone-600"></i>
                           </div>
                           <h4 className='text-2xl font-medium'>
                              {product.product}
                           </h4>
                           <h5 className='text-lg text-left'>
                              {parseInt(product.price, 10).toLocaleString()} تومان
                           </h5>
                           {/* Add to Cart */}
                           <button className='flex justify-center bg-slate-300 rounded-lg w-full p-4'>
                              اضافه به سبد خرید
                           </button>
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