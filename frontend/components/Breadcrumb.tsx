import { Category } from '@/types/types';
import Link from 'next/link';

interface BreadcrumbProps {
   items: Category[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
   return (
      <nav className="text-sm mb-4">
         <ul className="flex space-x-2">
            {items.map((item, index) => (
               <li key={index} className="flex items-center">
                  <Link href={item.slug ? `${item.slug}` : ''} className="text-blue-600 hover:underline">
                     {item.name}
                  </Link>
                  {index < items.length - 1 && (
                     <span className="mx-2">/</span>
                  )}
               </li>
            ))}
         </ul>
      </nav>
   );
};

export default Breadcrumb;
