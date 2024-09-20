export type Category = {
   name: string;
   slug: string;
};

export interface Product {
   _id: number;
   name: string;
   price: number;
   description: string;
   countInStock: number;
   category: Category;
   subcategory?: Category;
   image: string;
   brand: string;
   tags: string[];
   reviews: Review[];
}

export interface Review {
   rating: number;
   comment: string;
   name: string;
   createdAt: string
}

export interface CartItem {
   product: Product;
   quantity: number;
}

export interface UserInfo {
   _id: number;
   name: string;
   email: string;
   password: string;
   isAdmin: boolean;
   createdAt: string
}