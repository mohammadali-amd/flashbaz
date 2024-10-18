import { Category } from '@/types/types';
import Link from 'next/link';

interface BreadcrumbProps {
   items: Category[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
   return (
      <nav className="text-sm mb-4">
         <ul className="flex overflow-y-hidden">
            {items.map((item, index) => (
               <li key={item.name + item.slug} className="flex items-center text-stone-400 whitespace-nowrap">
                  <Link href={item.slug ? `${item.slug}` : ''} className={
                     index === items.length - 1 ? 'text-theme-color' : ''
                  }>
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
