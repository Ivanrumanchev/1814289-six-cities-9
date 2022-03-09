import {createSelector} from 'reselect';
import {State} from '../types/state';
import {filter} from '../utils/filter';

export const citySelector = (state: State) => state.city;
export const offersSelector = (state: State) => state.offers;
export const userDataSelector = (state: State) => state.userData;

export const offersOfCitySelector = createSelector(
  citySelector,
  offersSelector,
  (city, offers) => filter(offers)[city],
);

export const authSelector = (state: State) => state.authorizationStatus;

export const stateSelector = (state: State) => state;
