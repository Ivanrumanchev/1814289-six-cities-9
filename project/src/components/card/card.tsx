import {useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {AuthContext} from '../app/app';
import {getRatingRate, toSignInScreen, capitalize} from '../../utils/common';
import {OfferDTO} from '../../types/offer';

type MouseEnterHandle = (id: number) => void;

type CardProps = {
  offer: OfferDTO;
  mouseEnterHandle: MouseEnterHandle;
}

function Card({offer, mouseEnterHandle}: CardProps): JSX.Element {
  const {id, isPremium, previewImage, price, isFavorite, rating, title, type} = offer;

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <article className="cities__place-card place-card" onMouseEnter={() => mouseEnterHandle(id)}>
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}

      <div className="cities__image-wrapper place-card__image-wrapper">
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

          <button
            className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
            onClick={() => toSignInScreen(auth, navigate)}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingRate(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`${AppRoute.Property}${id}`}>{title}</Link>
        </h2>

        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}

export default Card;
