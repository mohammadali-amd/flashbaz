import Image from 'next/image'
import Link from 'next/link';
import { SwiperSlide } from 'swiper/react';

import 'swiper/css';
// import 'swiper/css/navigation';

import CarouselLayout from '../UI/CarouselLayout';
import { speaker, laptop, accesories, watch, phone, ps5, printer, tablet, powerbank, airpod, } from '@/public/images/Categories'

const categories = [
   {
      name: 'گوشی موبایل',
      image: phone,
      category: 'موبایل',
      slug: 'phone',
   },
   {
      name: 'لپ تاپ',
      image: laptop,
      category: '',
      slug: 'laptop',
   },
   {
      name: 'لوازم جانبی',
      image: accesories,
      category: '',
      slug: 'accesories',
   },
   {
      name: 'ساعت هوشمند',
      image: watch,
      category: '',
      slug: 'watch',
   },
   {
      name: 'گیمینگ',
      image: ps5,
      category: '',
      slug: 'console',
   },
   {
      name: 'تبلت',
      image: tablet,
      category: '',
      slug: 'tablet',
   },
   {
      name: 'هدفون و هندزفری',
      image: airpod,
      category: 'هندزفری',
      slug: 'headset',
   },
   {
      name: 'پاوربانک',
      image: powerbank,
      category: '',
      slug: 'powerbank',
   },
   {
      name: 'اسپیکر',
      image: speaker,
      category: '',
      slug: 'speaker',
   },
   {
      name: 'پرینتر',
      image: printer,
      category: '',
      slug: 'printer',
   },
]

const Categories = () => {
   return (
      <div className='flex justify-center my-8 md:mx-20'>
         <CarouselLayout mobileSlidesPerView={3} tabletSlidesPerView={3} laptopSlidesPerView={5} desktopSlidesPerView={7} spaceBetween={30} padding='0px 40px'>
            {categories.map((item) => (
               <SwiperSlide key={item.name}>
                  <Link href={`/products/${item.slug}`} className="grid justify-center gap-6">
                     <Image src={item.image} alt={item.name} className='border-2 border-theme-color rounded-full bg-slate-200 hover:border-4 w-32' />
                     <p className='text-center'>{item.name}</p>
                  </Link>
               </SwiperSlide>
            ))}
         </CarouselLayout>
      </div>
   )
}

export default Categories