import { MoonLoader } from 'react-spinners';

const Loader = ({ ...props }) => {
   return (
      <div className='flex justify-center'>
         <MoonLoader color="#FF510C" {...props} />
      </div>
   )
}

export default Loader;