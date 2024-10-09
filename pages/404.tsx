import Image from 'next/image';
import Link from 'next/link';

const Custom404 = () => {
   return (
      <div className="my-20">
         <div className="text-center">
            <h1 className="text-9xl font-bold text-theme-color">404</h1>
            <h2 className="mt-4 text-3xl font-semibold text-gray-800">
               صفحه مورد نظر یافت نشد!
            </h2>
            <p className="mt-2 mb-8 text-gray-600">
               متاسفانه صفحه ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
            </p>
            <Link href="/" className="px-8 py-3 bg-theme-color text-white font-semibold rounded-md shadow-md hover:bg-theme-color/90 duration-200">
               بازگشت به صفحه اصلی
            </Link>
         </div>
         <div className="mt-8">
            <Image
               src="/icons/icon-192x192.png"
               alt="404 Illustration"
               className="mx-auto"
               width={200}
               height={200}
            />
         </div>
      </div>
   );
};

export default Custom404;
