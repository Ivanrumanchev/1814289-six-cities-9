import {NavLink, useSearchParams, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {filter} from '../utils/filter';
import {FilterType} from '../const';
import Header from '../components/common/header/header';
import CardsList from '../components/main-screen/cards-list';
import {OfferDTO} from '../types/offer';

type MainScreenProps = {
  offers: OfferDTO[];
}

function MainScreen({offers}: MainScreenProps): JSX.Element {
  const [searchParams] = useSearchParams();
  const activeCity = searchParams.get('city');
  const navigate = useNavigate();

  const filteredOffers = filter(offers);
  let offersOfCity = filteredOffers[FilterType.PARIS];

  useEffect(() => {
    if (!activeCity) {
      navigate(`/?city=${FilterType.PARIS}`);
    }
  });

  if (activeCity) {
    const nameOfCity = Object.values(FilterType).filter((type) => activeCity === type)[0];
    offersOfCity = filteredOffers[nameOfCity];
  }

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {Object.values(FilterType).map((city) => (
                <li className="locations__item" key={city}>
                  <NavLink
                    className={() => `locations__item-link tabs__item${activeCity === city ? ' tabs__item--active' : ''}`}
                    to={`?city=${city}`}
                  >
                    <span>{city}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <CardsList
          offers={offersOfCity}
          city={activeCity ? activeCity : FilterType.PARIS}
        />
      </main>
    </div>
  );
}

export default MainScreen;
