export interface Product {
   id: number;
   product: string;
   price: string;
   description: string;
   stock: string;
   category: string;
   tags: string[];
}

export interface CartItem {
   product: Product;
   quantity: number;
}