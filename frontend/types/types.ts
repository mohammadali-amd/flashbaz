export interface Product {
   _id: number;
   name: string;
   price: string;
   description: string;
   countInStock: string;
   category: string;
   tags: string[];
}

export interface CartItem {
   product: Product;
   quantity: number;
}