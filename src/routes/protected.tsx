
import { Navigate } from 'react-router-dom';
import type { User } from '@/features/auth';


export const protectedRoutes = ({ user }: { user: User | null }) => [
  {
    path: '/event',
    element: user ? (
      <Navigate to={`/event/all`} replace />
    ) : (
      <Navigate to='auth/login' replace />
    ),
  },
];
