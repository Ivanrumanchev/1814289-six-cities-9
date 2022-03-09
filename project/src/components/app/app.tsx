import {Route, Routes} from 'react-router-dom';
import MainScreen from '../../pages/main-screen';
import LoginScreen from '../../pages/login-screen';
import PropertyScreen from '../../pages/property-screen';
import FavoritesScreen from '../../pages/favorites-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../services/browser-history';
import {OfferDTO} from '../../types/offer';
import {ReviewDTO} from '../../types/review';
import {useAppSelector} from '../../hooks/store';
import {stateSelector} from '../../store/selectors';
import {AppRoute} from '../../const';
import {isCheckedAuth} from '../../utils/common';

type AppScreenProps = {
  offers: OfferDTO[];
  reviews: ReviewDTO[];
}

function App({offers, reviews}: AppScreenProps): JSX.Element {
  const {authorizationStatus, isDataLoaded} = useAppSelector(stateSelector);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <MainScreen />
          }
        >
        </Route>
        <Route
          path={AppRoute.Login}
          element={
            <PrivateRoute
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
    </HistoryRouter>
  );
}

export default App;
