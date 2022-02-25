import {FilterType} from '../const';
import {OfferDTO} from '../types/offer';

type FilteredCities = {
  [FilterType.PARIS]: OfferDTO[];
  [FilterType.COLOGNE]: OfferDTO[];
  [FilterType.BRUSSELS]: OfferDTO[];
  [FilterType.AMSTERDAM]: OfferDTO[];
  [FilterType.HAMBURG]: OfferDTO[];
  [FilterType.DUSSELDORF]: OfferDTO[];
}

export const filter = (offers: OfferDTO[]): FilteredCities =>
  offers.reduce<FilteredCities>((filteredCitiesResult, currentOffer) => {
    const currentCity = currentOffer.city.name;

    Object.values(FilterType).forEach((city) => {
      if (currentCity === city) {
        filteredCitiesResult[city].push(currentOffer);
      }
    });

    return filteredCitiesResult;
  }, {
    [FilterType.PARIS]: [],
    [FilterType.COLOGNE]: [],
    [FilterType.BRUSSELS]: [],
    [FilterType.AMSTERDAM]: [],
    [FilterType.HAMBURG]: [],
    [FilterType.DUSSELDORF]: [],
  } as FilteredCities);

