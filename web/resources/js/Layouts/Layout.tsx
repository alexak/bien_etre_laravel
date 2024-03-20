
import React from 'react';
import TopMenu from '@/Components/3_organism/TopMenu';
import BottomMenu from '@/Components/3_organism/BottomMenu';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header>
        <TopMenu />
      </header>  
      <main className="flex-grow container mx-auto px-8 px-40">
        {children}
      </main>
      <footer>
        <BottomMenu />
      </footer>
    </div>
  );
};

export default Layout;
