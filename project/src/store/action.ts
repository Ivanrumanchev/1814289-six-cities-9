import {createAction} from '@reduxjs/toolkit';
import {OfferDTO} from '../types/offer';
import {UserData} from '../types/user-data';
import {AppRoute, AuthorizationStatus, FilterType} from '../const';

export enum Actions {
  ActiveCity = 'main/activeCity',
  LoadOffers = 'data/loadOffers',
  RequireAuthorization = 'user/requireAuthorization',
  SetError = 'global/setError',
  RedirectToRoute = 'global/redirectToRoute',
  SetUserData = 'global/user',
}

export const activeCity = createAction<FilterType>(Actions.ActiveCity);

export const loadOffers = createAction<OfferDTO[]>(Actions.LoadOffers);

export const requireAuthorization = createAction<AuthorizationStatus>(Actions.RequireAuthorization);

export const setError = createAction<string>(Actions.SetError);

export const redirectToRoute = createAction<AppRoute>(Actions.RedirectToRoute);

export const setUserData = createAction<UserData>(Actions.SetUserData);
