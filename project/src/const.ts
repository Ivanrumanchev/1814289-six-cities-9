import {CitiesLocation} from './types/offer';

export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Property = '/offer/',
  PropertyId = '/offer/:id',
  Root = '/',
  NotFound = '/notFound',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum FilterType {
  PARIS = 'Paris',
  COLOGNE = 'Cologne',
  BRUSSELS = 'Brussels',
  AMSTERDAM = 'Amsterdam',
  HAMBURG = 'Hamburg',
  DUSSELDORF = 'Dusseldorf',
}

export const citiesLocation: CitiesLocation = {
  [FilterType.PARIS]: {
    'name': FilterType.PARIS,
    'location': {
      'latitude': 48.85661,
      'longitude': 2.351499,
      'zoom': 13,
    },
  },
  [FilterType.COLOGNE]: {
    'name': FilterType.COLOGNE,
    'location': {
      'latitude': 50.938361,
      'longitude': 6.959974,
      'zoom': 13,
    },
  },
  [FilterType.BRUSSELS]: {
    'name': FilterType.BRUSSELS,
    'location': {
      'latitude': 50.846557,
      'longitude': 4.351697,
      'zoom': 13,
    },
  },
  [FilterType.AMSTERDAM]: {
    'name': FilterType.AMSTERDAM,
    'location': {
      'latitude': 52.37454,
      'longitude': 4.897976,
      'zoom': 13,
    },
  },
  [FilterType.HAMBURG]: {
    'name': FilterType.HAMBURG,
    'location': {
      'latitude': 53.550341,
      'longitude': 10.000654,
      'zoom': 13,
    },
  },
  [FilterType.DUSSELDORF]: {
    'name': FilterType.DUSSELDORF,
    'location': {
      'latitude': 51.225402,
      'longitude': 6.776314,
      'zoom': 13,
    },
  },
};

export enum TypeScreen {
  Main = 'main',
  Properties = 'properties',
}

export enum RatingType {
  Place = 'place-card',
  Reviews = 'reviews',
  Property = 'property',
}
