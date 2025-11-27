import { AppRoutes } from '@/routes';
import { MainLayout } from './layouts/MainLayout';
import './index.css';

export function App() {
  return (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  );
}
