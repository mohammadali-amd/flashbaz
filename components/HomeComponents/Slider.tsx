import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react';

import { slider_banner_1, slider_banner_2, slider_banner_3 } from "@/public/images";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Carousel = () => {
   return (
      <div className="mb-10">
         <Swiper
            spaceBetween={30}
            loop={true}
            centeredSlides={true}
            autoplay={{
               delay: 3000,
               disableOnInteraction: false,
            }}
            pagination={{
               clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            style={{
               "--swiper-navigation-color": "#000",
               "--swiper-pagination-color": "#000",
            } as React.CSSProperties}
         >
            <SwiperSlide>
               <Image src={slider_banner_1} alt="slider-banner" className='w-full' priority={true} />
            </SwiperSlide>
            <SwiperSlide>
               <Image src={slider_banner_2} alt="slider-banner" className='w-full' />
            </SwiperSlide>
            <SwiperSlide>
               <Image src={slider_banner_3} alt="slider-banner" className='w-full' />
            </SwiperSlide>
         </Swiper>
      </div>
   )
}

export default Carousel
