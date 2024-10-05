const ErrorMessage: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
   return (
      <div className="flex justify-center text-red-700 bg-red-400/75 rounded-md border border-red-700 p-4 m-4">
         {children}
      </div>
   )
}

export default ErrorMessage
