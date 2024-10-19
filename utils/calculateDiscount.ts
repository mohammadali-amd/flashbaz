export const calculateDiscount = (price: number, priceWithOff: number) => {
   if (price && priceWithOff) {
      const discount = ((price - priceWithOff) / price) * 100;
      return Math.round(discount);
   }
   return 0;
};