import { FC, useEffect } from 'react';
import { Route, redirect, RouteProps } from 'react-router-dom';
import { useStore } from '../lib/store';

export const PrivateRoute: FC<RouteProps> = (props) => {
  const userId = useStore((state) => state.userId);
  useEffect(() => {
    if (!userId) {
      redirect('/login');
    }

    return () => {};
  }, [userId]);

  return <Route {...props} />;
};
