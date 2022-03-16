import {createSelector} from 'reselect';
import {OfferDTO} from '../types/offer';
import {ReviewDTO} from '../types/review';
import {State} from '../types/state';
import {filter} from '../utils/filter';

export const citySelector = (state: State) => state.OFFERS_DATA.city;
export const offersSelector = (state: State) => state.OFFERS_DATA.offers as OfferDTO[];
export const loadingOffersSelector = (state: State) => state.OFFERS_DATA.loading;

export const offersOfCitySelector = createSelector(
  citySelector,
  offersSelector,
  (city, offers) => filter(offers)[city],
);

export const roomSelector = (state: State) => state.ROOM_DATA.room as OfferDTO;
export const loadingRoomSelector = (state: State) => state.ROOM_DATA.loading;
export const reviewsSelector = (state: State) => state.ROOM_DATA.reviews as ReviewDTO[];
export const nearbySelector = (state: State) => state.ROOM_DATA.nearby as OfferDTO[];

export const userDataSelector = (state: State) => state.USER.userData;
export const authSelector = (state: State) => state.USER.authorizationStatus;
