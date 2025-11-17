
import { Navigate, Outlet } from 'react-router-dom';
import type { User } from '@/features/auth';


export const protectedRoutes = ({ user }: { user: User | null }) => [
  { path: '/event', element: user ? (
      <Outlet/> ) : (
      <Navigate to='/login' replace />
    ),
  },
];
