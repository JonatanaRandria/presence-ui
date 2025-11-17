import { lazily } from 'react-lazily';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth';
import { EventListpage } from '../pages/EventListPage';


const { NotFound } = lazily(() => import('@/pages/NotFound/NotFound'));

export const PostRoutes = () => {


  return (
    <Routes>
      <Route path='' element={<EventListpage />} />
    </Routes>
  );
};
