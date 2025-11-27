import { EventListPage } from '@/features/event/pages/EventListPage';
import { lazily } from 'react-lazily';
import { Navigate } from 'react-router-dom';


const { NotFound } = lazily(() => import('@/pages/NotFound/NotFound'))

export const commonRoutes = () => [
// we should add dashboard or events list on this routes  
{ path: '/', element: <Navigate to="/event" replace /> },
  { path: '*', element: <NotFound /> },
];
