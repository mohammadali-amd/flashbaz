import { Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

type CarouselLayout = {
   children?: React.ReactNode;
   mobileSlidesPerView?: number;
   tabletSlidesPerView?: number;
   laptopSlidesPerView?: number;
   desktopSlidesPerView?: number;
   spaceBetween?: number;
   navigation?: boolean;
   pagination?: boolean;
   className?: string;
   color?: string;
}

const CarouselLayout: React.FC<CarouselLayout> = ({ children, mobileSlidesPerView = 1, tabletSlidesPerView = 3, laptopSlidesPerView = 5, desktopSlidesPerView = 7, navigation = true, pagination = false, spaceBetween, className, color = "#000" }) => {
   return (
      <Swiper
         style={{
            '--swiper-navigation-color': color,
            '--swiper-pagination-color': color,
            'padding': '40px'
         } as React.CSSProperties}
         slidesPerView={mobileSlidesPerView}
         spaceBetween={spaceBetween}
         navigation={navigation}
         pagination={pagination}
         modules={[Navigation, Pagination]}
         className={className}
         breakpoints={{
            768: {
               slidesPerView: tabletSlidesPerView,
               // spaceBetween: 5
            },
            1023: {
               slidesPerView: laptopSlidesPerView,
               // spaceBetween: 10
            },
            1440: {
               slidesPerView: desktopSlidesPerView,
               // spaceBetween: 10
            },
         }}
      >
         {children}
      </Swiper>
   );
}

export default CarouselLayout;