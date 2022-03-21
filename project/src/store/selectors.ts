import {createSelector} from 'reselect';
import {filter} from '../utils/filter';
import {State} from '../types/state';

export const citySelector = (state: State) => state.OFFERS_DATA.city;
export const offersSelector = (state: State) => state.OFFERS_DATA.offers;
export const loadingOffersSelector = (state: State) => state.OFFERS_DATA.loading;

export const offersOfCitySelector = createSelector(
  citySelector,
  offersSelector,
  (city, offers) => offers !== null ? filter(offers)[city] : [],
);

export const roomSelector = (state: State) => state.ROOM_DATA.room;
export const loadingRoomSelector = (state: State) => state.ROOM_DATA.loading;
export const reviewsSelector = (state: State) => state.ROOM_DATA.reviews;
export const nearbySelector = (state: State) => state.ROOM_DATA.nearby;

export const favoritesSelector = (state: State) => state.FAVORITE_DATA.offers;
export const loadingFavoritesSelector = (state: State) => state.FAVORITE_DATA.loading;

export const userDataSelector = (state: State) => state.USER.userData;
export const authSelector = (state: State) => state.USER.authorizationStatus;
