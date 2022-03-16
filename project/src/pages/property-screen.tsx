import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Header from '../components/common/header/header';
import Map from '../components/common/map/map';
import ReviewsList from '../components/property-screen/reviews-list/reviews-list';
import NearPlacesList from '../components/property-screen/near-places-list/near-places-list';
import FavoriteButton from '../components/common/favorite-button/favorite-button';
import Gallery from '../components/property-screen/gallery/gallery';
import Rating from '../components/common/rating/rating';
import LoadingScreen from '../components/loading-screen/loading-screen';
import {useAppDispatch, useAppSelector} from '../hooks/store';
import {clearRoom, fetchRoomAction} from '../store/room-data/room-data';
import {roomSelector, loadingRoomSelector, nearbySelector} from '../store/selectors';
import {TypeScreen, RatingType, LoadingStatus} from '../const';
import {capitalizeFirstLetter} from '../utils/common';

function PropertyScreen(): JSX.Element {
  const params = useParams();

  const dispatch = useAppDispatch();

  const offerId = params.id ? +params.id : 0;

  useEffect(() => {
    dispatch(fetchRoomAction(offerId));

    return () => {
      dispatch(clearRoom());
    };
  },[dispatch, offerId]);

  const room = useAppSelector(roomSelector);
  const loadingRoom = useAppSelector(loadingRoomSelector);
  const nearby = useAppSelector(nearbySelector);

  if (loadingRoom === LoadingStatus.Pending || !room) {
    return (
      <LoadingScreen />
    );
  }

  const {isPremium, title, rating, type, bedrooms, maxAdults, price, goods, host, description} = room;
  const {name, isPro, avatarUrl} = host;

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <Gallery room={room} />

          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>}

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>

                <FavoriteButton
                  offer={room}
                  typeScreenProp={TypeScreen.Properties}
                />
              </div>

              <Rating
                rating={rating}
                ratingType={RatingType.Property}
              />

              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {capitalizeFirstLetter(type)}
                </li>

                <li className="property__feature property__feature--bedrooms">
                  {bedrooms === 1 ? `${bedrooms} Bedroom` : `${bedrooms} Bedrooms`}
                </li>

                <li className="property__feature property__feature--adults">
                  Max {maxAdults === 1 ? `${maxAdults} adult` : `${maxAdults} adults`}
                </li>
              </ul>

              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>

              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>

                <ul className="property__inside-list">
                  {goods.map((good) =>(
                    <li className="property__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>

                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>

                  <span className="property__user-name">{name}</span>

                  {isPro && <span className="property__user-status">Pro</span>}
                </div>

                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>

              <ReviewsList offerId={offerId}/>
            </div>
          </div>

          {nearby ?
            <Map
              offers={[...nearby, room]}
              city={room.city.name}
              activeCard={room}
              typeScreenProp={TypeScreen.Properties}
            />
            : <LoadingScreen />}
        </section>

        <NearPlacesList offerId={offerId} />
      </main>
    </div>
  );
}

export default PropertyScreen;
