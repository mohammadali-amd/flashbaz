import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Search = () => {
   const [query, setQuery] = useState('');
   const router = useRouter();

   const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      router.push(`/products?keyword=${query}`);
   };

   return (
      <form onSubmit={handleSearch} className="relative">
         <input
            type="text"
            className='bg-stone-200 rounded-lg p-4 pr-14 w-[40rem]'
            placeholder='جستجو'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
         />
         <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
            <i className="lni lni-search-alt text-3xl text-stone-500"></i>
         </div>
      </form>
   );
};

export default Search;
