import { NavLink, useLocation } from 'react-router-dom';
import { NavItem } from '../NavItem/NavItem';
import { useAuth } from '@/features/auth';
import { APP_TITLE } from '@/config';
import logo from '@/assets/logo.jpeg';

export function Header() {
  const { user } = useAuth();

  return (
    <nav  className="navbar navbar-expand navbar-scroll bg-body-tertiary"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1000
    }}>
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
  
  return (
    <>
      <NavItem text='+ Add Event' to='/event/add' className='btn btn-outline-primary rounded-pill me-2' />
      
      
      <NavItem type='button' text='Logout' onClick={logout} />
    </>
  );
}
