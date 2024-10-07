import Image from 'next/image'
import Link from 'next/link'
import CarouselLayout from '../CarouselLayout'
import { SwiperSlide } from 'swiper/react'

const posts = [
   {
      title: 'بازگردانی اطلاعات هارد',
      description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است...',
      date: '۱۲ شهریور ۱۴۰۲',
      link: '#',
      image: { src: '/images/hard-drives.webp', alt: 'hard-drives' },
      badge: ['مقاله', 'ترفند']
   },
   {
      title: 'بهترین فلش مموری های بازار',
      description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است...',
      date: '۱۲ اسفند ۱۴۰۲',
      link: '#',
      image: { src: '/images/usb-sandisk.webp', alt: 'usb-sandisk' },
      badge: ['مقاله', 'آموزش']
   },
   {
      title: 'بازگردانی اطلاعات هارد',
      description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است...',
      date: '۱۲ مهر ۱۴۰۲',
      link: '#',
      image: { src: '/images/hard-drives.webp', alt: 'hard-drives' },
      badge: ['مقاله', 'ترفند']
   },
   {
      title: 'بهترین فلش مموری های بازار',
      description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است...',
      date: '۱۲ آبان ۱۴۰۲',
      link: '#',
      image: { src: '/images/usb-sandisk.webp', alt: 'usb-sandisk' },
      badge: ['مقاله', 'آموزش']
   },
   {
      title: 'بازگردانی اطلاعات هارد',
      description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است...',
      date: '۱۲ تیر ۱۴۰۲',
      link: '#',
      image: { src: '/images/hard-drives.webp', alt: 'hard-drives' },
      badge: ['مقاله', 'ترفند']
   },
   {
      title: 'بهترین فلش مموری های بازار',
      description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است...',
      date: '۱۲ بهمن ۱۴۰۲',
      link: '#',
      image: { src: '/images/usb-sandisk.webp', alt: 'usb-sandisk' },
      badge: ['مقاله', 'آموزش']
   },
]

const BlogPosts = () => {
   return (
      <div className='my-28 md:mx-20'>
         <div className="md:flex mx-8 justify-between items-center space-y-4 md:space-y-0 text-xl md:text-3xl">
            <h3 className='font-bold md:font-semibold'>آخرین مقالات</h3>
            <Link href={'/products'} className='flex items-center gap-3 w-fit'>
               مشاهده همه
               <i className="lni lni-arrow-left"></i>
            </Link>
         </div>

         <div>
            <CarouselLayout mobileSlidesPerView={1} tabletSlidesPerView={2} laptopSlidesPerView={3} desktopSlidesPerView={3} spaceBetween={50} pagination={true}>
               {posts.map((post) => (
                  <SwiperSlide key={post.title + post.date}>
                     <Link href={post.link}>
                        <div className='border border-slate-200 rounded-3xl cursor-pointer shadow-lg duration-200 hover:shadow-xl shadow-gray-300 hover:shadow-gray-400 hover:bg-theme-color hover:text-white'>
                           <div className='flex justify-center bg-theme-color/90 rounded-t-3xl relative border-b border-white md:py-8'>
                              <div className="absolute top-6 right-8">
                                 <div className="flex gap-2">
                                    {post.badge.map(item => (
                                       <p key={item} className='rounded-lg px-3 py-1 text-sm font-light shadow bg-white/40 text-white'>{item}</p>
                                    ))}
                                 </div>
                              </div>
                              <Image src={post.image.src} alt={post.image.alt} width={300} height={300} priority quality={60} />
                           </div>
                           <div className='space-y-4 md:space-y-8 px-10 py-4 md:py-8'>
                              <h4 className='text-3xl font-semibold'>
                                 {post.title}
                              </h4>
                              <p className='font-light text-lg opacity-90'>
                                 {post.description}
                              </p>
                              <div className='flex justify-between'>
                                 <div className='flex gap-2 items-center text-lg'>
                                    <i className="lni lni-calendar"></i>
                                    <span>{post.date}</span>
                                 </div>
                                 <i className="lni lni-arrow-left text-3xl"></i>
                              </div>
                           </div>
                        </div>
                     </Link>
                  </SwiperSlide>
               ))}
            </CarouselLayout>
         </div>

      </div>
   )
}

export default BlogPosts
