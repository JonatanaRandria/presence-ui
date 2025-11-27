import React from 'react';
import { Header } from '@/components/Header/Header';


type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
    
    <Header />

<div 
  className="main-layout" 
  // 👈 AJOUT D'UNE MARGE EN HAUT POUR DÉCALER LE CONTENU SOUS LE HEADER FIXE
  // (La valeur '56px' est une estimation standard de la hauteur d'un navbar Bootstrap)
  style={{ marginTop: '56px' }} 
> 
  {children}
</div>
     
    </>
  );
};
