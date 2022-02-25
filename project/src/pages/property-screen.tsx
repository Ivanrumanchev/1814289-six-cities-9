import {useNavigate, useParams, Navigate} from 'react-router-dom';
import Header from '../components/common/header/header';
import NewReview from '../components/property-screen/reviews/new-review/new-review';
import ReviewItem from '../components/property-screen/reviews/review-item';
import NearPlaceItem from '../components/property-screen/near-place-item';
import {useContext} from 'react';
import {AuthContext} from '../components/app/app';
import {AuthorizationStatus} from '../const';
import {toSignInScreen, getRatingRate, capitalize} from '../utils/common';
import {OfferDTO} from '../types/offer';
import {ReviewDTO} from '../types/review';
import {AppRoute} from '../const';

type PropertyScreenProps = {
  offers: OfferDTO[];
  reviews: ReviewDTO[];
}

const QUANTITY_REVIEWS = 10;
const QUANTITY_NEAR_PLACES = 3;

function PropertyScreen({offers, reviews}: PropertyScreenProps): JSX.Element {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  if (!params.id) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  const offerId = +params.id;
  const room = offers.filter((offer) => offer.id === offerId)[0];

  if (!room) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  const {images,isPremium, title, isFavorite, rating, type, bedrooms, maxAdults, price, goods, host, description} = room;
  const {name, isPro, avatarUrl} = host;

  const nearPlaces=offers.slice(0, QUANTITY_NEAR_PLACES);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image) => (
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt="Room" />
                </div>
              ))}
            </div>
          </div>

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

                <button
                  className={`property__bookmark-button button ${isFavorite ? 'property__bookmark-button--active' : ''}`}
                  type="button"
                  onClick={() => toSignInScreen(auth, navigate)}
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>

              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: getRatingRate(rating)}}></span>

                  <span className="visually-hidden">Rating</span>
                </div>

                <span className="property__rating-value rating__value">{rating}</span>
              </div>

              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {capitalize(type)}
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

              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>

                <ul className="reviews__list">
                  {reviews.slice(0, QUANTITY_REVIEWS).map((review) => (
                    <ReviewItem
                      key={review.id}
                      review={review}
                    />
                  ))}
                </ul>

                {auth === AuthorizationStatus.Auth && <NewReview />}
              </section>
            </div>
          </div>

          <section className="property__map map"></section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>

            <div className="near-places__list places__list">
              {nearPlaces.map((nearPlace) => (
                <NearPlaceItem
                  key={nearPlace.id}
                  place={nearPlace}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default PropertyScreen;
