import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Head from 'next/head';

import { addItem } from '@/slices/cartSlice';
import { PersianNumber } from '@/utils/PersianNumber';
import { useAddReviewMutation, useGetProductDetailsQuery } from '@/slices/productsApiSlice';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';
import { useState } from 'react';
import { Review } from '@/types/types';
import Link from 'next/link';
import { RootState } from '@/store/store';
import { toast } from 'react-toastify';

interface ProductDetailPageProps {
   productId: string;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
   const dispatch = useDispatch()
   // const router = useRouter()

   const [rating, setRating] = useState(0)
   const [comment, setComment] = useState('')
   const [reviewError, setReviewError] = useState('')

   const { data: productDetails, isLoading, error, refetch } = useGetProductDetailsQuery(productId)

   const [addReview, { isLoading: loadingAddReview }] = useAddReviewMutation()

   const reviews = productDetails?.reviews || [];

   const { userInfo } = useSelector((state: RootState) => state.auth)

   const handleAddToCart = () => {
      if (productDetails) {
         dispatch(addItem(productDetails)); // Pass productDetails to addItem
         // router.push('/cart')
         toast.success('محصول مورد نظر به سبد خرید شما اضافه شد')
      }
   };

   const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (rating === 0 || comment.trim() === '') {
         setReviewError('Please provide a rating and comment.')
         return
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
      return '💚'.repeat(rating) + '🤍'.repeat(5 - rating);
   };

   if (isLoading) {
      return <Loader />
   }

   if (error) {
      const errMsg = 'error' in error ? error.error : JSON.stringify(error)
      return <ErrorMessage>{errMsg}</ErrorMessage>
   }

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

         <div className='mx-6 lg:mx-20 my-5'>
            <div className='lg:flex lg:justify-between lg:gap-20'>
               {/* Cart */}
               <div className='w-full space-y-8'>
                  <div className="lg:flex justify-between gap-6 border border-stone-200 shadow-lg  shadow-gray-300 rounded-xl py-8 px-10">
                     <div>
                        <h3 className='text-2xl'>
                           {productDetails?.name}
                        </h3>
                        <p className='py-2 lg:text-xl'>
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
                           <div className="relative w-96 h-96">
                              <Image
                                 src={`${productDetails?.image}`}
                                 className='rounded-xl'
                                 alt='Product image'
                                 layout='fill'
                                 objectFit='cover'
                              />
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Reviews and Ratings */}
                  <div className="border border-stone-200 shadow-lg shadow-gray-300 rounded-xl py-8 px-10 mt-10">
                     <h4 className='text-2xl'>نظرات</h4>
                     {reviews.length > 0 ? (
                        reviews.map((review: Review, index: number) => (
                           <div key={index} className='mt-4 pb-4 border-b border-gray-300'>
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
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
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
                              className='mt-4 bg-emerald-600 w-full text-xl p-4 rounded-md text-white hover:bg-emerald-700 hover:shadow-xl duration-200'
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

               {/* Submit */}
               <div className='min-w-fit my-10 lg:my-0'>
                  <div className='space-y-6 border border-stone-200 shadow-lg  shadow-gray-300 rounded-xl py-8 px-10'>
                     <div className="flex justify-between gap-20">
                        <h4>قیمت</h4>
                        {productDetails && <h5>
                           {PersianNumber(productDetails?.price.toLocaleString())} تومان
                        </h5>}
                     </div>
                     <div className="flex justify-between gap-20 text-red-600">
                        <h4>تخفیف</h4>
                        <h5>0 تومان</h5>
                     </div>
                     {productDetails && productDetails?.countInStock === 1 && (
                        <p className='text-red-500 font-semibold text-sm'>
                           فقط 1 عدد از این کالا در انبار موجود است.
                        </p>
                     )}
                     <button onClick={handleAddToCart} className='flex justify-center bg-emerald-600 w-full text-xl p-4 rounded-md text-white hover:shadow-xl hover:shadow-emerald-500/30 hover:bg-emerald-700 duration-200'>
                        افزودن به سبد خرید
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default ProductDetailPage;