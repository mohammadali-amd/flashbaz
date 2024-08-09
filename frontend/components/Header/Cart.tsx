import Link from 'next/link';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { PersianNumber } from '@/utils/PersianNumber';

const Cart = () => {
   const cartItems = useSelector((state: RootState) => state.cart.items);

   const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

   return (
      <div className='relative'>
         <Link href={'/cart'}>
            <i className="lni lni-cart border border-black rounded-lg py-1 px-2 text-2xl"></i>
            <span className='absolute bottom-1 right-1 bg-red-600 rounded-full text-white px-1 text-xs'>
               {PersianNumber(totalQuantity.toString())}
            </span>
         </Link>
      </div>
   )
}

export default Cart
