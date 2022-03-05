import {OfferDTO} from './../types/offer';
import {Icon} from 'leaflet';
import { SortTypes } from '../const';

const ICON_SIZE = 40;
const RATING_RATIO = 20;

export const getRatingRate = (rating: number) => `${Math.round(rating) * RATING_RATIO}%`;

export const capitalizeFirstLetter = (str: string) => {
  if (!str) {
    return str;
  }

  return str[0].toUpperCase() + str.slice(1);
};

export const getFormattedDate = (date: string) => {
  const dateComment = new Date(date);

  const formatterDate = new Intl.DateTimeFormat('eng', {
    year: 'numeric',
    month: 'long',
  });

  return formatterDate.format(dateComment);
};

export const getFormattedAttrDate = (date: string) => {
  const dateComment = new Date(date);
  const formatterDateAttr = new Intl.DateTimeFormat('ko-KR');

  return formatterDateAttr.format(dateComment).toString().split('. ').join('-').slice(0, -1);
};

export const getIcon = (url: string) =>
  new Icon({
    iconUrl: url,
    iconSize: [ICON_SIZE, ICON_SIZE],
    iconAnchor: [ICON_SIZE/2, ICON_SIZE],
  });

export const getRandomInteger = (min: number, max: number) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const sortLowToHigh = (offerA: OfferDTO, offerB: OfferDTO) => offerA.price - offerB.price;
export const sortHighToLow = (offerA: OfferDTO, offerB: OfferDTO) => offerB.price - offerA.price;
export const sortRated = (offerA: OfferDTO, offerB: OfferDTO) => offerB.rating - offerA.rating;

export const getSortedOffers = (offers: OfferDTO[], activeSort: SortTypes) => {
  const offersForSort = offers.slice();

  switch (activeSort) {
    case SortTypes.LowToHigh:
      return offersForSort.sort(sortLowToHigh);
    case SortTypes.HighToLow:
      return offersForSort.sort(sortHighToLow);
    case SortTypes.Rated:
      return offersForSort.sort(sortRated);
    default:
      return offers;
  }
};
