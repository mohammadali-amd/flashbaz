import Image from 'next/image'
import { SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import CarouselLayout from './CarouselLayout';
import { speaker, laptop, accesories, watch, phone, ps5, printer, tablet, powerbank, airpod, } from '@/public/images/Categories'

const categories = [
   {
      name: 'گوشی موبایل',
      image: phone
   },
   {
      name: 'لپ تاپ',
      image: laptop
   },
   {
      name: 'لوازم جانبی',
      image: accesories
   },
   {
      name: 'ساعت هوشمند',
      image: watch
   },
   {
      name: 'گیمینگ',
      image: ps5
   },
   {
      name: 'تبلت',
      image: tablet,
   },
   {
      name: 'هدفون و هندزفری',
      image: airpod,
   },
   {
      name: 'پاوربانک',
      image: powerbank,
   },
   {
      name: 'اسپیکر',
      image: speaker
   },
   {
      name: 'پرینتر',
      image: printer,
   },
]

const Categories = () => {
   return (
      <div className='flex justify-center my-8 md:mx-20'>
         <CarouselLayout mobileSlidesPerView={3} tabletSlidesPerView={3} laptopSlidesPerView={5} desktopSlidesPerView={7} spaceBetween={30}>
            {categories.map((item) => (
               <SwiperSlide key={item.name}>
                  <div className="grid justify-center gap-6">
                     <Image src={item.image} alt={item.name} className='border-2 border-red-500 rounded-full bg-slate-200 hover:border-4 w-32' />
                     <p className='text-center'>{item.name}</p>
                  </div>
               </SwiperSlide>
            ))}
         </CarouselLayout>
      </div>
   )
}

export default Categories