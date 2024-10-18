export const config = {
  runtime: 'experimental-edge',
};

import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider } from "react-redux";

import Layout from "@/components/Layout/Layout";
import { store } from "@/store/store";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => console.log('Service Worker Registered'))
        .catch(error => console.error('Service Worker Registration Failed:', error));
    }
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
