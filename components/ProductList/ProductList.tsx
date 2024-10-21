import Link from 'next/link';
import Image from 'next/image';

import { Product } from '@/types/types';
import { PersianNumber } from '@/utils/PersianNumber';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="lg:grid lg:grid-cols-4 lg:gap-8">
      {products.map((product: Product) => (
        <Link href={`/products/${product.category.slug ? `${product.category.slug}/` : ''}${product.subcategory?.slug ? `${product.subcategory?.slug}/` : ''}${product.slug}`} key={product._id}>
          <div className='border border-stone-200 shadow-lg hover:shadow-xl duration-200 shadow-gray-300 hover:shadow-gray-400 rounded-xl py-6 px-4 my-8 lg:my-0'>
            <div className="flex justify-center pb-4">
              <div className="relative min-w-full h-60">
                <Image
                  src={product.image?.link || '/sample-image.jpg'}
                  alt={product.image?.alt || 'Product image'}
                  className='rounded-t-xl'
                  layout='fill'
                  objectFit='contain'
                />
              </div>
            </div>
            <div className="space-y-4 px-4">
              <h4 className='text-2xl font-medium overflow-hidden overflow-ellipsis whitespace-nowrap'>
                {product.name}
              </h4>
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>قیمت:</span>
                <h5>
                  {PersianNumber(product.price.toLocaleString())} تومان
                </h5>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
