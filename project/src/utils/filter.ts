import {City} from '../const';
import {FilteredCities, OfferDTO} from '../types/offer';

export const filter = (offers: OfferDTO[]): FilteredCities =>
  offers.reduce<FilteredCities>((filteredCitiesResult, currentOffer) => {
    const currentCity = currentOffer.city.name;

    Object.values(City).forEach((city) => {
      if (currentCity === city) {
        filteredCitiesResult[city].push(currentOffer);
      }
    });

    return filteredCitiesResult;
  }, {
    [City.Paris]: [],
    [City.Cologne]: [],
    [City.Brussels]: [],
    [City.Amsterdam]: [],
    [City.Hamburg]: [],
    [City.Dusseldorf]: [],
  } as FilteredCities);

