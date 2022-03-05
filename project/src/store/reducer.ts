import {createReducer} from '@reduxjs/toolkit';
import {auth, noAuth, activeCity} from './action';
import {FilterType} from '../const';
import {offers} from '../mocks/offers';
import {filter} from '../utils/filter';
import {AuthorizationStatus} from '../const';

const filteredOffers = filter(offers);

const initialState = {
  offers: offers,
  city: FilterType.Paris,
  filteredOffers: filteredOffers[FilterType.Paris],
  auth: AuthorizationStatus.NoAuth,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(activeCity, (state, action) => {
      state.city = action.payload;
      state.filteredOffers = filteredOffers[action.payload];
    })
    .addCase(auth, (state) => {
      state.auth = AuthorizationStatus.Auth;
    })
    .addCase(noAuth, (state) => {
      state.auth = AuthorizationStatus.NoAuth;
    });
});

export {reducer};
