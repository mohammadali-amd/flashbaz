interface Product {
   name: string;
   slug: string;
}

interface Subcategory {
   name: string;
   slug: string;
   products?: Product[];
}

interface Category {
   name: string;
   slug: string;
   id: number;
   subcategories: Subcategory[];
}

export const categories: Category[] = [
   {
      name: 'موبایل',
      slug: '/mobile',
      id: 1,
      subcategories: [
         {
            name: 'گوشی موبایل',
            slug: '#',
            products: [
               { name: 'اپل', slug: '#' },
               { name: 'سامسونگ', slug: '#' },
               { name: 'شیائومی', slug: '#' },
               { name: 'نوکیا', slug: '#' },
            ],
         },
         {
            name: 'لوازم جانبی موبایل',
            slug: '#',
            products: [
               { name: 'قاب گوشی', slug: '#' },
               { name: 'شارژر', slug: '#' },
               { name: 'کابل', slug: '#' },
               { name: 'کابل و رابط', slug: '#' },
               { name: 'هولدر گوشی', slug: '#' },
            ],
         }
      ],
   },
   {
      name: 'تجهیزات ذخیره سازی',
      slug: '/hard',
      id: 2,
      subcategories: [
         {
            name: 'فلش مموری',
            slug: '#',
            products: [
               { name: 'سن دیسک', slug: '#' },
               { name: 'توشیبا', slug: '#' },
               { name: 'سامسونگ', slug: '#' },
               { name: 'اپیسر', slug: '#' },
               { name: 'کینگستون', slug: '#' },
               { name: 'اچ پی hp', slug: '#' },
            ],
         },
         {
            name: 'کارت حافظه',
            slug: '#',
            products: [
               { name: 'سن دیسک', slug: '#' },
               { name: 'توشیبا', slug: '#' },
               { name: 'سامسونگ', slug: '#' },
            ],
         },
         {
            name: 'هارد و SSD',
            slug: '#',
            products: [
               { name: 'هارد اینترنال', slug: '#' },
               { name: 'هارد اکسترنال', slug: '#' },
               { name: 'هارد SSD', slug: '#' },
            ],
         },
      ],
   },
   {
      name: 'هدفون و هندزفری',
      slug: '/headset',
      id: 3,
      subcategories: [
         {
            name: 'هندزفری',
            slug: '#',
            products: [
               { name: 'ایرپاد', slug: '#' },
               { name: 'هندزفری سامسونگ', slug: '#' },
               { name: 'هندزفری QCY', slug: '#' },
               { name: 'هندزفری سونی', slug: '#' },
               { name: 'هندزفری هایلو', slug: '#' },
               { name: 'هندزفری شیائومی', slug: '#' },
               { name: 'هندزفری انکر', slug: '#' },
               { name: 'هندزفری JBL', slug: '#' },
            ],
         },
         {
            name: 'هدفون',
            slug: '#',
            products: [
               { name: 'هدفون بیتس', slug: '#' },
               { name: 'هدفون سونی', slug: '#' },
               { name: 'هدفون اپل', slug: '#' },
               { name: 'هدفون ریزر', slug: '#' },
               { name: 'هدفون تسکو', slug: '#' },
               { name: 'هدفون انکر', slug: '#' },
               { name: 'هدفون سیمی', slug: '#' },
               { name: 'هدفون بی سیم', slug: '#' },
               { name: 'هدفون گیمینگ', slug: '#' },
            ],
         },
      ],
   },
   {
      name: 'ساعت و بند هوشمند',
      slug: '/watch',
      id: 4,
      subcategories: [
         {
            name: 'ساعت هوشمند',
            slug: '#',
            products: [
               { name: 'اپل واچ', slug: '#' },
               { name: 'ساعت هوشمند سامسونگ', slug: '#' },
               { name: 'ساعت هوشمند هواوی', slug: '#' },
               { name: 'ساعت هوشمند هایلو', slug: '#' },
               { name: 'ساعت هوشمند میبرو', slug: '#' },
            ],
         },
         {
            name: 'هدفون',
            slug: '#',
            products: [
               { name: 'هدفون بیتس', slug: '#' },
               { name: 'هدفون سونی', slug: '#' },
            ],
         },
      ],
   },
   {
      name: 'گیمینگ',
      slug: '/gaming',
      id: 5,
      subcategories: [
         {
            name: 'کنسول بازی',
            slug: '#',
            products: [
               { name: 'پلی استیشن 5', slug: '#' },
               { name: 'پلی استیشن 4', slug: '#' },
               { name: 'ایکس باکس', slug: '#' },
               { name: 'نینتندو', slug: '#' },
               { name: 'دسته بازی', slug: '#' },
               { name: 'لوازم جانبی کنسول بازی', slug: '#' },
            ],
         },
         {
            name: 'بازی',
            slug: '#',
            products: [
               { name: 'بازی پلی استیشن', slug: '#' },
               { name: 'بازی ایکس باکس', slug: '#' },
            ],
         },
      ],
   },
   {
      name: 'سایر محصولات',
      slug: '#',
      id: 6,
      subcategories: [
         {
            name: 'اسپیکر',
            slug: '#',
            products: [
               { name: 'اسپیکر جی بی ال', slug: '#' },
               { name: 'اسپیکر هارمن کاردن', slug: '#' },
               { name: 'اسپیکر سونی', slug: '#' },
               { name: 'اسپیکر شیائومی', slug: '#' },
               { name: 'اسپیکر کینگ استار', slug: '#' },
               { name: 'اسپیکر ال جی', slug: '#' },
            ],
         },
         {
            name: 'پرینتر',
            slug: '#',
            products: [
               { name: 'پرینتر HP', slug: '#' },
               { name: 'پرینتر Canon', slug: '#' },
               { name: 'پرینتر Epson', slug: '#' },
               { name: 'پرینتر Brother', slug: '#' },
            ],
         },
         {
            name: 'مانیتور',
            slug: '#',
            products: [
               { name: 'مانیتور سامسونگ', slug: '#' },
               { name: 'مانیتور ال جی', slug: '#' },
               { name: 'مانیتور جی پلاس', slug: '#' },
               { name: 'مانیتور ایسوس', slug: '#' },
            ],
         },
         {
            name: 'میکروفون',
            slug: '#',
         },
         {
            name: 'دوربین مداربسته',
            slug: '#',
         },
         {
            name: 'قطعات کامپیوتر',
            slug: '#',
         }
      ],
   },
];