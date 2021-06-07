import { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useStore } from '../lib/store';

export const PrivateRoute: FC<RouteProps> = (props) => {
  const userId = useStore((state) => state.userId);
  return userId ? <Route {...props} /> : <Redirect to="/login" />;
};
