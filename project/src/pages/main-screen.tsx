import Header from '../components/common/header/header';
import CardsList from '../components/main-screen/cards-list/cards-list';
import CitiesList from '../components/main-screen/cities-list/cities-list';
import {useAppSelector} from '../hooks/store';


function MainScreen(): JSX.Element {
  const offersOfCity = useAppSelector((state) => state.filteredOffers);
  const nameOfCity = useAppSelector((state) => state.city);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <CitiesList nameOfCity={nameOfCity} />

        <CardsList
          offers={offersOfCity}
          city={nameOfCity}
        />
      </main>
    </div>
  );
}

export default MainScreen;
