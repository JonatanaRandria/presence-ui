import { lazily } from 'react-lazily';
import { Navigate } from 'react-router-dom';
import type { User } from '@/features/auth';

const { Login } = lazily(() => import('@/pages/Login/Login'));


export const publicRoutes = ({ user }: { user: User | null }) => [
  { path: '/login', element: !user ? <Login /> : <Navigate to='/event' replace /> },
];
