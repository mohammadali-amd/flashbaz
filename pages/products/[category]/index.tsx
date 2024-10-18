export const config = {
   runtime: 'experimental-edge',
};

import { useRouter } from 'next/router';
import ProductList from '@/components/ProductList/ProductList';
import Loader from '@/components/UI/Loader';
import ErrorMessage from '@/components/UI/ErrorMessage';
import Breadcrumb from '@/components/UI/Breadcrumb';
import { useGetProductsQuery } from '@/slices/productsApiSlice';
import Paginate from '@/components/Paginate';
import Filter from '@/components/Filter';
import { useMemo, useState } from 'react';
import { ProductsProps } from '@/types/ProductsProps';
import { useGetCategoriesQuery } from '@/slices/categoriesApiSlice';
import { type Category } from '@/types/types';

const CategoryPage: React.FC<ProductsProps> = ({ initialKeyword, initialPageNumber }) => {
   const router = useRouter();
   const { category } = router.query;

   const { data: categories } = useGetCategoriesQuery(undefined);

   const selectedCategory = useMemo(() => {
      return categories?.find((cat: Category) => cat.slug === category);
   }, [categories, category])

   const pageNumber = useMemo(() => parseInt((router.query.page as string) || `${initialPageNumber}`, 10), [router.query.page, initialPageNumber])
   const keyword = useMemo(() => (router.query.keyword as string) || initialKeyword, [router.query.keyword, initialKeyword])

   const [filters, setFilters] = useState({
      selectedBrand: '',
      selectedRating: 0,
      priceRange: [0, 10000000] as [number, number],
      sortOption: 'All',
   });

   const { selectedBrand, selectedRating, priceRange, sortOption } = filters;

   // Debounced filter function
   const debounce = (func: Function, delay: number) => {
      let timer: NodeJS.Timeout;
      return (...args: any) => {
         clearTimeout(timer);
         timer = setTimeout(() => func(...args), delay);
      };
   };

   const updateFilters = debounce((newFilters: Partial<typeof filters>) => {
      setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
   }, 300);

   // Fetch products with applied filters
   const { data: productDetails, isLoading, error } = useGetProductsQuery({
      category,
      keyword,
      pageNumber,
      brand: selectedBrand,
      rating: selectedRating,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
   });

   const sortedProducts = useMemo(() => {
      if (!productDetails?.products) return []
      let sortedArray = [...productDetails.products];

      switch (sortOption) {
         case 'Newest':
            sortedArray.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            break;
         case 'MostPopular':
            sortedArray.sort((a, b) => b.popularity - a.popularity); // Assuming `popularity` is a field
            break;
         case 'Cheapest':
            sortedArray.sort((a, b) => a.price - b.price);
            break;
         case 'MostExpensive':
            sortedArray.sort((a, b) => b.price - a.price);
            break;
      }
      return sortedArray
   }, [productDetails?.products, sortOption]);

   if (isLoading) {
      return <Loader />;
   }

   if (error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error);
      return <ErrorMessage>{errMsg}</ErrorMessage>;
   }

   return (
      <div className='mx-6 lg:mx-20 my-5'>
         <Breadcrumb
            items={[
               { name: 'صفحه اصلی', slug: '/' },
               { name: 'محصولات', slug: '/products' },
               { name: selectedCategory?.name || category as string, slug: `/products/${selectedCategory?.slug}` },
            ]}
         />
         <h2 className='text-3xl my-5'>{selectedCategory?.name}</h2>

         <div className='lg:flex lg:justify-between lg:gap-8 w-full'>
            {/* Filters */}
            <div className="lg:w-1/4">
               <Filter
                  selectedBrand={selectedBrand}
                  setSelectedBrand={(brand) => updateFilters({ selectedBrand: brand })}
                  selectedRating={selectedRating}
                  setSelectedRating={(rating) => updateFilters({ selectedRating: rating })}
                  priceRange={priceRange}
                  setPriceRange={(range) => updateFilters({ priceRange: range })}
                  clearFilters={() => updateFilters({ selectedBrand: '', selectedRating: 0, priceRange: [0, 10000000] })}
               />
            </div>

            <div className='lg:w-3/4'>
               {/* Sorting Options */}
               <div className="flex items-center gap-2 mb-4">
                  <span>مرتب سازی بر اساس</span>
                  <select
                     value={sortOption}
                     onChange={(e) => updateFilters({ sortOption: e.target.value })}
                     className="p-2 border rounded-lg"
                  >
                     <option value="All">همه</option>
                     <option value="Newest">جدید ترین</option>
                     <option value="MostPopular">محبوب ترین</option>
                     <option value="Cheapest">ارزان ترین</option>
                     <option value="MostExpensive">گران ترین</option>
                  </select>
               </div>
               {/* Products */}
               <ProductList products={sortedProducts} />

               <div className='mt-14'>
                  {productDetails && (
                     <Paginate
                        totalPages={productDetails.pages || 0}
                        currentPage={productDetails.page || 1}
                     />
                  )}
               </div>
            </div>

         </div>
      </div>
   );
};

export default CategoryPage;
