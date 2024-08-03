export interface Product {
   _id: number;
   name: string;
   price: number;
   description: string;
   countInStock: number;
   category: string;
   image: string;
   brand: string;
   tags: string[];
}

export interface CartItem {
   product: Product;
   quantity: number;
}