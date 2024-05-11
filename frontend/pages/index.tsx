import Slider from "@/components/Slider";
import Categories from "@/components/Categories";
import BestSellingProducts from "@/components/BestSellingProducts";

export default function Home() {
  return (
    <main>
      <Slider />
      <Categories />
      <BestSellingProducts />
    </main>
  );
}