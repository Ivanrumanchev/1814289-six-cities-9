import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from './store';
import {loadOffers, redirectToRoute, requireAuthorization, setUserData} from './action';
import {errorHandle} from '../services/error-handle';
import {saveToken, dropToken} from '../services/token';
import {OfferDTO} from '../types/offer';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';

enum ApiActions {
  FetchOffers = 'data/fetchOffers',
  CheckAuth = 'user/checkAuth',
  Login = 'user/login',
  Logout = 'user/logout',
  ClearError = 'global/clearError',
}

export const fetchOffersAction = createAsyncThunk(
  ApiActions.FetchOffers,
  async () => {
    try {
      const {data} = await api.get<OfferDTO[]>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  ApiActions.CheckAuth,
  async () => {
    try {
      const {data} = await api.get(APIRoute.Login);
      store.dispatch(setUserData(data));
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch(error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  ApiActions.Login,
  async ({email, password}: AuthData) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(setUserData(data));
      store.dispatch(redirectToRoute(AppRoute.Root));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  ApiActions.Logout,
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch (error) {
      errorHandle(error);
    }
  },
);
