import { NavLink, useLocation, matchPath, useNavigate } from 'react-router-dom';
import { NavItem } from '../NavItem/NavItem';
import { useAuth } from '@/features/auth';
import { APP_TITLE } from '@/config';
import logo from '@/assets/logo.jpeg';
import React, { useState } from 'react';
import { CloseEventConfirmationModal } from '@/features/attendance/components/CloseEventConfirmationModal';
import { useCloseAttendance } from '@/features/attendance/hooks/useCloseAttendance';
import { useGetEventByIdQuery } from '@/features/event/api/eventApi'; 
import { AttendanceCodeDisplayModal } from '@/features/attendance/components/AttendanceCodeDisplayModal'; // Ajouté pour afficher le code

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
  const navigate = useNavigate();
  
  // Close Modal States
  const [showCloseModal, setShowCloseModal] = useState(false); 
  const [closeError, setCloseError] = useState<string | null>(null);
    
  // Code Modal State
  const [showCodeModal, setShowCodeModal] = useState(false); // 🚀 NOUVEL ÉTAT POUR LA MODAL DE CODE

  const { closeAttendance, isClosing, closingError } = useCloseAttendance();
  
  const attendanceMatch = matchPath(
    { path: '/event/:id/attendance' }, 
    location.pathname
  );
  
  const eventId = attendanceMatch?.params.id; 
  
  const { 
      data: eventDetails, 
      isLoading: isEventLoading,
      isError: isEventError
  } = useGetEventByIdQuery(eventId!, {
      skip: !eventId || !attendanceMatch,
  });

  const eventName = eventDetails?.title ?? (isEventLoading ? "Loading..." : "Unknown Event"); 
  const eventStatus = eventDetails?.event_status; // Assumer que le statut est ici (ex: 'IN_PROGRESS')
  const eventCode = eventDetails?.event_code; // 🚀 Assumer que le code est retourné ici (PIN)

  const handleCloseEvent = async () => {
    if (!eventId) return;

    setCloseError(null); 

    try {
      await closeAttendance(eventId);
      
      setShowCloseModal(false);
      navigate('/event'); 
      
    } catch (error) {
      setCloseError(closingError || "Failed to close event due to an unknown error.");
    }
  };
  
  const isButtonDisabled = isClosing || isEventLoading || isEventError;
  
  let dynamicButtons = <NavItem text='+ Add Event' to='/event/add' className='btn btn-outline-primary rounded-pill me-2' />;

  // 🛑 Logique pour la page de présence
  if (attendanceMatch) {
    const isAttendanceInProgress = eventStatus === 'IN_PROGRESS';
    
    // Si la présence est en cours, afficher le bouton "Show Code"
    const showCodeButton = isAttendanceInProgress && eventCode;
    
    dynamicButtons = (
        <>
            {/* 🚀 BOUTON SHOW CODE */}
            {showCodeButton && (
                 <NavItem 
                    type='button' 
                    text='Show Code' 
                    onClick={() => setShowCodeModal(true)} 
                    className='btn btn-outline-info rounded-pill me-2' // Utilisez une couleur informative
                    disabled={isButtonDisabled} 
                 />
            )}

            {/* BOUTON CLOSE EVENT */}
            <NavItem 
                type='button' 
                text={isEventLoading ? 'Loading...' : (isClosing ? 'Closing...' : 'Close Event')} 
                onClick={() => setShowCloseModal(true)} 
                className='btn btn-danger rounded-pill me-2' 
                disabled={isButtonDisabled} 
            />
        </>
    );
  }
  
  return (
    <>
      {/* Affichage du bouton dynamique (Add Event ou Close Event/Show Code) */}
      {dynamicButtons}
      
      {/* Bouton Logout */}
      <NavItem type='button' text='Logout' onClick={logout} />
      
      {/* Modal de confirmation de fermeture */}
      {attendanceMatch && (
        <CloseEventConfirmationModal
          show={showCloseModal}
          eventName={eventName}
          apiError={closeError}
          isProcessing={isClosing}
          onClose={() => setShowCloseModal(false)}
          onConfirm={handleCloseEvent}
        />
      )}
      
      {/* 🚀 Modal d'affichage du Code */}
      {attendanceMatch && eventCode && (
          <AttendanceCodeDisplayModal
              show={showCodeModal}
              eventId={eventId!}
              eventCode={eventCode}
              onClose={() => setShowCodeModal(false)}
              // Pas de redirection ici, car l'utilisateur reste sur la page de gestion
          />
      )}
    </>
  );
}