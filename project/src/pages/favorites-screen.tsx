import Header from '../components/common/header/header';
import Logo from '../components/common/logo/logo';
import LocationItem from '../components/favorites-screen/location-item';
import {filter} from '../utils/filter';
import {FilterType} from '../const';

import {Offers} from '../types/offers';

type FavoritesScreenProps = {
  offers: Offers;
}

function FavoritesScreen({offers}: FavoritesScreenProps): JSX.Element {

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <ul className="favorites__list">
              {Object.values(FilterType).map((city) => {
                const filteredOffers = filter[city](offers);

                if (filteredOffers.length === 0) {
                  return null;
                }

                return (
                  <LocationItem
                    offers={filteredOffers}
                    city={city}
                    key={city}
                  />);
              })}
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
