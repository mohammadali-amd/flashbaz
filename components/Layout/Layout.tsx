export const config = {
   runtime: 'experimental-edge',
};

import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import InstallPromptModal from '../InstallPromptModal';
import { Vazirmatn } from "next/font/google";
import { useRouter } from 'next/router';
// NProgress.configure({ showSpinner: false, speed: 400 });

const vazir = Vazirmatn({ subsets: ["arabic"] });

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
   const router = useRouter();
   const [showModal, setShowModal] = useState(false);
   const [deferredPrompt, setDeferredPrompt] = useState<any | null>(null);
   const [progress, setProgress] = useState(100);

   useEffect(() => {
      const handleBeforeInstallPrompt = (event: any) => {
         event.preventDefault();
         setDeferredPrompt(event);
         setShowModal(true);
         setProgress(100);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      return () => {
         window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      };
   }, []);

   useEffect(() => {
      if (showModal) {
         const interval = setInterval(() => {
            setProgress((prevProgress) => {
               if (prevProgress <= 0) {
                  setShowModal(false); // Hide modal when progress reaches 0
                  clearInterval(interval);
                  return 0;
               }
               return prevProgress - 0.75; // Decrease progress by 1.25% every 100ms (~8 seconds total)
            });
         }, 100);

         return () => clearInterval(interval); // Clean up interval on unmount
      }
   }, [showModal]);

   useEffect(() => {
      const handleStart = () => {
         NProgress.start(); // Start loading bar
      };
      const handleStop = () => {
         NProgress.done(); // Finish loading bar
      };

      router.events.on('routeChangeStart', handleStart);
      router.events.on('routeChangeComplete', handleStop);
      router.events.on('routeChangeError', handleStop);

      return () => {
         router.events.off('routeChangeStart', handleStart);
         router.events.off('routeChangeComplete', handleStop);
         router.events.off('routeChangeError', handleStop);
      };
   }, [router]);

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
                  progress={progress}
               />
            )}
         </div>
      </div>
   )
}

export default Layout
