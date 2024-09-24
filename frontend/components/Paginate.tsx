import Link from 'next/link';
import { useRouter } from 'next/router';

interface PaginationProps {
   currentPage: number;
   totalPages: number;
}

const Paginate: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
   const router = useRouter();

   const getPages = () => {
      const pages = [];
      const showPages = 5;
      const half = Math.floor(showPages / 2);

      if (totalPages <= showPages) {
         for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
         }
      } else {
         if (currentPage <= half + 1) {
            for (let i = 1; i <= showPages - 1; i++) {
               pages.push(i);
            }
            pages.push('...', totalPages);
         } else if (currentPage >= totalPages - half) {
            pages.push(1, '...');
            for (let i = totalPages - (showPages - 2); i <= totalPages; i++) {
               pages.push(i);
            }
         } else {
            pages.push(1, '...');
            for (let i = currentPage - half + 1; i <= currentPage + half - 1; i++) {
               pages.push(i);
            }
            pages.push('...', totalPages);
         }
      }

      return pages;
   };

   const constructHref = (page: number | string) => {
      const href = {
         pathname: router.pathname,
         query: { ...router.query, page: typeof page === 'number' ? page : undefined },
      };
      return href;
   };

   return (
      <div className="flex justify-center my-4">
         <div className="flex items-center gap-2">
            {currentPage > 1 && (
               <Link href={constructHref(currentPage - 1)} scroll={false}>
                  <span className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer">قبلی</span>
               </Link>
            )}

            {getPages().map((page) =>
               typeof page === 'string' ? (
                  <span key={page} className="px-3 py-1 rounded-md">...</span>
               ) : (
                  <Link key={page} href={constructHref(page)} scroll={false}>
                     <span
                        className={`px-3 py-1 rounded-md cursor-pointer ${page === currentPage ? 'bg-theme-color text-white' : 'bg-gray-200 hover:bg-gray-300'
                           }`}
                     >
                        {page}
                     </span>
                  </Link>
               )
            )}

            {currentPage < totalPages && (
               <Link href={constructHref(currentPage + 1)} scroll={false}>
                  <span className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer">بعدی</span>
               </Link>
            )}
         </div>
      </div>
   );
};

export default Paginate;
