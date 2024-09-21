import { useCallback, useEffect } from "react";

export const useClickOutside = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
   const handleClick = useCallback(
      (event: MouseEvent | TouchEvent) => {
         if (ref.current && !ref.current.contains(event.target as Node)) {
            callback();
         }
      },
      [ref, callback]
   );

   useEffect(() => {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('touchstart', handleClick); // For mobile devices

      return () => {
         document.removeEventListener('mousedown', handleClick);
         document.removeEventListener('touchstart', handleClick);
      };
   }, [handleClick]);
};
