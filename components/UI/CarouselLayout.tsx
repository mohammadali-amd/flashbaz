import { Swiper } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

type CarouselLayoutProps = {
   children?: React.ReactNode;
   mobileSlidesPerView?: number;
   tabletSlidesPerView?: number;
   laptopSlidesPerView?: number;
   desktopSlidesPerView?: number;
   spaceBetween?: number;
   navigation?: boolean;
   pagination?: boolean;
   autoplay?: number;
   className?: string;
   color?: string;
   padding?: string;
}

const CarouselLayout: React.FC<CarouselLayoutProps> = ({ children, mobileSlidesPerView = 1, tabletSlidesPerView = 3, laptopSlidesPerView = 5, desktopSlidesPerView = 7, navigation = true, pagination = false, autoplay = 6000, spaceBetween, className, color = "#000", padding = "40px" }) => {
   return (
      <Swiper
         style={{
            '--swiper-navigation-color': color,
            '--swiper-pagination-color': color,
            'padding': padding
         } as React.CSSProperties}
         slidesPerView={mobileSlidesPerView}
         spaceBetween={spaceBetween}
         navigation={navigation}
         pagination={pagination}
         autoplay={{
            delay: autoplay,
         }}

         modules={[Navigation, Pagination, Autoplay]}
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