import {useNavigate} from 'react-router-dom';
import {authSelector} from '../../../store/selectors';
import {useAppSelector} from '../../../hooks/store';
import {AuthorizationStatus, TypeScreen} from '../../../const';
import {OfferDTO} from '../../../types/offer';

type CardProps = {
  offer: OfferDTO;
  typeScreenProp: string;
}

function FavoriteButton({offer, typeScreenProp}: CardProps): JSX.Element {
  const {isFavorite} = offer;

  const authorization = useAppSelector(authSelector);

  const navigate = useNavigate();

  const buttonClassName = `${typeScreenProp === TypeScreen.Main ? 'place-card' : 'property'}__bookmark-button`;

  return (
    <button
      className={`button ${buttonClassName} ${isFavorite ? `${buttonClassName}--active` : ''}`}
      type="button"
      onClick={() => authorization === AuthorizationStatus.NoAuth ? navigate('/login') : ''}
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
