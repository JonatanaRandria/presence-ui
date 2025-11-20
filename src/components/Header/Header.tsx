import { NavLink, useLocation, matchPath } from 'react-router-dom';
import { NavItem } from '../NavItem/NavItem';
import { useAuth } from '@/features/auth';
import { APP_TITLE } from '@/config';
import logo from '@/assets/logo.jpeg';
import React, { useState } from 'react';
import { CloseEventConfirmationModal } from '@/features/attendance/components/CloseEventConfirmationModal';

export function Header() {
  const { user } = useAuth();

  return (
    <nav 
      className="navbar navbar-expand navbar-scroll bg-body-tertiary"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000
      }}
    >
      <div className='container'>
        <NavLink to='/' className='navbar-brand'>
          {APP_TITLE}
          <img className='align-top' src={logo} alt={APP_TITLE} style={{ height: '30px' }} />
        </NavLink>

        <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>{user ? <UserLinks /> : <GuestLinks />}</ul>
      </div>
    </nav>
  );
}

function GuestLinks() {
  const location = useLocation();
  const generateLink = (path: string) =>
    `${path}${
      location.pathname !== '/login' && location.pathname !== '/register'
        ? `?redirect=${location.pathname}`
        : location.search
    }`;

  return (
    <>
      <NavItem text='Login' to={generateLink('/login')} />
    </>
  );
}

function UserLinks() {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const [showCloseModal, setShowCloseModal] = useState(false); 
  
  const attendanceMatch = matchPath(
    { path: '/event/:id/attendance' }, 
    location.pathname
  );
  
  // NOTE: Dans une application réelle, vous devriez utiliser un hook 
  // (ex: useEventDetails(eventId)) pour récupérer le nom réel de l'événement.
  const eventName = "Tech Summit 2025"; // ⚠️ Remplacer par la logique de récupération du nom de l'événement
  const eventId = attendanceMatch?.params.id; 

  const handleCloseEvent = () => {
    // 1. Appel API pour fermer l'événement (TODO)
    console.log(`Closing event ID: ${eventId} (${eventName})`);
    
    // 2. Redirection ou mise à jour de l'état (exemple: redirection vers la liste des événements)
    // navigate('/event'); 
    
    setShowCloseModal(false);
  };
  
  let dynamicButton;
  
  if (attendanceMatch) {
    // Si nous sommes sur la page /event/:id/attendance
    dynamicButton = (
      <NavItem 
        type='button' 
        text='Close Event' 
        onClick={() => setShowCloseModal(true)} 
        className='btn btn-danger rounded-pill me-2' 
      />
    );
  } else {
    // Sinon, afficher le bouton par défaut
    dynamicButton = (
      <NavItem text='+ Add Event' to='/event/add' className='btn btn-outline-primary rounded-pill me-2' />
    );
  }
  
  return (
    <>
      {dynamicButton}
      <NavItem type='button' text='Logout' onClick={logout} />
      
      {/* Rendu conditionnel de la modal sur la page de présence */}
      {attendanceMatch && (
        <CloseEventConfirmationModal
          show={showCloseModal}
          eventName={eventName}
          onClose={() => setShowCloseModal(false)}
          onConfirm={handleCloseEvent}
        />
      )}
    </>
  );
}