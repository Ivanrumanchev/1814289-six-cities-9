import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../app/app';
import {OfferDTO} from '../../../types/offer';
import {AuthorizationStatus, TypeScreen} from '../../../const';

type CardProps = {
  offer: OfferDTO;
  typeScreenProp: string;
}

function FavoriteButton({offer, typeScreenProp}: CardProps): JSX.Element {
  const {isFavorite} = offer;

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const buttonClassName = `${typeScreenProp === TypeScreen.Main ? 'place-card' : 'property'}__bookmark-button`;

  return (
    <button
      className={`button ${buttonClassName} ${isFavorite ? `${buttonClassName}--active` : ''}`}
      type="button"
      onClick={() => auth === AuthorizationStatus.NoAuth ? navigate('/login') : ''}
    >
      <svg
        className={`${typeScreenProp === TypeScreen.Main ? 'place-card' : 'property'}__bookmark-icon`}
        width={typeScreenProp === TypeScreen.Main ? '18' : '31'}
        height={typeScreenProp === TypeScreen.Main ? '19' : '33'}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteButton;
