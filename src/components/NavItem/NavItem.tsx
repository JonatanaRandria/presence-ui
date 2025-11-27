import { NavLink } from 'react-router-dom';
import React from 'react';

// Fusionne les attributs pour <a> et <button> pour supporter les deux types
export type NavItemProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & 
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        children?: React.ReactNode;
        type?: 'link' | 'button';
        text?: string;
        to?: string;
    };

export const NavItem = (props: NavItemProps) => {
  const { 
    children, 
    type = 'link', 
    text, 
    to, 
    className, // Extraire className pour l'appliquer à l'élément
    onClick,   // Extraire onClick pour l'appliquer à l'élément
    disabled,  // Extraire disabled pour l'appliquer à l'élément
    ...restProps 
  } = props;

  const content = children ?? text;
  
  // Gérer explicitement les props pour les liens vs. les boutons
  if (type === 'link') {
    // Rendu comme NavLink (lien)
    return (
      <li className='nav-item'>
        <NavLink 
          to={to ?? '#'} 
          className={className ?? 'nav-link'} 
          onClick={onClick}
          // Les autres props Anchor (target, rel, etc.) sont dans restProps
          {...restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>} 
        >
          {content}
        </NavLink>
      </li>
    );
  }

  // Rendu comme un bouton
  return (
    <li className='nav-item'>
      <button 
        type="button" // Important pour les boutons dans les formulaires
        className={className ?? 'nav-link'} 
        onClick={onClick}
        disabled={disabled}
        // Les autres props Button (name, value, etc.) sont dans restProps
        {...restProps as React.ButtonHTMLAttributes<HTMLButtonElement>}
      >
        {content}
      </button>
    </li>
  );
};