interface InstallPromptModalProps {
   onInstall: () => void;
   onLater: () => void;
}

const InstallPromptModal: React.FC<InstallPromptModalProps> = ({ onInstall, onLater }) => {
   return (
      <div className="fixed bottom-0 right-0 w-full md:w-fit shadow-xl md:bottom-5 md:right-10 flex z-30 items-end">
         <div className="flex md:grid items-center justify-between w-full bg-white py-3 md:py-6 px-6 md:rounded-lg shadow-xl border">
            <h2 className="text-lg font-semibold">نصب برنامه فلش باز</h2>
            <p className="my-2 hidden md:block">مایل به نصب اپلیکیشن در دستگاه خود هستید؟</p>
            <div className="flex gap-8 justify-end">
               <button className="text-gray-500" onClick={onLater}>
                  بعدا
               </button>
               <button className="bg-theme-color text-white px-4 py-1 md:py-2 rounded" onClick={onInstall}>
                  نصب
               </button>
            </div>
         </div>
      </div>
   );
};

export default InstallPromptModal;
