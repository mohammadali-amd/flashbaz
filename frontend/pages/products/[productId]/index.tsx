import { useRouter } from 'next/router';

import ProductDetailPage from '@/components/ProductDetailPage';
import Loader from '@/components/Loader';

const ProductDetail = () => {
   const router = useRouter();
   const productId = router.query.productId?.toString();

   if (!productId) return <Loader />;

   return <ProductDetailPage productId={productId} />;
};

export default ProductDetail;