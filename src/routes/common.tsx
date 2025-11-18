import { EventListpage } from '@/features/event/pages/EventListPage';
import { lazily } from 'react-lazily';


const { NotFound } = lazily(() => import('@/pages/NotFound/NotFound'))

export const commonRoutes = () => [
// we should add dashboard or events list on this routes  
  { path: '/', element: <EventListpage /> },
  { path: '*', element: <NotFound /> },
];
