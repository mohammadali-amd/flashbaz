import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useAddSubCategoryMutation, useUpdateSubCategoryMutation, useDeleteSubCategoryMutation } from '@/slices/categoriesApiSlice';
import Loader from '@/components/Loader';
import Link from 'next/link';
interface Subcategory {
   _id: string;
   name: string;
   slug: string;
}

interface Category {
   _id: string;
   name: string;
   slug: string;
   subcategories: Subcategory[];
}

const CategoryManagement = () => {
   const { data: categories, refetch, isFetching } = useGetCategoriesQuery(undefined);
   const [createCategory] = useCreateCategoryMutation();
   const [updateCategory] = useUpdateCategoryMutation();
   const [deleteCategory] = useDeleteCategoryMutation();
   const [addSubCategory] = useAddSubCategoryMutation();
   const [updateSubCategory] = useUpdateSubCategoryMutation();
   const [deleteSubCategory] = useDeleteSubCategoryMutation();

   const [newCategoryName, setNewCategoryName] = useState('');
   const [newCategorySlug, setNewCategorySlug] = useState('');
   const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
   const [editingCategoryName, setEditingCategoryName] = useState('');
   const [editingCategorySlug, setEditingCategorySlug] = useState('');
   const [newSubcategoryNames, setNewSubcategoryNames] = useState<{ [key: string]: string }>({});
   const [newSubcategorySlug, setNewSubcategorySlug] = useState<{ [key: string]: string }>({});
   const [editingSubcategoryName, setEditingSubcategoryName] = useState<{ [key: string]: string }>({});
   const [editingSubcategorySlug, setEditingSubcategorySlug] = useState<{ [key: string]: string }>({});
   const [loading, setLoading] = useState(false);

   const submitHandler = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      try {
         if (editingCategoryId) {
            await updateCategory({ id: editingCategoryId, name: editingCategoryName, slug: editingCategorySlug });
            toast.success('دسته بندی با موفقیت بروزرسانی شد');
         } else {
            await createCategory({ name: newCategoryName, slug: newCategorySlug });
            toast.success('دسته بندی با موفقیت ایجاد شد');
         }
         refetch();
         setNewCategoryName('');
         setNewCategorySlug('');
         setEditingCategoryId(null);
         setEditingCategoryName('');
         setEditingCategorySlug('');
      } catch (error) {
         toast.error('مشکلی در ایجاد/بروزرسانی دسته بندی رخ داد!');
      } finally {
         setLoading(false);
      }
   };

   const deleteHandler = async (id: string) => {
      if (window.confirm('آیا مطمئن هستید؟')) {
         setLoading(true);
         try {
            await deleteCategory(id);
            toast.success('دسته بندی با موفقیت حذف شد');
            refetch();
         } catch (error) {
            toast.error('در حذف دسته بندی مشکلی بوجود آمده!');
         } finally {
            setLoading(false);
         }
      }
   };

   const addSubcategoryHandler = async (categoryId: string) => {
      setLoading(true);
      try {
         await addSubCategory({ id: categoryId, name: newSubcategoryNames[categoryId], slug: newSubcategorySlug[categoryId] });
         toast.success('زیر مجموعه دسته بندی با موفقیت اضافه شد');
         setNewSubcategoryNames((prev) => ({ ...prev, [categoryId]: '' }));
         setNewSubcategorySlug((prev) => ({ ...prev, [categoryId]: '' }));
         refetch();
      } catch (error) {
         toast.error('در ایجاد زیر مجموعه مشکلی رخ داد');
      } finally {
         setLoading(false);
      }
   };

   const editSubcategoryHandler = async (categoryId: string, subcategoryId: string) => {
      setLoading(true);
      try {
         await updateSubCategory({ categoryId, subId: subcategoryId, name: editingSubcategoryName[subcategoryId], slug: editingSubcategorySlug[subcategoryId] });
         toast.success('زیر مجموعه دسته بندی با موفقیت ویرایش شد');
         setEditingSubcategoryName((prev) => ({ ...prev, [subcategoryId]: '' }));
         setEditingSubcategorySlug((prev) => ({ ...prev, [subcategoryId]: '' }));
         refetch();
      } catch (error) {
         toast.error('در ویرایش زیر مجموعه مشکلی رخ داد');
      } finally {
         setLoading(false);
      }
   };

   const deleteSubcategoryHandler = async (categoryId: string, subId: string) => {
      if (window.confirm('آیا مطمئن هستید؟')) {
         setLoading(true);
         try {
            await deleteSubCategory({ categoryId, subId });
            toast.success('زیر مجموعه با موفقیت حذف شد');
            refetch();
         } catch (error) {
            toast.error('در حذف زیر مجموعه مشکلی بوجود آمده!');
         } finally {
            setLoading(false);
         }
      }
   };

   if (isFetching) return <Loader />;

   return (
      <div className="max-w-5xl mx-auto p-8 bg-white border shadow-lg rounded-lg my-20">
         <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">مدیریت دسته بندی ها</h1>

         <form onSubmit={submitHandler} className="mb-8">
            <div className="md:flex gap-2 mb-6">
               <input
                  type="text"
                  value={editingCategoryId ? editingCategoryName : newCategoryName}
                  onChange={(e) => editingCategoryId ? setEditingCategoryName(e.target.value) : setNewCategoryName(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="نام دسته بندی را وارد کنید"
                  required
               />
               <input
                  type="text"
                  value={editingCategoryId ? editingCategorySlug : newCategorySlug}
                  onChange={(e) => editingCategoryId ? setEditingCategorySlug(e.target.value) : setNewCategorySlug(e.target.value)}
                  className="w-full p-4 mt-2 md:mt-0 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="لینک صفحه دسته بندی را وارد کنید"
                  required
               />
            </div>
            <div className="flex gap-4">
               <button
                  type="submit"
                  className={`px-6 py-3 font-semibold rounded-lg transition-colors duration-200 ${editingCategoryId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} text-white`}
                  disabled={loading}
               >
                  {editingCategoryId ? 'بروزرسانی دسته بندی' : 'ایجاد دسته بندی جدید'}
               </button>
               {editingCategoryId && (
                  <button
                     type="button"
                     onClick={() => {
                        setEditingCategoryId(null);
                        setEditingCategoryName('');
                     }}
                     className="px-6 py-3 font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white"
                  >
                     لغو
                  </button>
               )}
            </div>
         </form>

         <h2 className='text-2xl font-semibold my-8 text-center text-gray-800'>دسته بندی ها</h2>
         <ul className="space-y-14">
            {categories?.map((category: Category) => (
               <li key={category._id} className="p-6 border border-gray-200 rounded-lg shadow-md bg-gray-100">
                  <div className="flex items-center justify-between mb-4">
                     <Link href={`/products/${category.slug}`}>
                        <span className="text-xl font-semibold text-gray-800">{category.name}</span>
                     </Link>
                     <Link href={`/products/${category.slug}`}>
                        <span className="text-lg font-light text-gray-800">لینک صفحه: {category.slug}</span>
                     </Link>
                     <div className="flex gap-3">
                        <button
                           onClick={() => { setEditingCategoryId(category._id); setEditingCategoryName(category.name); }}
                           className="px-4 py-2 font-semibold rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white"
                        >
                           ویرایش
                        </button>
                        <button
                           onClick={() => deleteHandler(category._id)}
                           className="px-4 py-2 font-semibold rounded-lg bg-red-500 hover:bg-red-600 text-white"
                        >
                           حذف
                        </button>
                     </div>
                  </div>

                  <form
                     onSubmit={(e) => {
                        e.preventDefault();
                        addSubcategoryHandler(category._id);
                     }}
                     className="mb-6"
                  >
                     <div className="md:flex gap-2 mb-4">
                        <input
                           type="text"
                           value={newSubcategoryNames[category._id] || ''}
                           onChange={(e) => setNewSubcategoryNames((prev) => ({ ...prev, [category._id]: e.target.value }))}
                           className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="نام زیر مجموعه را وارد کنید"
                           required
                        />
                        <input
                           type="text"
                           value={newSubcategorySlug[category._id] || ''}
                           onChange={(e) => setNewSubcategorySlug((prev) => ({ ...prev, [category._id]: e.target.value }))}
                           className="w-full p-3 mt-2 md:mt-0 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="لینک صفحه زیر مجموعه را وارد کنید"
                           required
                        />
                     </div>
                     <button
                        type="submit"
                        className="px-6 py-3 font-semibold rounded-lg bg-green-600 hover:bg-green-700 text-white"
                        disabled={loading}
                     >
                        اضافه کردن زیر مجموعه جدید
                     </button>
                  </form>

                  <ul className='mx-0 lg:mx-20 bg-white shadow-md border p-2 rounded-lg'>
                     <h3 className='text-lg font-semibold mb-2 text-center text-gray-800'>زیر مجموعه ها</h3>
                     {category.subcategories.map((sub: Subcategory) => (
                        <li key={sub._id} className="p-3 bg-white lg:flex gap-3 justify-between items-center">
                           <input
                              type="text"
                              value={editingSubcategoryName[sub._id] || sub.name}
                              onChange={(e) => setEditingSubcategoryName((prev) => ({ ...prev, [sub._id]: e.target.value }))}
                              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder='نام زیر مجموعه'
                           />
                           <input
                              type="text"
                              value={editingSubcategorySlug[sub._id] || sub.slug}
                              onChange={(e) => setEditingSubcategorySlug((prev) => ({ ...prev, [sub._id]: e.target.value }))}
                              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder='لینک صفحه زیر مجموعه'
                           />
                           <div className="flex items-center gap-3 pt-3 lg:pt-0">
                              <button
                                 onClick={() => editSubcategoryHandler(category._id, sub._id)}
                                 className="px-3 py-1 font-semibold rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white"
                                 disabled={loading}
                              >
                                 ویرایش
                              </button>
                              <button
                                 onClick={() => deleteSubcategoryHandler(category._id, sub._id)}
                                 className="px-3 py-1 font-semibold rounded-lg bg-red-500 hover:bg-red-600 text-white"
                                 disabled={loading}
                              >
                                 حذف
                              </button>
                           </div>
                        </li>
                     ))}
                  </ul>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default CategoryManagement;
