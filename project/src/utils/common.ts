import {Icon} from 'leaflet';
import {FilterType} from '../const';
import {paris, cologne, brussels, amsterdam, hamburg, dusseldorf} from '../store/action';

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

export const getAction = (city: FilterType) => {
  switch (city) {
    case FilterType.Paris: return paris;
    case FilterType.Cologne: return cologne;
    case FilterType.Brussels: return brussels;
    case FilterType.Amsterdam: return amsterdam;
    case FilterType.Hamburg: return hamburg;
    case FilterType.Dusseldorf: return dusseldorf;
  }
};

export const getRandomInteger = (min: number, max: number) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

