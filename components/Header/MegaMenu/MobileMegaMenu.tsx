import { useState } from 'react';
import Link from 'next/link';

import { categories } from './MegaMenuData';
import { FaChevronDown } from 'react-icons/fa6';

type MobileMegaMenuProps = {
   setMobileMenuOpen: (open: boolean) => void
}

const MobileMegaMenu: React.FC<MobileMegaMenuProps> = ({ setMobileMenuOpen }) => {
   const [activeCategory, setActiveCategory] = useState<number | null>(null);
   const [activeSubcategory, setActiveSubcategory] = useState<number | null>(null);

   const handleCategoryClick = (id: number) => {
      setActiveCategory((prevId) => (prevId === id ? null : id));
      setActiveSubcategory(null);
   };

   const handleSubcategoryClick = (index: number) => {
      setActiveSubcategory((prevIndex) => (prevIndex === index ? null : index));
   };

   return (
      <ul className="flex flex-col items-center content-start">
         {categories.map((category) => (
            <li key={category.id} className="w-full">
               <div
                  className="flex justify-between items-center py-4 px-6 w-full hover:bg-gray-100"
                  onClick={() => handleCategoryClick(category.id)}
               >
                  <span className="text-xl">{category.name}</span>
                  <span className="text-lg">
                     {activeCategory === category.id ? (
                        <div className='rotate-180 transition-all duration-300'>
                           <FaChevronDown size={16} />
                        </div>
                     ) : (
                        <div className='transition-all duration-300'>
                           <FaChevronDown size={16} />
                        </div>
                     )}
                  </span>
               </div>

               {/* Subcategories Dropdown */}
               {activeCategory === category.id && (
                  <ul className="px-8 bg-gray-200 transition-all duration-200 ease-in-out">
                     {category.subcategories.map((subcategory, subIndex) => (
                        <li key={subIndex}>
                           <div
                              className="flex justify-between items-center py-3"
                              onClick={() => handleSubcategoryClick(subIndex)}
                           >
                              <span className="text-lg">{subcategory.name}</span>
                              <span className="text-lg">
                                 {activeSubcategory === subIndex ? (
                                    <div className='rotate-180 transition-all duration-300'>
                                       <FaChevronDown size={14} />
                                    </div>
                                 ) : (
                                    <div className='transition-all duration-300'>
                                       <FaChevronDown size={14} />
                                    </div>
                                 )}
                              </span>
                           </div>

                           {/* Products Dropdown */}
                           {activeSubcategory === subIndex && (
                              <ul className="px-4 border-r border-gray-400">
                                 {subcategory.products?.map((product, prodIndex) => (
                                    <li
                                       key={prodIndex}
                                       className="py-2 hover:text-theme-color"
                                       onClick={() => setMobileMenuOpen(false)}
                                    >
                                       <Link href={product.slug}>
                                          {product.name}
                                       </Link>
                                    </li>
                                 ))}
                              </ul>
                           )}
                        </li>
                     ))}
                  </ul>
               )}
            </li>
         ))}
      </ul>
   );
};

export default MobileMegaMenu;