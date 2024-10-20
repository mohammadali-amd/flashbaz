export type Category = {
   name: string;
   slug: string;
   subcategories?: Subcategory[];
};

export type Subcategory = {
   name: string;
   slug: string;
}

export type Features = {
   title: string;
   value: string;
   mainFeature: boolean;
};

export type Color = {
   name: string;
   code: string;
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
   colors?: Color[];
   features?: Features[];
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
   color: {
      name: string,
      code: string
   }
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