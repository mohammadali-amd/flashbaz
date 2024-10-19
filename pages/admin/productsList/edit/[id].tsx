import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';

import Loader from '@/components/UI/Loader';
import ErrorMessage from '@/components/UI/ErrorMessage';
import InputField from '@/components/UI/InputField';
import { Editor } from '@/components/Editor';
import { calculateDiscount } from '@/utils/calculateDiscount';
import { useGetProductDetailsQuery, useUpdateProductMutation } from '@/slices/productsApiSlice';
import { useGetCategoriesQuery } from '@/slices/categoriesApiSlice';

const initialState = {
   name: '',
   price: 0,
   priceWithOff: 0,
   discount: 0,
   isAmazingOffer: false,
   image: '',
   additionalImages: [''],
   brand: '',
   category: { name: '', slug: '' },
   subcategory: { name: '', slug: '' },
   countInStock: 0,
   description: ''
}

const EditProductPage = () => {
   const router = useRouter();
   const productId = router.query.id;

   const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId as string);
   const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
   const { data: categoriesData } = useGetCategoriesQuery(undefined);

   const [formData, setFormData] = useState(initialState);

   useEffect(() => {
      if (product) {
         const { name, price, priceWithOff, isAmazingOffer, image, additionalImages, brand, category, subcategory, countInStock, description } = product;
         setFormData({
            name,
            price,
            priceWithOff,
            discount: calculateDiscount(price, priceWithOff),
            isAmazingOffer,
            image,
            additionalImages: additionalImages || [''],
            brand,
            category: { name: category.name, slug: category.slug },
            subcategory: { name: subcategory?.name || '', slug: subcategory?.slug || '' },
            countInStock,
            description
         });
      }
   }, [product]);

   useEffect(() => {
      // setDiscount(calculateDiscount(price, priceWithOff));
      setFormData((prev) => ({ ...prev, discount: calculateDiscount(prev.price, prev.priceWithOff) }));
   }, [formData.price, formData.priceWithOff]);

   // Filter subcategories based on the selected category
   const selectedCategory = categoriesData?.find((cat: any) => cat.slug === formData.category.slug);
   const subcategories = selectedCategory ? selectedCategory.subcategories : [];

   const handleDescriptionChange = (value: string) => {
      setFormData({ ...formData, description: value });
   };

   const addAdditionalImageField = () => {
      setFormData(prev => ({ ...prev, additionalImages: [...prev.additionalImages, ''] }));
   };

   const handleAdditionalImageChange = (index: number, value: string) => {
      const newAdditionalImages = [...formData.additionalImages];
      newAdditionalImages[index] = value;
      setFormData({ ...formData, additionalImages: newAdditionalImages });
   };

   const submitHandler = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
         await updateProduct({
            productId, ...formData,
         }).unwrap()

         toast.success('Product updated successfully');
         refetch()
         router.push('/admin/productsList');
      } catch (error) {
         toast.error((error as any)?.data?.message || (error as any)?.message);
      }
   };

   if (isLoading) (<Loader />);

   if (error) (<ErrorMessage>Error</ErrorMessage>);

   return (
      <div className="lg:border lg:border-stone-200 lg:shadow-lg lg:shadow-gray-300 lg:rounded-xl lg:p-8 m-4 lg:m-10">
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
               <InputField
                  label='نام محصول'
                  type='text'
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
               />
               <div className="grid md:grid-cols-4 md:justify-between gap-4 md:gap-8">
                  <InputField
                     label='قیمت'
                     type="number"
                     value={formData.price}
                     onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  />
                  <InputField
                     label={`قیمت با تخفیف (${formData.discount}% درصد تخفیف)`}
                     type="number"
                     value={formData.priceWithOff}
                     onChange={(e) => setFormData({ ...formData, priceWithOff: Number(e.target.value) })}
                  />
                  <InputField
                     label='تعداد'
                     type="number"
                     value={formData.countInStock}
                     onChange={(e) => setFormData({ ...formData, countInStock: Number(e.target.value) })}
                  />
                  <InputField
                     label="تخفیف شگفت انگیز"
                     type="checkbox"
                     checked={formData.isAmazingOffer}
                     onChange={(e) => setFormData({ ...formData, isAmazingOffer: (e.target as HTMLInputElement).checked })}
                  />
               </div>
               <div className="grid md:grid-cols-3 md:justify-between gap-4 md:gap-8">
                  <InputField
                     label="دسته بندی"
                     type='select'
                     value={formData.category.slug}
                     onChange={(e) => {
                        const selectedCategory = categoriesData?.find((cat: any) => cat.slug === e.target.value);
                        if (selectedCategory) {
                           setFormData({ ...formData, category: { name: selectedCategory.name, slug: selectedCategory.slug } });
                        }
                     }}
                     options={categoriesData?.map((cat: any) => ({ value: cat.slug, label: cat.name })) || []}
                  />
                  <InputField
                     label="زیر مجموعه"
                     type='select'
                     value={formData.subcategory.slug}
                     onChange={(e) => {
                        const selectedSubcategory = subcategories.find((sub: any) => sub.slug === e.target.value);
                        if (selectedSubcategory) {
                           setFormData({ ...formData, subcategory: { name: selectedSubcategory.name, slug: selectedSubcategory.slug } });
                        }
                     }}
                     options={subcategories?.map((cat: any) => ({ value: cat.slug, label: cat.name })) || []}
                  />

                  <InputField
                     label="برند"
                     type="text"
                     value={formData.brand}
                     onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  />
               </div>
               {/* <div>
                  <label className="block text-gray-700">توضیحات</label>
                  <input
                     type="text"
                     value={formData.description}
                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                     className="w-full px-4 py-2 border rounded-lg"
                  />
               </div> */}
               <div>
                  <label className="block text-gray-700">توضیحات</label>
                  <div className="mb-40 md:mb-20">
                     <Editor value={formData.description} onChange={handleDescriptionChange} />
                  </div>
               </div>

               <div>
                  <InputField
                     label="تصویر اصلی"
                     type="text"
                     value={formData.image}
                     onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                     placeholder='لینک تصویر را وارد کنید'
                  />

                  {formData?.image && (
                     <Image
                        src={`${formData.image}`}
                        alt={formData.image}
                        width={200}
                        height={200}
                     />
                  )}
               </div>

               <div>
                  {formData.additionalImages.map((image, index) => (
                     <div key={index} className="mb-4">
                        <InputField
                           label="تصاویر اضافی"
                           type="text"
                           value={image}
                           onChange={(e) => handleAdditionalImageChange(index, e.target.value)}
                        />
                        {image && (
                           <Image
                              src={`${image}`}
                              alt={`additional image ${index + 1}`}
                              width={200}
                              height={200}
                           />
                        )}
                     </div>
                  ))}
                  <button type="button" onClick={addAdditionalImageField} className="text-theme-color">
                     + اضافه کردن تصویر بیشتر
                  </button>
               </div>

               <button
                  type="submit"
                  className="w-full py-2 px-4 bg-theme-color text-white rounded-lg hover:shadow-md hover:bg-theme-color/90 duration-200"
               >
                  اعمال تغییرات
               </button>
            </form>
         )}
      </div>
   );
};

export default EditProductPage;