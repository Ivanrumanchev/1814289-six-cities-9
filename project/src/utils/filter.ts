import {FilterType} from '../const';
import {Offers, Offer} from '../types/offers';

type Filter = {
  [FilterType.PARIS]: (offers: Offers) => Offer[];
  [FilterType.COLOGNE]: (offers: Offers) => Offer[];
  [FilterType.BRUSSELS]: (offers: Offers) => Offer[];
  [FilterType.AMSTERDAM]: (offers: Offers) => Offer[];
  [FilterType.HAMBURG]: (offers: Offers) => Offer[];
  [FilterType.DUSSELDORF]: (offers: Offers) => Offer[];
}

export const filter: Filter = {
  [FilterType.PARIS]: (offers: Offers) => offers.filter((offer) => offer.city.name === FilterType.PARIS),
  [FilterType.COLOGNE]: (offers: Offers) => offers.filter((offer) => offer.city.name === FilterType.COLOGNE),
  [FilterType.BRUSSELS]: (offers: Offers) => offers.filter((offer) => offer.city.name === FilterType.BRUSSELS),
  [FilterType.AMSTERDAM]: (offers: Offers) => offers.filter((offer) => offer.city.name === FilterType.AMSTERDAM),
  [FilterType.HAMBURG]: (offers: Offers) => offers.filter((offer) => offer.city.name === FilterType.HAMBURG),
  [FilterType.DUSSELDORF]: (offers: Offers) => offers.filter((offer) => offer.city.name === FilterType.DUSSELDORF),
};
