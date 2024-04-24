import { useRouter } from 'next/router';
import ProductDetailPage from '@/components/ProductDetailPage';

const ProductDetail = () => {
   const router = useRouter();
   const productId = router.query.productId?.toString();

   if (!productId) return <div>Loading...</div>;

   return <ProductDetailPage productId={productId} />;
};

export default ProductDetail;