import {AuthorizationStatus} from '../const';
import {NavigateFunction} from 'react-router-dom';

const RATING_RATIO = 20;

export const toSignInScreen = (auth : string, navigate: NavigateFunction) => auth === AuthorizationStatus.NoAuth ? navigate('/login') : '';

export const getRatingRate = (rating: number) => `${Math.round(rating) * RATING_RATIO}%`;

export const capitalize = (str: string) => {
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
