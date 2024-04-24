import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface ProductDetailPageProps {
   productId: string;
}

type ProductDetailsProps = {
   id: number;
   product: string;
   price: string;
   description: string;
   stock: string;
   category: string;
   tags: string[];
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
   const [productDetails, setProductDetails] = useState<ProductDetailsProps | null>(null)

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const response: AxiosResponse<ProductDetailsProps> = await axios.get(`http://localhost:3000/products/${productId}`);

            setProductDetails(response.data);
         } catch (error) {
            console.error('Error fetching product:', error);
         }
      };

      fetchProducts();
   }, [productId]);

   if (!productDetails) {
      return <div>Loading...</div>;
   }

   return (
      <div className='flex justify-center my-10'>
         <div className='space-y-8 text-center'>
            <div>
               <i className="lni lni-image text-[14rem] text-stone-600"></i>
            </div>
            <h1 className='text-3xl'>
               {productDetails.product}
            </h1>
            <h2 className='text-xl'>
               {parseInt(productDetails.price).toLocaleString()} تومان
            </h2>
            <h3>
               دسته بندی: {productDetails.category}
            </h3>
            <p>
               {productDetails.description}
            </p>
            <p>
               موجودی: {productDetails.stock}
            </p>
            <p>
               تگ ها:
               {productDetails.tags.map(index => (
                  <li key={index}>
                     {index}
                  </li>
               ))}
            </p>
         </div>
      </div>
   )
}

export default ProductDetailPage;