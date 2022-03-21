import LocationItem from '../../../components/favorites-screen/location-item/location-item';
import {City} from '../../../const';
import {FilteredCities} from '../../../types/offer';

type FavoritesListProps = {
  filteredOffers: FilteredCities;
}

function FavoritesList({filteredOffers}: FavoritesListProps): JSX.Element {
  return (
    <>
      <h1 className="favorites__title">Saved listing</h1>

      <ul className="favorites__list">
        {Object.values(City).map((city) =>
          filteredOffers[city].length !== 0
            && (
              <LocationItem
                offers={filteredOffers[city]}
                city={city}
                key={city}
              />
            ))}
      </ul>
    </>
  );
}

export default FavoritesList;
