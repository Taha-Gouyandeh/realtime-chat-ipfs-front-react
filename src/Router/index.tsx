import React from 'react';
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import * as Screen from '../screens';
import { SiteLayout } from '../components';
import { useAppSelector } from '../redux-config/hooks';
import { selectUser } from '../redux-config/entities/user';

export const RouterPage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Auth />}>
          <Route
            path="*"
            element={
              <SiteLayout>
                <Screen.NotFound />
              </SiteLayout>
            }
          ></Route>
          <Route
            path=""
            element={
              <SiteLayout>
                <Screen.Home />
              </SiteLayout>
            }
          ></Route>
          <Route path="history">
            <Route
              path=""
              element={
                <SiteLayout>
                  <Screen.History />
                </SiteLayout>
              }
            />
            <Route
              path=":id"
              element={
                <SiteLayout>
                  <Screen.HistoryInfo />
                </SiteLayout>
              }
            />
          </Route>
        </Route>
        <Route path="/login" element={<Screen.Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  React.useEffect(() => {
    if (
      user === undefined ||
      user?.accessToken === undefined ||
      user?.accessToken == ''
    ) {
      navigate('/login', { replace: false });
    }
  });

  return <Outlet />;
};
