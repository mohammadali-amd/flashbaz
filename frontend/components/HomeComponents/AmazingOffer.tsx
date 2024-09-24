import Image from 'next/image';
import Link from 'next/link';
import { SwiperSlide } from 'swiper/react';

import Loader from '../Loader';
import ErrorMessage from '../ErrorMessage';
import { useGetProductsQuery } from '@/slices/productsApiSlice';
import { Product } from '@/types/types';
import CarouselLayout from '../CarouselLayout';
import { PersianNumber } from '@/utils/PersianNumber';

const AmazingOffer = () => {
   const { data: amazingOffers, isLoading, error } = useGetProductsQuery({
      isAmazingOffer: true,
   });

   if (isLoading) {
      return <Loader />
   }

   if (error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error)
      return <ErrorMessage>{errMsg}</ErrorMessage>
   }

   return (
      <div className='my-10 mx-4 md:mx-20 bg-white border-4 border-theme-color rounded-2xl pt-2'>
         <div className="md:flex justify-between bg-theme-color px-4 py-10 rounded-2xl space-y-4 md:space-y-0 text-xl md:text-3xl text-white mx-2">
            <h3 className='font-bold md:font-normal'>پیشنهاد شگفت انگیز</h3>
            <Link href={'/products'} className='flex items-center gap-3 w-fit'>
               مشاهده همه
               <i className="lni lni-arrow-left"></i>
            </Link>
         </div>
         <div>
            <CarouselLayout mobileSlidesPerView={1} tabletSlidesPerView={2} laptopSlidesPerView={3} desktopSlidesPerView={4} spaceBetween={50}>
               {amazingOffers.products.map((product: Product) => (
                  <SwiperSlide key={product._id}>
                     <Link href={`/products/${product.category}/${product.subcategory}/${product._id}`}>
                        <div className='border border-stone-200 shadow-lg hover:shadow-xl duration-200 rounded-xl pt-2 pb-6 bg-white'>
                           <div className="relative flex justify-center pb-4">
                              <div className="relative w-full h-52 m-8">
                                 <Image
                                    src={product.image}
                                    className='rounded-t-xl'
                                    alt={product.name}
                                    layout='fill'
                                    objectFit='contain'
                                 />
                              </div>
                              <div className='absolute top-2 right-5 text-sm bg-orange-600/90 rounded-full px-3 py-1 text-white'>
                                 %{PersianNumber(product.discount.toLocaleString())} تخفیف
                              </div>
                           </div>
                           <div className="px-4 space-y-3">
                              <h4 className='text-xl font-medium overflow-hidden overflow-ellipsis whitespace-nowrap'>
                                 {product.name}
                              </h4>
                              <h5 className='text-center'>
                                 {product.category.name} ، {product.brand} {product.subcategory && `، ${product.subcategory.name}`}
                              </h5>
                              <div className="flex justify-between items-center text-xl font-semibold">
                                 <h5>قیمت:</h5>
                                 <div className="flex justify-end items-center gap-2">
                                    {product.priceWithOff > 0 ? (
                                       <>
                                          <h5 className='text-base font-light line-through'>
                                             {PersianNumber(product.price.toLocaleString())}
                                          </h5>
                                          <h5 className='text-xl font-semibold'>
                                             {PersianNumber(product.priceWithOff.toLocaleString())} تومان
                                          </h5>
                                       </>
                                    ) : (
                                       <h5 className='text-xl font-semibold'>
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

export default AmazingOffer
