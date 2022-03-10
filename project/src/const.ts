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
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export const citiesLocation: CitiesLocation = {
  [FilterType.Paris]: {
    'name': FilterType.Paris,
    'location': {
      'latitude': 48.85661,
      'longitude': 2.351499,
      'zoom': 13,
    },
  },
  [FilterType.Cologne]: {
    'name': FilterType.Cologne,
    'location': {
      'latitude': 50.938361,
      'longitude': 6.959974,
      'zoom': 13,
    },
  },
  [FilterType.Brussels]: {
    'name': FilterType.Brussels,
    'location': {
      'latitude': 50.846557,
      'longitude': 4.351697,
      'zoom': 13,
    },
  },
  [FilterType.Amsterdam]: {
    'name': FilterType.Amsterdam,
    'location': {
      'latitude': 52.37454,
      'longitude': 4.897976,
      'zoom': 13,
    },
  },
  [FilterType.Hamburg]: {
    'name': FilterType.Hamburg,
    'location': {
      'latitude': 53.550341,
      'longitude': 10.000654,
      'zoom': 13,
    },
  },
  [FilterType.Dusseldorf]: {
    'name': FilterType.Dusseldorf,
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

export enum SortTypes {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  Rated = 'Top rated first',
}

export enum APIRoute {
  Offers = '/hotels',
  Offer = '/hotels/{hotelId}',
  Nearby = '/hotels/{hotelId}/nearby',
  Favorite = '/favorite',
  FavoriteStatus = '/favorite/{hotelId}/{status}',
  Comments = '/comments/{hotelId}',
  Login = '/login',
  Logout = '/logout',
}

export enum HttpCode {
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}
