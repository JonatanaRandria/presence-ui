
import { Navigate, Outlet } from 'react-router-dom';
import type { User } from '@/features/auth';
import { EventListpage } from '@/features/event/pages/EventListPage';


export const protectedRoutes = ({ user }: { user: User | null }) => [
  { path: '/event', element: user ? (
      <EventListpage/> ) : (
      <Navigate to='/login' replace />
    ),
  },
];
