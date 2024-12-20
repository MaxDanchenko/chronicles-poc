import { Suspense } from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';
import { routeConfig } from './routeConfig.tsx';
import Loader from '../components/common/Loader.tsx';

const renderWithWrapper = ({ element, path }: RouteProps) => {
  const component = (
    <Suspense fallback={<Loader />}>{element}</Suspense>
  );

  return <Route path={path} key={path} element={component} />;
};

const AppRouter = () => {
  return (
    <Suspense fallback={<div>loading ...</div>}>
      <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    </Suspense>
  );
};

export default AppRouter;
