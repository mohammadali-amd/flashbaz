import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head'
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Header/Header'
import InstallPromptModal from './InstallPromptModal';
import { Vazirmatn } from "next/font/google";

const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

const vazir = Vazirmatn({ subsets: ["arabic"] });

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
   const [showModal, setShowModal] = useState(false);
   const [deferredPrompt, setDeferredPrompt] = useState<any | null>(null);

   useEffect(() => {
      const handleBeforeInstallPrompt = (event: any) => {
         event.preventDefault();
         setDeferredPrompt(event);
         setShowModal(true);
      };

      setTimeout(() => setShowModal(false), 8000);

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      return () => {
         window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
   }, []);

   const handleInstall = useCallback(() => {
      if (deferredPrompt) {
         deferredPrompt.prompt();
         deferredPrompt.userChoice.then(() => {
            setShowModal(false);
            setDeferredPrompt(null);
         });
      }
   }, [deferredPrompt]);

   const handleLater = useCallback(() => {
      setShowModal(false);
      setDeferredPrompt(null);
   }, []);

   return (
      <div>
         <Head>
            <title>Flashbaz</title>
         </Head>
         <div className={vazir.className}>
            <Header />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
            {showModal && (
               <InstallPromptModal
                  onInstall={handleInstall}
                  onLater={handleLater}
               />
            )}
         </div>
      </div>
   )
}

export default Layout
