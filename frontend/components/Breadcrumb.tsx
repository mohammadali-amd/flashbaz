import Link from 'next/link';

interface BreadcrumbItem {
   name: string;
   path: string;
}

interface BreadcrumbProps {
   items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
   return (
      <nav className="text-sm mb-4">
         <ul className="flex space-x-2">
            {items.map((item, index) => (
               <li key={index} className="flex items-center">
                  <Link href={item.path} className="text-blue-600 hover:underline">
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
