
import React from 'react';
import TopMenu from '@/Components/3_cell/TopMenu';
import BottomMenu from '@/Components/3_cell/BottomMenu';
import { Head } from '@inertiajs/react';

const Layout = ({ children }) => {

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      
      <div className="flex flex-col min-h-screen bg-slate-50">
        <header>
          <TopMenu />
        </header>
        <main className="container p-0 mx-auto">
          {children}
        </main>
        <footer>
          <BottomMenu />
        </footer>
      </div>
    </>

    );
  };
  
  export default Layout;
  
