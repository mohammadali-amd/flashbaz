interface InputFieldProps {
   label: string;
   type: string;
   value?: string | number;
   onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
   options?: { value: string; label: string }[]; // for select dropdown
   checked?: boolean; // for checkbox
   placeholder?: string;
   disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
   label,
   type,
   value,
   onChange,
   options,
   checked,
   placeholder,
   disabled,
}) => {
   return (
      <div className="mb-4">
         <label className="block text-gray-700 mb-2">{label}</label>
         {type === 'select' && options ? (
            <select
               value={value}
               onChange={onChange}
               className="w-full px-4 py-2 border rounded-lg"
               disabled={disabled}
            >
               <option value="">Select an option</option>
               {options.map((option, index) => (
                  <option key={index} value={option.value}>
                     {option.label}
                  </option>
               ))}
            </select>
         ) : type === 'checkbox' ? (
            <label className="relative inline-flex items-center cursor-pointer">
               <input
                  type="checkbox"
                  checked={checked}
                  onChange={onChange}
                  className="sr-only peer"
               />
               <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-theme-color rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-theme-color"></div>
            </label>
         ) : (
            <input
               type={type}
               value={value}
               onChange={onChange}
               placeholder={placeholder}
               className="w-full px-4 py-2 border rounded-lg"
            />
         )}
      </div>
   );
};

export default InputField;
