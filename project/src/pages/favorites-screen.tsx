import Header from '../components/common/header/header';
import Logo from '../components/common/logo/logo';
import LoadingScreen from '../components/loading-screen/loading-screen';
import FavoritesList from '../components/favorites-screen/favorites-list/favorites-list';
import {favoritesSelector, loadingFavoritesSelector} from '../store/selectors';
import {useAppSelector} from '../hooks/store';
import {filter} from '../utils/filter';
import {LoadingStatus} from '../const';

function FavoritesScreen(): JSX.Element {
  const favoriteOffers = useAppSelector(favoritesSelector);
  const loading = useAppSelector(loadingFavoritesSelector);

  if (loading === LoadingStatus.Pending) {
    return (
      <LoadingScreen />
    );
  } else if (!favoriteOffers) {
    return (
      <h1 className="favorites__title">Избранные предложения не загрузились. Попробуйте перезагрузить страницу</h1>
    );
  }

  const isNotEmptyOffers = favoriteOffers.length !== 0;

  const filteredOffers = filter(favoriteOffers);

  return (
    <div className={`page ${isNotEmptyOffers ? '' : 'page--favorites-empty'}`}>
      <Header />

      <main className={`page__main page__main--favorites ${isNotEmptyOffers ? '' : 'page__main--favorites-empty'}`}>
        <div className="page__favorites-container container">
          <section className={`favorites ${isNotEmptyOffers ? '' : 'favorites--empty'}`}>
            {isNotEmptyOffers
              ? <FavoritesList filteredOffers={filteredOffers} />
              :
              <>
                <h1 className="visually-hidden">Favorites (empty)</h1>

                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </div>
              </>}
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
