import React from 'react'

const LoginPage = () => {
   return (
      <div className='flex justify-center my-20'>
         <form action="">
            <div className='space-y-6 border border-stone-200 shadow-lg  shadow-gray-300 rounded-xl py-8 px-10'>
               <div className="flex justify-between items-center gap-10">
                  <h4 className='text-xl'>نام کاربری</h4>
                  <input className='text-center border border-stone-300 rounded-md py-2' type="text" name="email" id="email" />
               </div>
               <div className="flex justify-between items-center gap-10">
                  <h4 className='text-xl'>رمز عبور</h4>
                  <input className='text-center border border-stone-300 rounded-md py-2' type="password" name="password" id="password" />
               </div>
               <div className="flex justify-between items-center gap-10">
                  <h4 className='text-xl'>کد امنیتی</h4>
                  <input className='text-center border border-stone-300 rounded-md py-2' type="text" name="code" id="code" />
               </div>

               <button type='submit' className='flex justify-center bg-emerald-600 w-full text-xl p-4 rounded-md text-white'>
                  ورود
               </button>

               <h5>
                  ثبت نام
               </h5>
            </div>
         </form>
      </div>
   )
}

export default LoginPage
