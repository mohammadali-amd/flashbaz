import { useRouter } from 'next/router';

import ProductDetailPage from '@/components/ProductDetailPage';
import Loader from '@/components/Loader';
import Breadcrumb from '@/components/Breadcrumb';

const ProductDetail = () => {
   const router = useRouter();
   // const productId = router.query.productId?.toString();
   const { category, subcategory, productId } = router.query;
   console.log(router.query);


   if (!productId) return <Loader />;

   return (
      <div className='mx-6 lg:mx-20 my-5'>
         <Breadcrumb
            items={[
               { name: 'صفحه اصلی', path: '/' },
               { name: 'محصولات', path: '/products' },
               { name: category as string, path: `/products/${category}` },
               { name: subcategory as string, path: `/products/${category}/${subcategory}` },
               { name: productId as string, path: `/products/${category}/${subcategory}/${productId}` },
            ]}
         />
         <ProductDetailPage productId={productId as string} />
      </div>
   );
};

export default ProductDetail;