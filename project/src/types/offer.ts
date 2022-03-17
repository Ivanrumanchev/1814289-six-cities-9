import {City} from '../const';

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type Town = {
  name: City;
  location: Location;
};

type Host = {
  id: number;
  name: string;
  isPro: boolean;
  avatarUrl: string;
};

export type OfferDTO = {
  city: Town;
  previewImage: string;
  images: string[];
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: Host;
  description: string;
  location: Location;
  id: number;
};

export type CitiesLocation = {
  [keyof in City]: Town;
}
