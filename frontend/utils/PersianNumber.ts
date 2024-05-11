export const PersianNumber = (latinNumber: string): string => {
   const persianDigits: string[] = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
   const persianNumber = latinNumber.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
   return persianNumber;
};
