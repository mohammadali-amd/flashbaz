import React from 'react';
import Logo from './Logo';
import { useGetTopProductsQuery } from '@/slices/productsApiSlice';
import Link from 'next/link';
import { Product } from '@/types/types';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';

const Footer = () => {
   const { data: products, isLoading, error } = useGetTopProductsQuery('bestSelling_products')

   return (
      <footer className="bg-gray-900 text-white px-8 pt-10 rounded-t-xl mt-6 mx-4">
         <div className="flex flex-col xl:flex-row gap-10 xl:gap-40 ">
            <div>
               {/* Logo and Description */}
               <div className="mb-6 xl:mb-0 mt-10 xl:mt-0 text-center xl:text-left">
                  <div className="flex justify-center xl:justify-start">
                     <Logo />
                  </div>
                  <p className="mt-4 text-gray-400">
                     اینجا می‌توانید یک توضیحات کوچک در مورد شرکت یا وبسایت خود قرار دهید.
                  </p>
               </div>

               {/* Contact Information */}
               <div className="mt-6 xl:mb-0 text-center xl:text-right space-y-4">
                  <h4 className="text-xl font-semibold mb-2">راه‌های ارتباطی</h4>
                  <p>ایمیل: contact@yourwebsite.com</p>
                  <p>تلفن: 09123456789</p>

                  {/* Social Media Links */}
                  <div className="flex justify-center xl:justify-start gap-10 text-2xl pt-8">
                     <a href="#" aria-label="Whatsapp">
                        <i className="lni lni-whatsapp"></i>
                     </a>
                     <a href="#" aria-label="Telegram">
                        <i className="lni lni-telegram-original"></i>
                     </a>
                     <a href="#" aria-label="Instagram">
                        <i className="lni lni-instagram"></i>
                     </a>
                     <a href="#" aria-label="LinkedIn">
                        <i className="lni lni-youtube"></i>
                     </a>
                  </div>
               </div>
               <hr className='block xl:hidden mt-10' />
            </div>


            {/* Important Links */}
            <div className="text-center xl:text-right">
               <div className="xl:flex xl:justify-center space-y-8 xl:space-y-0 gap-20">
                  <ul className="space-y-2">
                     <li className="text-lg font-semibold mb-4 underline underline-offset-8">دسترسی سریع</li>
                     <li><a href="#">لینک 1</a></li>
                     <li><a href="#">لینک 2</a></li>
                     <li><a href="#">لینک 3</a></li>
                     <li><a href="#">لینک 4</a></li>
                  </ul>
                  <ul className="space-y-2">
                     <li className="text-lg font-semibold mb-4 underline underline-offset-8">پرفروش ترین محصولات</li>
                     {isLoading ? <Loader /> : error ? (
                        <ErrorMessage>Error</ErrorMessage>
                     ) : (
                        <>
                           {products?.map((product: Product) => (
                              <li key={product._id}><Link href={`/products/${product._id}`}>{product.name}</Link></li>
                           ))}
                        </>
                     )}
                  </ul>
                  <ul className="space-y-2">
                     <li className="text-lg font-semibold mb-4 underline underline-offset-8">درباره ما</li>
                     <li><a href="#">تماس با ما</a></li>
                     <li><a href="#">سیاست حفظ حریم خصوصی</a></li>
                     <li><a href="#">شرایط و ضوابط</a></li>
                     <li><a href="#">سوالات متداول</a></li>
                  </ul>
               </div>
            </div>
         </div>

         <div className="mt-8 pb-2 text-center text-gray-500">
            <p>&copy; 2024 Your Company. تمامی حقوق محفوظ است.</p>
         </div>
      </footer>
   );
}

export default Footer;
