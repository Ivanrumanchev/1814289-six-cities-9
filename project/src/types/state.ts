import {SerializedError} from '@reduxjs/toolkit';
import {store} from '../store/store.js';
import {UserData} from './user-data.js';
import {OfferDTO} from './offer.js';
import {ReviewDTO} from './review.js';
import {AuthorizationStatus, FilterType} from '../const';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
  userData: UserData,
};

export type OffersData = {
  loading: string,
  offers: OfferDTO[] | null | unknown,
  currentRequestId: undefined | string,
  error: null | SerializedError,
  city: FilterType,
}

export type RoomData = {
  loading: string,
  room: OfferDTO | null | unknown,
  reviews: ReviewDTO[] | null | unknown,
  nearby: OfferDTO[] | null | unknown,
  currentRequestId: undefined | string,
  error: null | SerializedError,
}
