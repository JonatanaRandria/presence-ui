import { lazily } from 'react-lazily';
import { Navigate } from 'react-router-dom';
import type { User } from '@/features/auth';
import type { RouteObject } from 'react-router-dom';

const { Login } = lazily(() => import('@/pages/Login/Login'));

export const publicRoutes = ({ user }: { user: User | null }): RouteObject[] => [
  { 
    path: '/login', 
    element: !user ? <Login /> : <Navigate to='/event' replace /> 
  },
  // If you have other public routes (like registration or password reset), add them here
];