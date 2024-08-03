import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';
import { useGetProductDetailsQuery, useUpdateProductMutation } from '@/slices/productsApiSlice';
import { toast } from 'react-toastify';
import Link from 'next/link';

const EditProductPage = () => {
   const router = useRouter();
   const productId = router.query.id;

   // const { userInfo } = useSelector((state: RootState) => state.auth);

   const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId as string);

   const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

   const [name, setName] = useState('');
   const [price, setPrice] = useState(0);
   const [image, setImage] = useState('');
   const [brand, setBrand] = useState('');
   const [category, setCategory] = useState('');
   const [countInStock, setCountInStock] = useState(0);
   const [description, setDescription] = useState('');

   useEffect(() => {
      if (product) {
         setName(product.name);
         setImage(product.image);
         setBrand(product.brand);
         setPrice(product.price);
         setCategory(product.category);
         setCountInStock(product.countInStock);
         setDescription(product.description);
      }
   }, [product]);

   const submitHandler = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         await updateProduct({
            productId,
            name,
            price,
            category,
            countInStock,
            description,
            image,
            brand,
         }).unwrap()

         toast.success('Product updated successfully');
         refetch()
         router.push('/admin/productsList');
      } catch (error) {
         toast.error((error as any)?.data?.message || (error as any)?.message);
      }
   };

   if (isLoading) {
      return <Loader />;
   }

   if (error) {
      return <ErrorMessage>Error</ErrorMessage>;
   }

   return (
      <div className="border border-stone-200 shadow-lg shadow-gray-300 rounded-xl p-8 m-10">
         <Link href='/admin/productsList' className='flex items-center gap-2 text-xl bg-slate-200 w-fit py-1 px-2 rounded-md hover:shadow-md hover:bg-slate-300 duration-200'>
            <i className="lni lni-arrow-right"></i>
            بازگشت
         </Link>
         <h1 className="text-3xl pb-6 pt-4">ویرایش محصول</h1>
         {loadingUpdate && <Loader />}

         {isLoading ? <Loader /> : error ? (
            <ErrorMessage>Error</ErrorMessage>
         ) : (
            <form onSubmit={submitHandler} className="space-y-4">
               <div>
                  <label className="block text-gray-700">نام محصول</label>
                  <input
                     type="text"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className="w-full px-4 py-2 border rounded-lg"
                  />
               </div>
               <div>
                  <label className="block text-gray-700">قیمت</label>
                  <input
                     type="number"
                     value={price}
                     onChange={(e) => setPrice(Number(e.target.value))}
                     className="w-full px-4 py-2 border rounded-lg"
                  />
               </div>
               <div>
                  <label className="block text-gray-700">دسته بندی</label>
                  <input
                     type="text"
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}
                     className="w-full px-4 py-2 border rounded-lg"
                  />
               </div>
               <div>
                  <label className="block text-gray-700">برند</label>
                  <input
                     type="text"
                     value={brand}
                     onChange={(e) => setBrand(e.target.value)}
                     className="w-full px-4 py-2 border rounded-lg"
                  />
               </div>
               <div>
                  <label className="block text-gray-700">تعداد</label>
                  <input
                     type="number"
                     value={countInStock}
                     onChange={(e) => setCountInStock(Number(e.target.value))}
                     className="w-full px-4 py-2 border rounded-lg"
                  />
               </div>
               <div>
                  <label className="block text-gray-700">توضیحات</label>
                  <input
                     type="text"
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     className="w-full px-4 py-2 border rounded-lg"
                  />
               </div>
               <div>
                  <label className="block text-gray-700">عکس</label>
                  <input
                     type="text"
                     value={image}
                     onChange={(e) => setImage(e.target.value)}
                     className="w-full px-4 py-2 border rounded-lg"
                  />
               </div>
               <button
                  type="submit"
                  className="w-full py-2 px-4 bg-teal-500 text-white rounded-lg hover:shadow-md hover:bg-teal-600 duration-200"
               >
                  اعمال تغییرات
               </button>
            </form>
         )}
      </div>
   );
};

export default EditProductPage;
