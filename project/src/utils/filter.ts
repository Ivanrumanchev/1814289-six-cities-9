import {OfferDTO} from '../types/offer';
import {FilterType} from '../const';

type FilteredCities = {[keyof in FilterType]: OfferDTO[]};

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

