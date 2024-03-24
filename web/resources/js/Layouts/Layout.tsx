
import React from 'react';
import TopMenu from '@/Components/3_cell/TopMenu';
import BottomMenu from '@/Components/3_cell/BottomMenu';

const Layout = ({ children }) => {

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header>
        <TopMenu />
      </header>
      <main className="container mx-auto p-0">
        {children}
      </main>
      <footer>
        <BottomMenu />
      </footer>
    </div>
    );
  };
  
  export default Layout;
  
