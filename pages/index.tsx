export const config = {
  runtime: 'experimental-edge',
};

import Slider from '@/components/HomeComponents/Slider';
import Categories from '@/components/HomeComponents/Categories';
import AmazingOffer from '@/components/HomeComponents/AmazingOffer';
import ProductCategorySection from '@/components/HomeComponents/ProductCategorySection';
import BestSellingProducts from '@/components/HomeComponents/BestSellingProducts';
import Banner from '@/components/HomeComponents/Banner';
import BlogPosts from '@/components/HomeComponents/BlogPosts';

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