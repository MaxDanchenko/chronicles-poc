import Cards from '../pages/Cards/Cards.tsx';
import Main from '../pages/Main/Main.tsx';
import HortScene from '../pages/HortScene/HortScene.tsx';

export enum AppRoutes {
  MAIN = 'main',
  CARDS = 'cards',
  HORT = 'hort',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.CARDS]: '/cards',
  [AppRoutes.HORT]: '/hort',
};

export const routeConfig = [
  {
    path: RoutePath[AppRoutes.MAIN],
    element: <Main />,
  },
  {
    path: RoutePath[AppRoutes.CARDS],
    element: <Cards />,
  },
  {
    path: RoutePath[AppRoutes.HORT],
    element: <HortScene />,
  },
];
