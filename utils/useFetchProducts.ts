import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Product {
   _id: number;
   product: string;
   price: string;
}

export const useFetchProducts = (): Product[] | null => {
   const [products, setProducts] = useState<Product[] | null>(null);

   const url = process.env.NODE_ENV === "development" ? 'http://localhost:5000/api/products' : `${process.env.API_URL}`;

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const response: AxiosResponse<Product[]> = await axios.get(url);
            setProducts(response.data);
         } catch (error) {
            console.error('Error fetching products:', error);
            setProducts(null); // Set products to null in case of error
         }
      };

      fetchProducts();
   }, [url]);

   return products;
};