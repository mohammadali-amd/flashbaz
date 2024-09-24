import { useState } from 'react';
import ReactSlider from 'react-slider';

interface FilterProps {
   selectedBrand: string;
   setSelectedBrand: React.Dispatch<React.SetStateAction<string>>;
   selectedRating: number;
   setSelectedRating: React.Dispatch<React.SetStateAction<number>>;
   priceRange: [number, number];
   setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>;
   clearFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({
   selectedBrand,
   setSelectedBrand,
   selectedRating,
   setSelectedRating,
   priceRange,
   setPriceRange,
   clearFilters
}) => {

   const brands = ["Apple", "Samsung", "Xiaomi", "Sony", "Cannon"];
   const [hoveredRating, setHoveredRating] = useState(0);

   const renderStars = (rating: number) => {
      return Array.from({ length: 5 }, (_, index) => {
         const starRating = index + 1;
         const isFilled = starRating <= (hoveredRating || rating);

         return (
            <span
               key={index}
               onMouseEnter={() => setHoveredRating(starRating)}
               onMouseLeave={() => setHoveredRating(0)}
               onClick={() => setSelectedRating(starRating)}
               className='cursor-pointer'
            >
               {isFilled ? '🧡' : '🤍'}
            </span>
         );
      });
   };

   const handleSliderChange = (values: [number, number]) => {
      setPriceRange(values);
   };

   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const newPriceRange = [...priceRange];
      newPriceRange[index] = Number(e.target.value);
      setPriceRange(newPriceRange as [number, number]);
   };

   return (
      <div className="p-6 border border-stone-300 rounded-xl space-y-8">
         <h4 className="text-xl font-medium">فیلترها</h4>

         {/* Brand Filter */}
         <div>
            <label className="block mb-2 font-medium">برند</label>
            <select
               className="w-full p-2 border rounded-lg"
               value={selectedBrand}
               onChange={(e) => setSelectedBrand(e.target.value)}
            >
               <option value="">همه برندها</option>
               {brands.map((brand) => (
                  <option key={brand} value={brand}>
                     {brand}
                  </option>
               ))}
            </select>
         </div>

         {/* Rating Filter */}
         <div>
            <label className="block mb-2 font-medium">امتیاز</label>
            <div className="flex gap-1">
               {renderStars(selectedRating)}
            </div>
         </div>

         {/* Price Range Filter */}
         <div>
            <label className="block mb-2 font-medium">محدوده قیمت</label>
            <div className="space-y-2">
               <div className='flex items-center gap-2'>
                  <label>از: </label>
                  <div className="relative w-full">
                     <input
                        type="number"
                        className="p-2 border rounded-lg w-full"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                     />
                     <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-600/70">
                        تومان
                     </span>
                  </div>
               </div>
               <div className='flex items-center gap-2'>
                  <label>تا: </label>
                  <div className="relative w-full">
                     <input
                        type="number"
                        className="p-2 border rounded-lg w-full"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, 1)}
                     />
                     <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-600/70">
                        تومان
                     </span>
                  </div>
               </div>
            </div>
            <div className="space-y-4 pt-8" dir='rtl'>
               <ReactSlider
                  className="horizontal-slider"
                  thumbClassName="thumb"
                  trackClassName="track"
                  min={0}
                  max={100000000}
                  value={priceRange}
                  onChange={handleSliderChange}
               // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
               />
               <div className="flex justify-between text-sm text-gray-600">
                  <p>گرانترین</p>
                  <p>ارزانترین</p>
               </div>
            </div>
         </div>

         <button
            className="w-full bg-theme-color text-white p-3 rounded-lg hover:bg-theme-color/95 duration-200"
            onClick={clearFilters} // Call the applyFilters function
         >
            پاک کردن فیلترها
         </button>
      </div>
   );
};

export default Filter;
