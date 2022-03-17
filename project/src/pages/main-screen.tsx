import Header from '../components/common/header/header';
import CardsList from '../components/main-screen/cards-list/cards-list';
import CitiesList from '../components/main-screen/cities-list/cities-list';
import {citySelector, offersOfCitySelector} from '../store/selectors';
import {useAppSelector} from '../hooks/store';

function MainScreen(): JSX.Element {
  const nameOfCity = useAppSelector(citySelector);
  const offersOfCity = useAppSelector(offersOfCitySelector);

  const isNotEmptyOffers = offersOfCity.length !== 0;

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={`page__main page__main--index ${isNotEmptyOffers ? '' : 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>

        <CitiesList nameOfCity={nameOfCity} />

        <CardsList
          isNotEmptyOffers={isNotEmptyOffers}
          offers={offersOfCity}
          city={nameOfCity}
        />
      </main>
    </div>
  );
}

export default MainScreen;
