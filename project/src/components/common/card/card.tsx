import {Link} from 'react-router-dom';
import FavoriteButton from '../favorite-button/favorite-button';
import Rating from '../../common/rating/rating';
import {OfferDTO} from '../../../types/offer';
import {AppRoute, RatingType, TypeScreen} from '../../../const';
import {capitalizeFirstLetter} from '../../../utils/common';

type OnSetActiveCard = (offer: OfferDTO) => void;

type CardProps = {
  offer: OfferDTO;
  typeCardProp: string;
  onSetActiveCard?: OnSetActiveCard;
}

function Card({offer, typeCardProp, onSetActiveCard}: CardProps): JSX.Element {
  const {id, isPremium, previewImage, price, rating, title, type} = offer;

  const listeners = onSetActiveCard ? { onMouseEnter : () => onSetActiveCard(offer) } : {};

  return (
    <article
      className={`${typeCardProp === TypeScreen.Main ? 'cities__place-' : 'near-places__'}card place-card`}
      {...listeners}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}

      <div className={`${typeCardProp === TypeScreen.Main ? 'cities' : 'near-places'}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Property}${id}`}>
          <img className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place"
          />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <FavoriteButton
            offer={offer}
            typeScreenProp={TypeScreen.Main}
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

export default Card;
