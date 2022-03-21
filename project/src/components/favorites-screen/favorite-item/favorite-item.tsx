import {memo} from 'react';
import {Link} from 'react-router-dom';
import FavoriteButton from '../../common/favorite-button/favorite-button';
import Rating from '../../common/rating/rating';
import {capitalizeFirstLetter} from '../../../utils/common';
import {AppRoute, RatingType, TypeScreen} from '../../../const';
import {OfferDTO} from '../../../types/offer';

type FavoriteItemProps = {
  offer: OfferDTO;
}

function FavoriteItem({offer}: FavoriteItemProps): JSX.Element {
  const {id, isPremium, previewImage, price, rating, title, type} = offer;

  return (
    <article className="favorites__card place-card">
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}

      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Property}${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="150"
            height="110"
            alt="Place"
          />
        </Link>
      </div>

      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <FavoriteButton
            offer={offer}
            typeScreenProp={TypeScreen.Main}
            isFavoriteScreen
          />
        </div>

        <Rating
          rating={rating}
          ratingType={RatingType.Place}
        />

        <h2 className="place-card__name">
          <Link to={`${AppRoute.Property}${id}`}>{title}</Link>
        </h2>

        <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
      </div>
    </article>
  );
}

export default memo(FavoriteItem);
