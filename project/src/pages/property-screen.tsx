import {useParams, Navigate} from 'react-router-dom';
import Header from '../components/common/header/header';
import Map from '../components/common/map/map';
import ReviewsList from '../components/property-screen/reviews-list/reviews-list';
import NearPlacesList from '../components/property-screen/near-places-list/near-places-list';
import FavoriteButton from '../components/common/favorite-button/favorite-button';
import Gallery from '../components/property-screen/gallery/gallery';
import Rating from '../components/common/rating/rating';
import {OfferDTO} from '../types/offer';
import {ReviewDTO} from '../types/review';
import {TypeScreen, AppRoute, RatingType} from '../const';
import {capitalizeFirstLetter} from '../utils/common';

type PropertyScreenProps = {
  offers: OfferDTO[];
  reviews: ReviewDTO[];
}

const QUANTITY_NEAR_PLACES = 3;

function PropertyScreen({offers, reviews}: PropertyScreenProps): JSX.Element {
  const params = useParams();

  if (!params.id) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  const offerId = +params.id;
  const room = offers.filter((offer) => offer.id === offerId)[0];

  if (!room) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  const nearPlaces = offers
    .filter((offer) => offer.city.name === room.city.name)
    .slice(0, QUANTITY_NEAR_PLACES);

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

              <ReviewsList reviews={reviews}/>
            </div>
          </div>

          <Map
            offers={nearPlaces}
            city={room.city.name}
            activeCard={room}
            typeScreenProp={TypeScreen.Properties}
          />
        </section>

        <NearPlacesList nearPlaces={nearPlaces} />
      </main>
    </div>
  );
}

export default PropertyScreen;
