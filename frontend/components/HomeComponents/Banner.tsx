import Image from 'next/image'
import Link from 'next/link'

const banners = [
   {
      title: 'انواع فلش مموری',
      subTitle: 'دارای ضمانت و گارانتی',
      image: { src: '/images/usb-sandisk.webp', alt: 'usb-sandisk' },
      link: '/products/flash'
   },
   {
      title: 'انواع هارد دیسک',
      subTitle: 'با بهترین کیفیت',
      image: { src: '/images/hard-drives.webp', alt: 'hard-drives' },
      link: '/products/hard'
   },
]
const Banner = () => {
   const BannerStyles = 'xl:flex items-center text-center xl:text-right md:w-1/2 px-10 py-14 rounded-3xl shadow-xl shadow-black/30 ';
   const FirstBannerStyles = BannerStyles + 'gap-6 bg-gradient-to-r from-red-950 from-5% via-red-800 via-55% to-red-700 to-80%';
   const SecBannerStyles = BannerStyles + 'gap-14 bg-gradient-to-r from-emerald-600 from-5% via-emerald-800 via-55% to-emerald-950 to-95%';

   return (
      <div className='md:flex gap-10 lg:gap-20 justify-center my-28 mx-8 md:mx-20 xl:mx-60 space-y-10 md:space-y-0'>
         {banners.map((item, index) => (
            <div key={item.title + item.subTitle} className={index > 0 ? SecBannerStyles : FirstBannerStyles}>
               <div className="flex justify-center">
                  <Image src={item.image.src} alt={item.image.alt} width={200} height={200} />
               </div>
               <div className='space-y-6'>
                  <h3 className='text-3xl font-medium text-white pb-10'>
                     {item.title} <br />
                     {item.subTitle}
                  </h3>
                  <Link href={item.link} className='bg-white text-black font-medium shadow-md rounded-full px-4 py-2'>مشاهده و سفارش</Link>
               </div>
            </div>
         ))}
      </div>
   )
}

export default Banner
