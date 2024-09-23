import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store/store';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from '@/slices/productsApiSlice';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { BASE_URL } from '@/constants/constants';
import Image from 'next/image';
import { useGetCategoriesQuery } from '@/slices/categoriesApiSlice';

const EditProductPage = () => {
   const router = useRouter();
   const productId = router.query.id;

   // const { userInfo } = useSelector((state: RootState) => state.auth);

   const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId as string);

   const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

   const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

   const { data: categoriesData, isLoading: loadingCategories } = useGetCategoriesQuery(undefined);

   const [formData, setFormData] = useState({
      name: '',
      price: 0,
      priceWithOff: 0,
      discount: 0,
      isAmazingOffer: false,
      image: '',
      brand: '',
      category: { name: '', slug: '' },
      subcategory: { name: '', slug: '' },
      countInStock: 0,
      description: ''
   });

   const [preview, setPreview] = useState<string | null>(null);

   useEffect(() => {
      if (product) {
         const { name, price, priceWithOff, isAmazingOffer, image, brand, category, subcategory, countInStock, description } = product;
         setFormData({
            name,
            price,
            priceWithOff,
            discount: calculateDiscount(price, priceWithOff),
            isAmazingOffer,
            image,
            brand,
            category: { name: category.name, slug: category.slug },
            subcategory: { name: subcategory?.name || '', slug: subcategory?.slug || '' },
            countInStock,
            description
         });
         setPreview(image);
      }
   }, [product]);

   const calculateDiscount = (price: number, priceWithOff: number) => {
      if (price && priceWithOff) {
         const discount = ((price - priceWithOff) / price) * 100;
         return Math.round(discount);
      }
      return 0;
   };

   useEffect(() => {
      // setDiscount(calculateDiscount(price, priceWithOff));
      setFormData((prev) => ({ ...prev, discount: calculateDiscount(prev.price, prev.priceWithOff) }));
   }, [formData.price, formData.priceWithOff]);

   const [file, setFile] = useState<File | null>(null);

   const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0] || null;
      if (selectedFile) {
         setFile(selectedFile);
         const previewUrl = URL.createObjectURL(selectedFile);
         setPreview(previewUrl);

         // Clean up the previous preview URL
         return () => {
            if (preview) {
               URL.revokeObjectURL(preview);
            }
         };
      }
   };

   const submitHandler = async (e: React.FormEvent) => {
      e.preventDefault();

      // Prepare the image upload
      let imageUrl = formData.image;  // Default to existing image URL if not changing

      if (file) {
         const formData = new FormData();
         formData.append('image', file);

         try {
            const res = await uploadProductImage(formData).unwrap();
            imageUrl = BASE_URL + res.image;  // Update image URL after successful upload
         } catch (error) {
            toast.error((error as any)?.data?.message || (error as any)?.message);
            return;  // Exit the function if image upload fails
         }
      }

      try {
         await updateProduct({
            productId, ...formData,
            image: imageUrl,
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

   // Filter subcategories based on the selected category
   const selectedCategory = categoriesData?.find((cat: any) => cat.slug === formData.category.slug);
   const subcategories = selectedCategory ? selectedCategory.subcategories : [];

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
                     value={formData.name}
                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                     className="w-full px-4 py-2 border rounded-lg"
                  />
               </div>
               <div className="grid md:grid-cols-4 md:justify-between gap-4 md:gap-8">
                  <div>
                     <label className="block text-gray-700">قیمت</label>
                     <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="w-full px-4 py-2 border rounded-lg"
                     />
                  </div>
                  <div>
                     <div className='flex items-center gap-2'>
                        <label className="block text-gray-700">قیمت با تخفیف</label>
                        ({formData.discount}% درصد تخفیف)
                     </div>
                     <input
                        type="number"
                        value={formData.priceWithOff}
                        onChange={(e) => setFormData({ ...formData, priceWithOff: Number(e.target.value) })}
                        className="w-full px-4 py-2 border rounded-lg"
                     />
                  </div>
                  <div>
                     <label className="block text-gray-700">تعداد</label>
                     <input
                        type="number"
                        value={formData.countInStock}
                        onChange={(e) => setFormData({ ...formData, countInStock: Number(e.target.value) })}
                        className="w-full px-4 py-2 border rounded-lg"
                     />
                  </div>
                  <div className="flex items-center gap-4">
                     <label className="block text-gray-700">تخفیف شگفت انگیز</label>
                     <label className="relative inline-flex items-center cursor-pointer">
                        <input
                           type="checkbox"
                           checked={formData.isAmazingOffer}
                           onChange={(e) => setFormData({ ...formData, isAmazingOffer: e.target.checked })}
                           className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                     </label>
                  </div>
               </div>
               <div className="grid md:grid-cols-3 md:justify-between gap-4 md:gap-8">
                  <div>
                     <label className="block text-gray-700">دسته بندی</label>
                     <select
                        value={formData.category.slug}
                        // onChange={(e: any) => setCategory(e.target.value)}
                        onChange={(e) => {
                           const selectedCategory = categoriesData?.find((cat: any) => cat.slug === e.target.value);
                           if (selectedCategory) {
                              setFormData({ ...formData, category: { name: selectedCategory.name, slug: selectedCategory.slug } });
                           }
                        }}
                        className="w-full px-4 py-2 border rounded-lg"
                     >
                        <option value="">یک دسته بندی انتخاب کنید</option>
                        {categoriesData?.map((cat: any) => (
                           <option key={cat._id} value={cat.slug}>
                              {cat.name}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div>
                     <label className="block text-gray-700">زیر مجموعه</label>
                     <select
                        value={formData.subcategory.slug}
                        // onChange={(e: any) => setSubcategory(e.target.value)}
                        onChange={(e) => {
                           const selectedSubcategory = subcategories.find((sub: any) => sub.slug === e.target.value);
                           if (selectedSubcategory) {
                              setFormData({ ...formData, subcategory: { name: selectedSubcategory.name, slug: selectedSubcategory.slug } });
                           }
                        }}
                        className="w-full px-4 py-2 border rounded-lg"
                        disabled={!formData.category.slug}
                     >
                        <option value="">یک زیر مجموعه انتخاب کنید</option>
                        {subcategories.map((sub: any) => (
                           <option key={sub._id} value={sub.slug}>
                              {sub.name}
                           </option>
                        ))}
                     </select>
                  </div>

                  <div>
                     <label className="block text-gray-700">برند</label>
                     <input
                        type="text"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                     />
                  </div>
               </div>
               <div>
                  <label className="block text-gray-700">توضیحات</label>
                  <input
                     type="text"
                     value={formData.description}
                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                     className="w-full px-4 py-2 border rounded-lg"
                  />
               </div>
               <div>
                  <label className="block text-gray-700">عکس</label>
                  {/* <input
                     type="text"
                     value={image}
                     onChange={(e) => setImage(e.target.value)}
                     className="w-full px-4 py-2 border rounded-lg"
                  /> */}
                  <input type="file" onChange={uploadFileHandler} />
                  {loadingUpload && <Loader />}
                  {preview && (
                     <div className="mt-4">
                        <Image
                           src={preview}
                           className='rounded-xl object-cover'
                           alt='Product image'
                           width={300}
                           height={300}
                        />
                     </div>
                  )}
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
