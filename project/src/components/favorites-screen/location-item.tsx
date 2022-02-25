import {Link} from 'react-router-dom';
import {OfferDTO} from '../../types/offer';
import FavoriteItem from '../../components/favorites-screen/favorite-item';
import {AppRoute} from '../../const';

type LocationItemProps = {
  offers: OfferDTO[];
  city: string;
}

function LocationItem({offers, city}: LocationItemProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={`${AppRoute.Root}?city=${city}`}>
            <span>{city}</span>
          </Link>
        </div>
      </div>

      <div className="favorites__places">
        {offers.map((offer) => <FavoriteItem key={offer.id} offer={offer} />)}
      </div>
    </li>
  );}

export default LocationItem;
