import Link from "next/link"

const Logo = () => {
   return (
      <Link href='/' className="flex items-center gap-3 min-w-fit">
         <i className="lni lni-image rounded-full border border-stone-400 text-4xl lg:text-6xl overflow-hidden text-stone-700"></i>
         <p className='text-2xl'>نام برند</p>
      </Link>
   )
}

export default Logo
