import React from 'react'
import Head from 'next/head'

import Header from './Header'
import Footer from './Footer'

import { Vazirmatn } from "next/font/google";

const vazir = Vazirmatn({ subsets: ["arabic"] });

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
   return (
      <div>
         <Head>
            <title>Flashbaz</title>
         </Head>
         <div className={vazir.className}>
            <Header />
            <main>{children}</main>
            <Footer />
         </div>
      </div>
   )
}

export default Layout
