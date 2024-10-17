import React, { useState, useCallback } from 'react';
import { useDeleteImageMutation, useFetchMediaQuery, useUploadImagesMutation } from '@/slices/mediaApiSlice';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { FiTrash2, FiUploadCloud } from 'react-icons/fi';
import { FaRegTimesCircle, FaSpinner } from 'react-icons/fa';
import Image from 'next/image';

const MediaPage = () => {
   const { data: images, isLoading: isLoadingMedia, refetch } = useFetchMediaQuery({});
   const [deleteImage] = useDeleteImageMutation();
   const [uploadImages] = useUploadImagesMutation();
   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
   const [isUploading, setIsUploading] = useState(false);

   const onDrop = useCallback((acceptedFiles: File[]) => {
      setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
   }, []);

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
         'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      }
   });

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
      }
   };

   const handleUpload = async () => {
      if (selectedFiles.length === 0) {
         toast.error('برای آپلود، تصویر را بکشید و در کادر موجود در صفحه رها کنید');
         return;
      }

      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append('images', file));

      try {
         setIsUploading(true);
         await uploadImages(formData).unwrap();
         toast.success('تصویر با موفقیت آپلود شد');
         setSelectedFiles([]); // Reset after upload
         refetch(); // Refresh media list
      } catch (error) {
         toast.error('آپلود تصویر ناموفق بود');
      } finally {
         setIsUploading(false);
      }
   };

   const handleCancelImage = (index: number) => {
      setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
   };

   const handleDelete = async (key: string) => {
      if (window.confirm('آیا از حذف تصویر اطمینان دارید؟')) {
         try {
            await deleteImage(key).unwrap();
            toast.success('تصویر با موفقیت حذف شد');
            refetch(); // Refresh media list
         } catch (error) {
            toast.error('حذف تصویر با مشکل مواجه شده');
         }
      }
   };

   const handleCopyUrl = (url: string) => {
      navigator.clipboard.writeText(url)
         .then(() => {
            toast.success('URL copied to clipboard');
         })
         .catch((error) => {
            toast.error('Failed to copy URL');
         });
   };

   if (isLoadingMedia) return <div className="flex justify-center items-center h-screen"><FaSpinner className="animate-spin text-4xl" /></div>;

   return (
      <div className="container mx-auto p-6 my-10">
         <h1 className="text-5xl mb-10">مدیریت تصاویر</h1>

         {/* Image Upload Section */}
         <div className="mb-8">
            <div
               {...getRootProps()}
               className={`border-2 border-dashed p-32 text-center rounded-lg ${isDragActive ? 'border-theme-color bg-blue-50' : 'border-gray-300'}`}
            >
               <input {...getInputProps()} />
               {isDragActive ? (
                  <p className="text-theme-color">اینجا رها کنید...</p>
               ) : (
                  <p className="text-gray-500">تصویر خود را اینجا رها کنید...</p>
               )}
            </div>

            <input type="file" multiple accept="image/*" onChange={handleFileChange} className="mt-3" />

            {selectedFiles.length > 0 && (
               <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4">
                  {selectedFiles.map((file, index) => (
                     <div key={index} className="relative flex justify-center items-center group border rounded-xl shadow-md">
                        <div className='m-4 h-56 min-w-fit md:max-h-full flex items-center'>
                           <Image
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              width={200}
                              height={200}
                           />
                        </div>
                        <button
                           onClick={() => handleCancelImage(index)}
                           className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                           <FaRegTimesCircle />
                        </button>
                     </div>
                  ))}
               </div>
            )}

            <button
               onClick={handleUpload}
               className={`bg-theme-color text-white px-4 py-2 mt-8 rounded-md shadow-md flex gap-2 items-center ${isUploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
               disabled={isUploading}
            >
               {isUploading ? (
                  <FaSpinner className="animate-spin" />
               ) : (
                  <FiUploadCloud />
               )}
               <span>{isUploading ? 'در حال آپلود...' : 'آپلود تصویر'}</span>
            </button>
         </div>

         <h2 className="text-4xl my-10">تصاویر موجود:</h2>

         {/* Image Listing Section */}
         {images && images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
               {images.map((image: any) => (
                  <div key={image.key} className="relative flex justify-center items-center group border rounded-xl shadow-md">
                     <div className='m-4 h-56 min-w-fit md:max-h-full flex items-center'>
                        <Image
                           src={image.url}
                           alt={image.key}
                           className="cursor-pointer"
                           width={200}
                           height={200}
                           onClick={() => handleCopyUrl(image.url)}
                        />
                     </div>
                     <button
                        onClick={() => handleDelete(image.key)}
                        className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                        <FiTrash2 />
                     </button>
                  </div>
               ))}
            </div>
         ) : (
            <p className="text-center">هیچ تصویری یافت نشد.</p>
         )}
      </div>
   );
};

export default MediaPage;
