import React from 'react';
import Logo from './Logo';
import { useGetTopProductsQuery } from '@/slices/productsApiSlice';
import Link from 'next/link';
import { Product } from '@/types/types';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import Image from 'next/image';

const Footer = () => {
   const { data: products, isLoading, error } = useGetTopProductsQuery('bestSelling_products')

   return (
      <footer className="mt-6">
         <div className="lg:flex space-y-4 lg:space-y-0 justify-between bg-theme-color text-white xl:text-2xl px-4 lg:px-20 py-8 lg:rounded-t-xl lg:mx-20">
            <div className='flex justify-center items-center gap-4'>
               <i className="lni lni-wallet text-3xl xl:text-4xl"></i>
               <span>امکان پرداخت در محل</span>
            </div>
            <div className="border"></div>
            <div className='flex justify-center items-center gap-4'>
               <i className="lni lni-phone text-3xl xl:text-4xl"></i>
               <span>پشتیبانی ۲۴ ساعته</span>
            </div>
            <div className="border"></div>
            <div className='flex justify-center items-center gap-4'>
               <i className="lni lni-protection text-3xl xl:text-4xl"></i>
               <span>ضمانت اصلالت کالا</span>
            </div>
            <div className="border"></div>
            <div className='flex justify-center items-center gap-4'>
               <i className="lni lni-travel text-3xl xl:text-4xl"></i>
               <span>ارسال سریع</span>
            </div>
         </div>
         <div className='bg-[#F0F0F0] px-8 pt-10'>
            <div className="flex flex-col xl:flex-row gap-10 md:gap-40 mx-10 justify-between">
               <div>
                  {/* Logo and Description */}
                  <div className="mb-6 xl:mb-0 mt-10 xl:mt-0 text-center xl:text-left">
                     <div className="flex justify-center xl:justify-start">
                        <Logo />
                     </div>
                     {/* <p className="mt-4 text-gray-400">
                     اینجا می‌توانید یک توضیحات کوچک در مورد شرکت یا وبسایت خود قرار دهید.
                  </p> */}
                  </div>

                  {/* Contact Information */}
                  <div className="mt-6 xl:mb-0 text-center xl:text-right space-y-4">
                     <h4 className="text-xl font-semibold mb-2 ">راه‌های ارتباطی</h4>
                     <p>ایمیل: contact@yourwebsite.com</p>
                     <p>تلفن: 09123456789</p>

                     {/* Social Media Links */}
                     <div className="flex justify-center xl:justify-start gap-10 text-2xl pt-8">
                        <Link href="#" aria-label="Whatsapp">
                           <i className="lni lni-whatsapp hover:text-theme-color duration-100"></i>
                        </Link>
                        <Link href="#" aria-label="Telegram">
                           <i className="lni lni-telegram-original hover:text-theme-color duration-100"></i>
                        </Link>
                        <Link href="#" aria-label="Instagram">
                           <i className="lni lni-instagram hover:text-theme-color duration-100"></i>
                        </Link>
                        <Link href="#" aria-label="LinkedIn">
                           <i className="lni lni-youtube hover:text-theme-color duration-100"></i>
                        </Link>
                     </div>
                  </div>
                  <hr className='block xl:hidden mt-10' />
               </div>


               {/* Important Links */}
               <ul className="space-y-2 font-light text-center md:text-right">
                  <li className="text-lg font-semibold mb-4 text-theme-color">دسترسی سریع</li>
                  <li><Link href="/">صفحه اصلی</Link></li>
                  <li><Link href="#">حساب کاربری</Link></li>
                  <li><Link href="#">تماس با ما</Link></li>
                  <li><Link href="#">سوالات متداول</Link></li>
               </ul>
               <ul className="space-y-2 font-light text-center md:text-right">
                  <li className="text-lg font-semibold mb-4 text-theme-color">پرفروش ترین محصولات</li>
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

               <div className='flex justify-center gap-4 h-fit cursor-pointer'>
                  <Image src="/images/enamad.png" alt="enamad" width={80} height={80} />
                  <Image src="/images/zarinpall.png" alt="enamad" width={80} height={80} />
               </div>
            </div>

            <div className="mt-8 pb-2 text-center text-theme-color">
               <p>&copy; تمامی حقوق متعلق به این وبسایت محفوظ است.</p>
            </div>
         </div>
      </footer>
   );
}

export default Footer;