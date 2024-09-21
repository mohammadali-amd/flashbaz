import { useState, useEffect } from 'react';

// Hydration error: Initial UI does not match server render.
// To prevent Hydration error, ensure consistency between server-side and client-side rendering. 👇

export const useIsClient = () => {
   const [isClient, setIsClient] = useState(false);

   useEffect(() => {
      setIsClient(true);
   }, []);

   return isClient;
};