export type Category = {
   name: string;
   slug: string;
};

export interface Product {
   _id: number;
   name: string;
   price: number;
   priceWithOff: number;
   discount: number;
   isAmazingOffer: boolean;
   description: string;
   countInStock: number;
   category: Category;
   subcategory?: Category;
   image: string;
   additionalImages?: string[];
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
   phone: number;
   email: string;
   password: string;
   city?: string;
   postalCode?: string;
   address?: string;
   isAdmin: boolean;
   createdAt: string
}