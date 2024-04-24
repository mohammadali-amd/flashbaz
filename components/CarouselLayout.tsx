import { Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

type CarouselLayout = {
   children?: React.ReactNode;
   slidesPerView: number;
   spaceBetween?: number;
   navigation?: boolean;
   className?: string;
   color?: string;
}

const CarouselLayout: React.FC<CarouselLayout> = ({ children, slidesPerView, navigation = true, spaceBetween, className, color = "#000" }) => {
   return (
      <Swiper
         style={{
            '--swiper-navigation-color': color,
            '--swiper-pagination-color': color,
            'padding': '0 40px'
         } as React.CSSProperties}
         slidesPerView={slidesPerView}
         spaceBetween={spaceBetween}
         navigation={navigation}
         modules={[Navigation]}
         className={className}
      >
         {children}
      </Swiper>
   );
}

export default CarouselLayout;