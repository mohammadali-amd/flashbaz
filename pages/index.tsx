export const config = {
  runtime: 'experimental-edge',
};

import dynamic from 'next/dynamic';
import Slider from '@/components/HomeComponents/Slider';
import Categories from '@/components/HomeComponents/Categories';
import AmazingOffer from '@/components/HomeComponents/AmazingOffer';
import ProductCategorySection from '@/components/HomeComponents/ProductCategorySection';

const BestSellingProducts = dynamic(() => import('@/components/HomeComponents/BestSellingProducts'), { ssr: false });
const Banner = dynamic(() => import('@/components/HomeComponents/Banner'), { ssr: false });
const BlogPosts = dynamic(() => import('@/components/HomeComponents/BlogPosts'), { ssr: false });

export default function Home() {
  return (
    <main>
      <Slider />
      <Categories />
      <AmazingOffer />
      <ProductCategorySection />
      <BestSellingProducts />
      <Banner />
      <BlogPosts />
    </main>
  );
}