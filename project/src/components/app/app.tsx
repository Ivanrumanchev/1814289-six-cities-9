import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainScreen from '../../pages/main-screen';
import LoginScreen from '../../pages/login-screen';
import PropertyScreen from '../../pages/property-screen';
import FavoritesScreen from '../../pages/favorites-screen';
import NotFoundScreen from '../../pages/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const';

type AppScreenProps = {
  placesCount: number;
}

const authorization = AuthorizationStatus.NoAuth;

function App(AppScreenProps: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainScreen placesCount={AppScreenProps.placesCount} />}
        />
        <Route
          path={AppRoute.Login}
          element={
            <PrivateRoute
              authorizationStatus={authorization}
              targetRoute={AppRoute.Root}
            >
              <LoginScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={authorization}
              targetRoute={AppRoute.Login}
            >
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Property}
          element={<PropertyScreen />}
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
