import React, { useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { type Color } from '@/types/types';

interface ColorPaletteProps {
   onColorSelect: (color: Color) => void;
}

const colors = [
   { name: 'قرمز', code: '#FF0000' },
   { name: 'سبز', code: '#00FF00' },
   { name: 'آبی', code: '#0000FF' },
   { name: 'زرد', code: '#FFFF00' },
   { name: 'سیاه', code: '#000000' },
   { name: 'سفید', code: '#FFFFFF' },
   { name: 'نارنجی', code: '#FFA500' },
   { name: 'بنفش', code: '#800080' },
   { name: 'صورتی', code: '#FFC0CB' },
   { name: 'طوسی', code: '#808080' },
   { name: 'آبی آسمانی', code: '#87CEEB' },
   { name: 'سبز تیره', code: '#006400' },
   { name: 'قرمز تیره', code: '#8B0000' },
   { name: 'قهوه ای', code: '#A52A2A' },
];

const ColorPalette: React.FC<ColorPaletteProps> = ({ onColorSelect }) => {
   const [isOpen, setIsOpen] = useState(false);
   const mobileMenuRef = useRef<HTMLDivElement | null>(null);

   useClickOutside(mobileMenuRef, () => setIsOpen(false));

   const togglePalette = () => {
      setIsOpen((prev) => !prev);
   };

   return (
      <div className='relative'>
         <button
            onClick={togglePalette}
            className="px-4 py-2 bg-theme-color text-white rounded-lg mb-2 transition-colors duration-200 hover:bg-theme-color/90"
            type='button'
         >
            {isOpen ? (
               <span onClick={() => setIsOpen(false)}>
                  بستن پالت رنگ
               </span>
            ) : 'نمایش پالت رنگ'}
         </button>

         {isOpen && (
            <div ref={mobileMenuRef} className='absolute left-10 lg:left-20 top-0 z-10 bg-white shadow-lg rounded-lg py-2 px-4 w-52 border'>
               <div className='grid grid-cols-4 gap-2'>
                  {colors.map((color, index) => (
                     <div
                        key={index}
                        style={{ backgroundColor: color.code }}
                        className='w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-110'
                        onClick={() => onColorSelect(color)}
                        title={color.name} // Show color name on hover
                     >
                        {/* Color block */}
                     </div>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};

export default ColorPalette;
