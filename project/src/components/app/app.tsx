import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MainScreen from '../../pages/main-screen';
import LoginScreen from '../../pages/login-screen';
import PropertyScreen from '../../pages/property-screen';
import FavoritesScreen from '../../pages/favorites-screen';
import NotFoundScreen from '../../pages/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import {AppRoute, AuthorizationStatus} from '../../const';
import {OfferDTO} from '../../types/offer';
import {ReviewDTO} from '../../types/review';

type AppScreenProps = {
  offers: OfferDTO[];
  reviews: ReviewDTO[];
}

const authorization = AuthorizationStatus.Auth;
export const AuthContext = React.createContext(AuthorizationStatus.NoAuth);


function App({offers, reviews}: AppScreenProps): JSX.Element {
  return (
    <AuthContext.Provider value={authorization}>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={
              <MainScreen
                offers={offers}
              />
            }
          >
          </Route>
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
                <FavoritesScreen offers={offers} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.PropertyId}
            element={
              <PropertyScreen
                offers={offers}
                reviews={reviews}
              />
            }
          />
          <Route
            path="*"
            element={<NotFoundScreen />}
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
