import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { IoMenuOutline } from 'react-icons/io5';
import { FaAngleLeft } from 'react-icons/fa6';
import { categories } from './MegaMenuData';

const MegaMenu = () => {
   const [activeCategory, setActiveCategory] = useState<string | null>(categories[0].slug);
   const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
   const menuTimer = useRef<NodeJS.Timeout | null>(null);

   const handleMouseOver = (categorySlug: string) => {
      if (menuTimer.current) clearTimeout(menuTimer.current);
      setActiveCategory(categorySlug);
      setIsMegaMenuOpen(true);
   };

   const handleMouseLeave = () => {
      menuTimer.current = setTimeout(() => {
         setIsMegaMenuOpen(false);
         setActiveCategory(categories[0].slug);
      }, 200);
   };

   const handleMenuMouseEnter = () => {
      if (menuTimer.current) clearTimeout(menuTimer.current);
   };

   return (
      <div className="relative ml-14">
         <div
            onMouseOver={() => setIsMegaMenuOpen(true)}
            onMouseLeave={handleMouseLeave}
            className="hover:text-theme-color duration-200 cursor-pointer flex items-center gap-1"
         >
            <IoMenuOutline size={24} />
            <span>محصولات</span>
         </div>

         {isMegaMenuOpen && (
            <div
               onMouseEnter={handleMenuMouseEnter}
               onMouseLeave={handleMouseLeave}
               className='absolute right-0 top-full'>
               <div
                  className="mt-2 w-[50rem] h-[20rem] bg-white shadow-lg grid grid-cols-4 gap-2 rounded-xl border"
               >
                  {/* Category List */}
                  <div className="col-span-1 border-l pr-6 pl-2 space-y-6 py-6 bg-slate-100/70">
                     {categories.map((category) => (
                        <div
                           key={category.id}
                           className="mb-4 cursor-pointer"
                           onMouseOver={() => handleMouseOver(category.slug)}
                        >
                           <h4 className={`flex items-center justify-between font-semibold text-gray-700 ${activeCategory === category.slug ? 'text-theme-color duration-200' : ''}`}>
                              {category.name}
                              <FaAngleLeft />
                           </h4>
                        </div>
                     ))}
                  </div>

                  {/* Subcategory & Product List */}
                  <div className="col-span-3 grid grid-cols-3 gap-4 pr-6 pl-2 py-6">
                     {categories
                        .find((category) => category.slug === activeCategory)
                        ?.subcategories.map((subcategory) => (
                           <div key={subcategory.slug + subcategory.name} className="mb-4">
                              <Link href={subcategory.slug} className="block text-gray-600 hover:text-theme-color duration-200 mb-1 font-medium border-b w-fit">
                                 {subcategory.name}
                              </Link>
                              <div className="grid">
                                 {subcategory.products && subcategory.products.map((product) => (
                                    <Link key={product.name + product.slug} href={product.slug} className="block">
                                       <p className="text-gray-500 hover:text-theme-color duration-200 text-sm mt-1">{product.name}</p>
                                    </Link>
                                 ))}
                              </div>
                           </div>
                        ))}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default MegaMenu;
