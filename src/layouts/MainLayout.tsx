import React from 'react';
import { Header } from '@/components/Header/Header';


type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
    
      <Header />

      <div className="main-layout"> {children}</div>
     
    </>
  );
};
