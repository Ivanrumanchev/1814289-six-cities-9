import Header from '../components/common/header/header';
import Logo from '../components/common/logo/logo';
import LocationItem from '../components/favorites-screen/location-item/location-item';
import {OfferDTO} from '../types/offer';
import {FilterType} from '../const';
import {filter} from '../utils/filter';

type FavoritesScreenProps = {
  offers: OfferDTO[];
}

function FavoritesScreen({offers}: FavoritesScreenProps): JSX.Element {
  const filteredOffers = filter(offers);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <ul className="favorites__list">
              {Object.values(FilterType).map((city) =>
                filteredOffers[city].length === 0
                  ? null
                  : (
                    <LocationItem
                      offers={filteredOffers[city]}
                      city={city}
                      key={city}
                    />
                  ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Logo />
      </footer>
    </div>
  );
}

export default FavoritesScreen;
