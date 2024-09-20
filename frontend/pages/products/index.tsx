import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import ErrorMessage from '@/components/ErrorMessage';
import Loader from '@/components/Loader';
import Filter from '@/components/Filter';
import Paginate from '@/components/Paginate';
import ProductList from '@/components/ProductList';
import { useGetProductsQuery } from '@/slices/productsApiSlice';
import Breadcrumb from '@/components/Breadcrumb';
import { ProductsProps } from '@/types/ProductsProps';

const Products: React.FC<ProductsProps> = ({ initialKeyword, initialPageNumber }) => {
   const router = useRouter();
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
   const { data, isLoading, error } = useGetProductsQuery({
      keyword,
      pageNumber,
      brand: selectedBrand,
      rating: selectedRating,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
   });

   const sortedProducts = useMemo(() => {
      if (!data?.products) return []
      let sortedArray = [...data.products];

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
   }, [data?.products, sortOption]);

   if (isLoading) {
      return <Loader />
   }

   if (error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error)
      return <ErrorMessage>{errMsg}</ErrorMessage>
   }

   return (
      <div className='mx-6 lg:mx-20 my-5'>
         <div>
            <Breadcrumb
               items={[
                  { name: 'صفحه اصلی', slug: '/' },
                  { name: 'محصولات', slug: '/products' },
               ]}
            />
         </div>
         <h2 className='text-3xl my-5'>
            فروشگاه
         </h2>

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
                  {data && (
                     <Paginate
                        totalPages={data.pages || 0}
                        currentPage={data.page || 1}
                     />
                  )}
               </div>
            </div>

         </div>
      </div>
   )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   const { keyword = '', page = '1' } = context.query;
   return {
      props: {
         initialKeyword: keyword,
         initialPageNumber: parseInt(page as string, 10),
      },
   };
};

export default Products;