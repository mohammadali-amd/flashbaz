import Image from 'next/image'
import { SwiperSlide } from 'swiper/react';

import 'swiper/css';
// import 'swiper/css/navigation';

import CarouselLayout from './CarouselLayout';
import { speaker, laptop, accesories, watch, phone, ps5, printer, tablet, powerbank, airpod, } from '@/public/images/Categories'
import Link from 'next/link';

const categories = [
   {
      name: 'گوشی موبایل',
      image: phone,
      category: 'موبایل'
   },
   {
      name: 'لپ تاپ',
      image: laptop,
      category: ''
   },
   {
      name: 'لوازم جانبی',
      image: accesories,
      category: ''
   },
   {
      name: 'ساعت هوشمند',
      image: watch,
      category: ''
   },
   {
      name: 'گیمینگ',
      image: ps5,
      category: ''
   },
   {
      name: 'تبلت',
      image: tablet,
      category: ''
   },
   {
      name: 'هدفون و هندزفری',
      image: airpod,
      category: 'هندزفری'
   },
   {
      name: 'پاوربانک',
      image: powerbank,
      category: ''
   },
   {
      name: 'اسپیکر',
      image: speaker,
      category: ''
   },
   {
      name: 'پرینتر',
      image: printer,
      category: ''
   },
]

const Categories = () => {
   return (
      <div className='flex justify-center my-8 md:mx-20'>
         <CarouselLayout mobileSlidesPerView={3} tabletSlidesPerView={3} laptopSlidesPerView={5} desktopSlidesPerView={7} spaceBetween={30}>
            {categories.map((item) => (
               <SwiperSlide key={item.name}>
                  <Link href={`/products/${item.category}`} className="grid justify-center gap-6">
                     <Image src={item.image} alt={item.name} className='border-2 border-red-500 rounded-full bg-slate-200 hover:border-4 w-32' />
                     <p className='text-center'>{item.name}</p>
                  </Link>
               </SwiperSlide>
            ))}
         </CarouselLayout>
      </div>
   )
}

export default Categories