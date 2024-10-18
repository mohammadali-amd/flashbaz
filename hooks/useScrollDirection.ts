import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollDirection = (threshold = 50) => {
   const [isScrolledUp, setIsScrolledUp] = useState(false);
   const lastScrollY = useRef(0);
   const ticking = useRef(false);

   const handleScroll = useCallback(() => {
      if (!ticking.current) {
         window.requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;

            if (Math.abs(currentScrollY - lastScrollY.current) > threshold) {
               const scrolledUp = currentScrollY > lastScrollY.current
               if (scrolledUp !== isScrolledUp) {
                  setIsScrolledUp(scrolledUp);
               }
               lastScrollY.current = currentScrollY;
            }
            ticking.current = false;
         });
         ticking.current = true;
      }
   }, [isScrolledUp, threshold]);

   useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, [handleScroll]);

   return isScrolledUp;
};