import { useRouter } from 'next/router';

import ProductDetailPage from '@/components/ProductDetailPage';
import Loader from '@/components/Loader';
import Breadcrumb from '@/components/Breadcrumb';
import { useGetProductDetailsQuery } from '@/slices/productsApiSlice';
import ErrorMessage from '@/components/ErrorMessage';
import { Category } from '@/types/types';

const ProductDetail = () => {
   const router = useRouter();
   // const productId = router.query.productId?.toString();
   const { category, subcategory, productId } = router.query;

   const { data: productDetails, isLoading, error, refetch } = useGetProductDetailsQuery(productId as string)

   const breadcrumbItems: Category[] = [
      { name: 'صفحه اصلی', slug: '/' },
      { name: 'محصولات', slug: '/products' },
      { name: productDetails?.category.name as string, slug: `/products/${category}` },
   ]

   if (productDetails?.subcategory) {
      breadcrumbItems.push({
         name: productDetails.subcategory.name as string,
         slug: `/products/${category}/${subcategory}`,
      });
   }

   breadcrumbItems.push({
      name: productDetails?.name || productId as string,
      slug: `/products/${category}/${subcategory}/${productId}`,
   });

   if (!productId || isLoading || !productDetails) return <Loader />;

   if (error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error)
      return <ErrorMessage>{errMsg}</ErrorMessage>
   }

   return (
      <div className='mx-6 lg:mx-20 my-5'>
         <Breadcrumb items={breadcrumbItems} />
         <ProductDetailPage
            productId={productId as string}
            productDetails={productDetails}
            refetch={refetch}
         />
      </div>
   );
};

export default ProductDetail;