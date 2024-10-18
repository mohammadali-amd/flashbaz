import Image from "next/image"
import Link from "next/link"

const Logo = () => {
   return (
      <Link href='/' className="flex items-center gap-3 min-w-fit">
         {/* <i className="lni lni-image rounded-full border border-stone-400 text-4xl lg:text-6xl overflow-hidden text-stone-700"></i> */}
         {/* <i className="lni lni-bolt text-4xl text-stone-700"></i> */}
         <Image src={'/icons/icon-192x192.png'} alt="Logo" width={50} height={50} className="h-10 w-10 md:h-12
md:w-12" />
         <p className='hidden md:block text-lg md:text-2xl'>فلش باز</p>
      </Link>
   )
}

export default Logo
