import Image from 'next/image'
import Link from 'next/link'

const categories = [
   {
      category: { title: 'موبایل', slug: '/products/phone' },
      subCategory: [
         { title: 'گوشی اپل', slug: 'products/phone/apple' },
         { title: 'گوشی سامسونگ', slug: 'products/phone/samsung' },
         { title: 'گوشی شیائومی', slug: 'products/phone/xiaomi' },
         { title: 'گوشی نوکیا', slug: '#' },
      ]
   },
   {
      category: { title: 'هندزفری', slug: 'products/headset' },
      subCategory: [
         { title: 'ایرپاد', slug: 'products/headset/airpods' },
         { title: 'هندزفری سامسونگ', slug: '#' },
         { title: 'هندزفری هایلو', slug: '#' },
         { title: 'هندزفری QCY', slug: '#' },
      ]
   },
   {
      category: { title: 'تجهیزات ذخیره سازی', slug: '#' },
      subCategory: [
         { title: 'هارد اکسترنال', slug: '#' },
         { title: 'هارد SSD', slug: '#' },
         { title: 'فلش مموری', slug: '#' },
         { title: 'کارت حافظه', slug: '#' },
      ]
   },
]

const ProductCategorySection = () => {
   return (
      <div className='lg:grid space-y-10 lg:grid-cols-5 items-center bg-gradient-to-tr from-white from-60% to-blue-400/70 to-90% border border-blue-200/70 rounded-3xl shadow-md w-fit gap-10 md:mx-auto py-10 lg:py-20 mx-4'>
         <div className='col-span-2'>
            <Image
               src="/images/mac-compare.png"
               alt="macbook"
               width={400}
               height={400}
            />
         </div>
         {categories.map((cat, index) => (
            <ul key={Math.random()} className={`
            ${index < categories.length - 1 && 'lg:border-l border-slate-400 md:pl-4'}
             px-10 md:px-auto space-y-3`}>
               <li className='font-semibold text-lg text-blue-600 pb-2'>
                  <Link href={cat.category.slug}>{cat.category.title}</Link>
               </li>
               {cat.subCategory.map((sub) => (
                  <li key={Math.random()}>
                     <Link href={sub.slug}>
                        {sub.title}
                     </Link>
                  </li>
               ))}
            </ul>
         ))}
      </div>
   )
}

export default ProductCategorySection
