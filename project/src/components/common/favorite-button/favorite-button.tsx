import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {authSelector} from '../../../store/selectors';
import {addToFavoritesAction} from '../../../store/api-actions';
import {errorHandle} from '../../../services/error-handle';
import {useAppDispatch, useAppSelector} from '../../../hooks/store';
import {ApiActions, AuthorizationStatus, TypeScreen} from '../../../const';
import {OfferDTO} from '../../../types/offer';

type CardProps = {
  offer: OfferDTO;
  typeScreenProp: string;
  isFavoriteScreen?: boolean;
  isNearby?: boolean;
}

enum Cursor {
  Default = 'default',
  Progress = 'progress',
}

enum ErrorMessage {
  Add = 'Не удалось добавить предложение в избранное',
  Remove = 'Не удалось удалить предложение из избранного',
}

function FavoriteButton({offer, typeScreenProp, isFavoriteScreen = false, isNearby = false}: CardProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const favorite = offer.isFavorite;

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const authorization = useAppSelector(authSelector);

  const updateFavorite = async () => {
    setLoading(true);

    try {
      const response = await dispatch(addToFavoritesAction(offer));

      if (response.type === `${ApiActions.addToFavorites}/rejected`) {
        errorHandle(favorite ? ErrorMessage.Remove : ErrorMessage.Add);
        throw new Error();
      }
      if (isFavoriteScreen) {
        document.body.style.cursor = Cursor.Default;

        return;
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  document.body.style.cursor = loading ? Cursor.Progress : Cursor.Default;

  const buttonClickHandler = () => {
    authorization === AuthorizationStatus.NoAuth
      ? navigate('/login')
      : updateFavorite();
  };

  const isMain = typeScreenProp === TypeScreen.Main;
  const buttonClassName = `${isMain ? 'place-card' : 'property'}__bookmark-button`;

  return (
    <button
      className={`button ${buttonClassName} ${favorite ? `${buttonClassName}--active` : ''}`}
      type="button"
      onClick={buttonClickHandler}
      disabled={loading || isNearby}
    >
      <svg
        className={`${isMain ? 'place-card' : 'property'}__bookmark-icon`}
        width={isMain ? '18' : '31'}
        height={isMain ? '19' : '33'}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteButton;
