import {createReducer} from '@reduxjs/toolkit';
import {activeCity, loadOffers, requireAuthorization, setUserData} from './action';
import {OfferDTO} from '../types/offer';
import {UserData} from '../types/user-data';
import {FilterType, AuthorizationStatus} from '../const';

type InitialState = {
  offers: OfferDTO[],
  city: FilterType,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  userData: UserData,
};

const initialState: InitialState = {
  offers: [],
  city: FilterType.Paris,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
  userData: {
    avatarUrl: '',
    email: '',
    id: 0,
    isPro: false,
    name: '',
    token: '',
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(activeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});

export {reducer};
