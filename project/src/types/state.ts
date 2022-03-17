import {SerializedError} from '@reduxjs/toolkit';
import {AuthorizationStatus, City} from '../const';
import {store} from '../store/store.js';
import {UserData} from './user-data.js';
import {OfferDTO} from './offer.js';
import {ReviewDTO} from './review.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
  userData: UserData,
};

export type OffersData = {
  loading: string,
  offers: OfferDTO[] | null,
  currentRequestId: undefined | string,
  error: null | SerializedError,
  city: City,
}

export type RoomData = {
  loading: string,
  room: OfferDTO | null,
  reviews: ReviewDTO[] | null,
  nearby: OfferDTO[] | null,
  currentRequestId: string | undefined,
  error: null | SerializedError,
}
