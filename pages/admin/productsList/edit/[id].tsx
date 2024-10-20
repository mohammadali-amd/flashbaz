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
import { IoTrashOutline } from 'react-icons/io5';
import ColorPalette from '@/components/UI/ColorPalette';
import type { Category, Color, Subcategory } from '@/types/types';

const initialState = {
   name: '',
   price: 0,
   priceWithOff: 0,
   discount: 0,
   isAmazingOffer: false,
   image: '',
   additionalImages: [''],
   brand: '',
   colors: [{ name: '', code: '' }],
   category: { name: '', slug: '' },
   subcategory: { name: '', slug: '' },
   features: [{ title: '', value: '', mainFeature: false }],
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
         const { name, price, priceWithOff, isAmazingOffer, image, additionalImages, brand, colors, category, subcategory, features, countInStock, description } = product;
         setFormData({
            name,
            price,
            priceWithOff,
            discount: calculateDiscount(price, priceWithOff),
            isAmazingOffer,
            image,
            additionalImages: additionalImages || [''],
            brand,
            colors: colors || [{ name: '', code: '' }],
            category: { name: category.name, slug: category.slug },
            subcategory: { name: subcategory?.name || '', slug: subcategory?.slug || '' },
            features: features ? features.map(f => ({ title: f.title || '', value: f.value || '', mainFeature: f.mainFeature || false })) : [{ title: '', value: '', mainFeature: false }],
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
   const selectedCategory = categoriesData?.find((cat: Category) => cat.slug === formData.category.slug);
   const subcategories = selectedCategory ? selectedCategory.subcategories : [];

   const handleColorSelect = (color: Color) => {
      const newColor = [...formData.colors, color];
      setFormData({ ...formData, colors: newColor });
   };

   const removeColor = (index: number) => {
      const newColor = [...formData.colors];
      newColor.splice(index, 1);
      setFormData({ ...formData, colors: newColor });
   };

   const handleFeatureChange = (index: number, key: string, value: string | boolean) => {
      const newFeatures = [...formData.features];
      newFeatures[index] = { ...newFeatures[index], [key]: value };
      setFormData({ ...formData, features: newFeatures });
   };

   const addFeatureField = () => {
      setFormData((prevState) => ({
         ...prevState,
         features: [...prevState.features, { title: '', value: '', mainFeature: false }] // Add new empty feature
      }));
   };

   const removeFeatureField = (index: number) => {
      const newFeatures = [...formData.features];
      newFeatures.splice(index, 1);
      setFormData({ ...formData, features: newFeatures });
   };

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

         toast.success('تغییرات با مفقیت اعمال شد');
         refetch()
         router.push('/admin/productsList');
      } catch (error) {
         toast.error('اعمال تغییرات با خطا مواجه شد');
         console.log(error);
      }
   };

   if (isLoading) {
      return <Loader />
   };

   if (error) {
      return <ErrorMessage>Error</ErrorMessage>
   };

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
                        const selectedCategory = categoriesData?.find((cat: Category) => cat.slug === e.target.value);
                        if (selectedCategory) {
                           setFormData({ ...formData, category: { name: selectedCategory.name, slug: selectedCategory.slug } });
                        }
                     }}
                     options={categoriesData?.map((cat: Category) => ({ value: cat.slug, label: cat.name })) || []}
                  />
                  <InputField
                     label="زیر مجموعه"
                     type='select'
                     value={formData.subcategory.slug}
                     onChange={(e) => {
                        const selectedSubcategory = subcategories.find((sub: Subcategory) => sub.slug === e.target.value);
                        if (selectedSubcategory) {
                           setFormData({ ...formData, subcategory: { name: selectedSubcategory.name, slug: selectedSubcategory.slug } });
                        }
                     }}
                     options={subcategories?.map((cat: Subcategory) => ({ value: cat.slug, label: cat.name })) || []}
                  />
                  <InputField
                     label="برند"
                     type="text"
                     value={formData.brand}
                     onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  />
               </div>

               <div className="grid lg:grid-cols-4">
                  {/* Color Palette for selecting colors */}
                  <div>
                     <h4>انتخاب رنگ</h4>
                     <ColorPalette onColorSelect={handleColorSelect} />
                  </div>
                  {/* Show selected colors */}
                  <div>
                     <h4>رنگ های محصول</h4>
                     <div className="flex gap-4 w-screen px-2 overflow-auto">
                        {formData.colors.map((color, index) => (
                           <div key={index} className={`flex items-center py-2 gap-3 border rounded-md px-2`}>
                              <div style={{ backgroundColor: color.code }} className='w-5 h-5 border rounded-md' />
                              <span>{color.name}</span>
                              <button type="button" className="text-red-500" onClick={() => removeColor(index)}>
                                 <IoTrashOutline size={20} />
                              </button>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
               <div>
                  <h3 className="text-xl mb-2">ویژگی‌ها</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                     {formData.features.map((feature, index) => (
                        <div key={index} className="relative grid md:grid-cols-2 gap-4 border rounded-md px-4 py-4 bg-gray-50/80">
                           <InputField
                              label={`عنوان ویژگی ${index + 1}`}
                              type="text"
                              value={feature.title}
                              onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                           />
                           <InputField
                              label={`مقدار ویژگی ${index + 1}`}
                              type="text"
                              value={feature.value}
                              onChange={(e) => handleFeatureChange(index, 'value', e.target.value)}
                           />
                           <div className='absolute top-0 left-14'>
                              <InputField
                                 label=""
                                 type="checkbox"
                                 checked={feature.mainFeature}
                                 onChange={(e) => handleFeatureChange(index, 'mainFeature', (e.target as HTMLInputElement).checked)}
                              />
                           </div>
                           <button type="button" className="absolute top-2 left-2 text-red-500" onClick={() => removeFeatureField(index)}>
                              <IoTrashOutline size={20} />
                           </button>
                        </div>
                     ))}
                  </div>
                  <button type="button" onClick={addFeatureField} className="text-theme-color mb-8">
                     + افزودن ویژگی جدید
                  </button>
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