import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import { toast } from 'react-toastify';

import type { Color, Product, Review } from '@/types/types';
import { RootState } from '@/store/store';
import { addItem } from '@/slices/cartSlice';
import { useAddReviewMutation } from '@/slices/productsApiSlice';
import ErrorMessage from '../UI/ErrorMessage';
import Loader from '../UI/Loader';
import { PersianNumber } from '@/utils/PersianNumber';
import ImageGallery from '../UI/ImageGallery';

interface ProductDetailPageProps {
   productId: string;
   productDetails: Product;
   refetch: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, productDetails, refetch }) => {
   const dispatch = useDispatch()
   // const router = useRouter()

   const [rating, setRating] = useState(0)
   const [comment, setComment] = useState('')
   const [reviewError, setReviewError] = useState('')
   const [selectedColor, setSelectedColor] = useState({ name: '', code: '' });

   const mainImage = { url: productDetails?.image };
   const additionalImages = productDetails?.additionalImages?.map(url => ({ url })) || [];

   const [addReview, { isLoading: loadingAddReview }] = useAddReviewMutation()

   const reviews = productDetails?.reviews || [];

   const { userInfo } = useSelector((state: RootState) => state.auth)

   const handleAddToCart = (product: Product, color: Color) => {
      if (product) {
         if (!selectedColor) setSelectedColor({ name: '', code: '' })
         dispatch(addItem({ product, color: selectedColor }));
         // router.push('/cart')
         toast.success('محصول مورد نظر به سبد خرید شما اضافه شد')
      }
   };

   const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (rating === 0 || comment.trim() === '') {
         return setReviewError('Please provide a rating and comment.')
      }

      try {
         await addReview({ productId, review: { rating, comment } }).unwrap()
         setRating(0)
         setComment('')
         setReviewError('')
         refetch()
         toast.success('Review Submitted')
      } catch (error) {
         setReviewError('Failed to submit review.')
         toast.error((error as any)?.data?.message || (error as any)?.message);
      }
   }

   const renderStars = (rating: number) => {
      return '🧡'.repeat(rating) + '🤍'.repeat(5 - rating);
   };

   return (
      <>
         {/* Meta Data */}
         <Head>
            <title>{productDetails?.name} | Flashbaz</title>
            <meta name="description" content={productDetails?.description || 'Product details page'} />
            <meta property="og:title" content={productDetails?.name} />
            <meta property="og:description" content={productDetails?.description || 'Product details page'} />
            <meta property="og:image" content={productDetails?.image || '/default-image.jpg'} />
            <meta property="og:url" content={`https://flashbaz.com/products/${productId}`} />
            <meta property="og:type" content="product" />
         </Head>

         <div className='lg:flex lg:justify-between lg:gap-20'>
            <div className='w-full space-y-8'>
               <div className="xl:flex lg:flex-row-reverse justify-between gap-10 lg:border lg:border-stone-200 lg:shadow-lg lg:shadow-gray-300 lg:rounded-xl py-8 px-2 lg:px-10 w-full">
                  {/* Product Photo */}
                  <div className='xl:w-1/2' dir='ltr'>
                     <ImageGallery images={[mainImage, ...additionalImages]} />
                  </div>
                  {/* Product Details */}
                  <div>
                     <h3 className='text-xl lg:text-2xl'>
                        {productDetails?.name}
                     </h3>
                     {/* Colors */}
                     <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 mt-6">
                        {productDetails.colors?.map((color: Color) => (
                           <div
                              key={color.code}
                              className={`flex justify-center items-center py-2 gap-3 border rounded-md px-2 cursor-pointer ${selectedColor === color ? 'border-2 border-theme-color' : ''
                                 }`}
                              onClick={() => setSelectedColor(color)}
                           >
                              <div
                                 style={{ backgroundColor: color.code }}
                                 className='w-5 h-5 border rounded-md'
                              />
                              <span>{color.name}</span>
                           </div>
                        ))}
                     </div>
                     {/* Main Features */}
                     {productDetails.features?.length !== 0 && (
                        <div className="text-stone-600 mt-10">
                           <h3 className="text-stone-800 py-2 mb-2 text-lg lg:text-xl font-semibold">
                              ویژگی‌های اصلی:
                           </h3>
                           <div className="border border-theme-color/70 rounded-lg py-4 px-2 lg:px-8 bg-white shadow-sm">
                              <table className="w-full text-right text-sm lg:text-base">
                                 <tbody>
                                    {productDetails.features?.filter(feature => feature.mainFeature).map((feature) => (
                                       <tr key={feature.title + feature.value} className="border-b border-dashed last:border-none">
                                          <td className="py-2 font-medium text-stone-700 w-1/2 lg:w-1/3">{feature.title}:</td>
                                          <td className="py-2 text-stone-600">{feature.value}</td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     )}
                  </div>
               </div>

               {/* More Details */}
               <div className='border-y lg:border border-stone-200 lg:shadow-lg lg:shadow-gray-300 lg:rounded-xl py-8 px-2 lg:px-10 mt-10'>
                  {/* Features */}
                  {productDetails.features?.length !== 0 && (
                     <div className="text-stone-600 mb-10">
                        <h3 className="text-stone-800 py-2 mb-2 text-lg lg:text-xl font-semibold">
                           مشخصات فنی:
                        </h3>
                        <div className="border border-theme-color/70 rounded-lg py-4 px-2 lg:px-8 bg-white shadow-sm">
                           <table className="w-full text-right text-sm lg:text-base">
                              <tbody>
                                 {productDetails.features?.map((feature) => (
                                    <tr key={feature.title + feature.value} className="border-b border-dashed last:border-none">
                                       <td className="py-2 font-medium text-stone-700 w-1/2 lg:w-1/3">{feature.title}:</td>
                                       <td className="py-2 text-stone-600">{feature.value}</td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  )}
                  {/* Description */}
                  <h3 className='text-2xl mb-4 underline underline-offset-8'>نقد و بررسی</h3>
                  <div
                     className='py-2 lg:text-lg '
                     dangerouslySetInnerHTML={{ __html: productDetails?.description || '' }}
                  />
               </div>

               {/* Reviews and Ratings */}
               <div className="lg:border lg:border-stone-200 lg:shadow-lg lg:shadow-gray-300 lg:rounded-xl py-8 px-2 lg:px-10 mt-10">
                  <h4 className='text-2xl'>نظرات</h4>
                  {reviews.length > 0 ? (
                     reviews.map((review: Review, index: number) => (
                        <div key={review.name + review.createdAt} className='mt-4 pb-4 border-b border-gray-300'>
                           <p className='text-sm text-gray-600'>کاربر: {review.name}</p>
                           <p className='text-sm text-gray-600'>{renderStars(review.rating)}</p>
                           <p className='text-sm text-gray-600'>{review.createdAt.substring(0, 10)}</p>
                           <p className='text-xl pt-4'>{review.comment}</p>
                        </div>
                     ))
                  ) : (
                     <p>هیچ نظری ثبت نشده...</p>
                  )}

                  {loadingAddReview && <Loader />}

                  {userInfo ? (
                     <form onSubmit={handleReviewSubmit} className='mt-8'>
                        <h4 className='text-xl'>افزودن نظر</h4>
                        {reviewError && <p className='text-red-500'>{reviewError}</p>}
                        <div className='mt-4'>
                           <label className='block'>
                              به این پست امتیاز بدید:
                              <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className='block w-full mt-1 border'>
                                 <option value={0}>انتخاب کنید...</option>
                                 {[1, 2, 3, 4, 5].map(star => (
                                    <option key={star} value={star}>{star}</option>
                                 ))}
                              </select>
                           </label>
                        </div>
                        <div className='mt-4'>
                           <label className='block'>
                              متن:
                              <textarea
                                 value={comment}
                                 onChange={(e) => setComment(e.target.value)}
                                 rows={4}
                                 className='block w-full mt-1 border'
                                 placeholder='متن خود را وارد کنید...'
                              />
                           </label>
                        </div>
                        <button
                           disabled={loadingAddReview}
                           type='submit'
                           className='mt-4 bg-theme-color w-full text-xl p-4 rounded-md text-white hover:bg-theme-color/90 hover:shadow-xl duration-200'
                        >
                           ثبت نظر
                        </button>
                     </form>
                  ) : (
                     <ErrorMessage>
                        برای نظر دادن ابتدا<Link href='/login' className='mr-1'>وارد شوید.</Link>
                     </ErrorMessage>
                  )}
               </div>
            </div>

            {/* Add to cart */}
            <div className='hidden md:block min-w-fit my-10 lg:my-0'>
               <div className='space-y-6 border border-stone-200 shadow-lg  shadow-gray-300 rounded-xl py-8 px-10'>
                  <div className="flex justify-between gap-20">
                     <h4>قیمت</h4>
                     {productDetails && <h5>
                        {PersianNumber(productDetails?.price.toLocaleString())} تومان
                     </h5>}
                  </div>
                  <div className="flex justify-between gap-20 text-red-600">
                     <h4>قیمت با تخفیف</h4>
                     {productDetails && <h5>
                        {PersianNumber(productDetails?.priceWithOff.toLocaleString())} تومان
                     </h5>}
                  </div>
                  {productDetails && productDetails?.countInStock === 1 && (
                     <p className='text-red-500 font-semibold text-sm'>
                        فقط 1 عدد از این کالا در انبار موجود است.
                     </p>
                  )}
                  <button onClick={() => handleAddToCart(productDetails, selectedColor)} className='flex justify-center bg-theme-color w-full text-xl p-4 rounded-md text-white hover:shadow-xl hover:shadow-theme-color/30 hover:bg-theme-color/95 duration-200'>
                     افزودن به سبد خرید
                  </button>
               </div>
            </div>

            <div className='fixed md:hidden bottom-12 right-0 w-full bg-white z-20'>
               <div className='flex w-full gap-2 justify-between items-center border-t border-stone-300 shadow-lg shadow-gray-300 pt-2 pb-3 px-4 text-sm'>
                  {productDetails &&
                     <div className='flex justify-center gap-1'>
                        <span className='px-2 max-h-fit rounded-md bg-red-600 text-white'>% {PersianNumber(productDetails?.discount.toLocaleString())}</span>
                        <span className='px-4 line-through text-red-600 text-xs'>{PersianNumber(productDetails?.price.toLocaleString())}</span>
                        <span className="font-semibold">{PersianNumber(productDetails?.priceWithOff.toLocaleString())}</span>
                        <span>&nbsp; تومان</span>
                     </div>
                  }
                  {productDetails && productDetails?.countInStock === 1 && (
                     <p className='text-red-500 font-semibold text-sm'>
                        فقط 1 عدد از این کالا در انبار موجود است.
                     </p>
                  )}
                  <button onClick={() => handleAddToCart(productDetails, selectedColor)} className='bg-theme-color w-fit px-3 py-2 rounded-md text-white hover:shadow-lg hover:shadow-theme-color/30 hover:bg-theme-color/95 duration-200'>
                     افزودن کالا
                  </button>
               </div>
            </div>
         </div>
      </>
   )
}

export default ProductDetailPage;