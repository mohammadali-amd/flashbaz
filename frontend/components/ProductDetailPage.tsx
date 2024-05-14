import { useDispatch } from 'react-redux';

import { addItem } from '@/slices/cartSlice';
import { PersianNumber } from '@/utils/PersianNumber';
import { useGetProductDetailsQuery } from '@/slices/productsApiSlice';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';
import { useRouter } from 'next/navigation';

interface ProductDetailPageProps {
   productId: string;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
   const { data: productDetails, isLoading, error } = useGetProductDetailsQuery(productId)
   const dispatch = useDispatch();
   const router = useRouter();

   const handleAddToCart = () => {
      if (productDetails) {
         dispatch(addItem(productDetails)); // Pass productDetails to addItem
         router.push('/cart')
      }
   };

   if (isLoading) {
      return <Loader />
   }

   if (error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error)
      return <ErrorMessage>{errMsg}</ErrorMessage>
   }

   return (
      <div className='mx-20 my-5'>
         <div className='flex justify-between gap-20'>
            {/* Cart */}
            <div className='w-full space-y-8'>
               <div className="flex justify-between gap-6 border border-stone-200 shadow-lg  shadow-gray-300 rounded-xl py-8 px-10">
                  <div>
                     <h3 className='text-2xl'>
                        {productDetails?.name}
                     </h3>
                     <p className='py-2 text-xl'>
                        {productDetails?.description}
                     </p>
                     <div className='text-stone-600 space-y-4 mt-10'>
                        <h4 className='flex items-center gap-2'>
                           <i className="lni lni-drop"></i>
                           آبی
                        </h4>
                        <h4 className='flex items-center gap-2'>
                           <i className="lni lni-checkmark-circle"></i>
                           18 ماه گارانتی
                        </h4>
                        <h4 className='flex items-center gap-2'>
                           <i className="lni lni-checkmark-circle"></i>
                           موجود در انبار
                        </h4>
                     </div>
                     <div className='flex gap-2  text-sm pt-10'>
                        #tags
                        {/* {productDetails?.tags.map(index => (
                           <h6 key={index}>
                              #{index}
                           </h6>
                        ))} */}
                     </div>
                  </div>
                  <div>
                     {/* Product Photo */}
                     <div className='text-left mb-6'>
                        <i className="lni lni-image text-[14rem] text-stone-600"></i>
                     </div>
                  </div>
               </div>

            </div>
            {/* Submit */}
            <div className='min-w-fit'>
               <div className='space-y-6 border border-stone-200 shadow-lg  shadow-gray-300 rounded-xl py-8 px-10'>
                  <div className="flex justify-between gap-20">
                     <h4>قیمت</h4>
                     {productDetails && <h5>
                        {PersianNumber(parseInt(productDetails?.price).toLocaleString())} تومان
                     </h5>}
                  </div>
                  <div className="flex justify-between gap-20 text-red-600">
                     <h4>تخفیف</h4>
                     <h5>0 تومان</h5>
                  </div>
                  {productDetails && parseInt(productDetails?.countInStock) === 1 && (
                     <p className='text-red-500 font-semibold text-sm'>
                        فقط 1 عدد از این کالا در انبار موجود است.
                     </p>
                  )}
                  <button onClick={handleAddToCart} className='flex justify-center bg-emerald-600 w-full text-xl p-4 rounded-md text-white hover:shadow-xl hover:shadow-emerald-500/30 hover:scale-105 duration-200'>
                     افزودن به سبد خرید
                  </button>
               </div>
            </div>

         </div>




      </div>
   )
}

export default ProductDetailPage;