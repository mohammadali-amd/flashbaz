import Slider from "@/components/HomeComponents/Slider";
import Categories from "@/components/HomeComponents/Categories";
import BestSellingProducts from "@/components/HomeComponents/BestSellingProducts";
import ProductCategorySection from "@/components/HomeComponents/ProductCategorySection";

export default function Home() {
  return (
    <main>
      <Slider />
      <Categories />
      <BestSellingProducts />
      <ProductCategorySection />
    </main>
  );
}