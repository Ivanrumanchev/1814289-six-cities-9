import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../../hooks/store';
import {AppRoute, FilterType} from '../../../const';
import {getAction, getRandomInteger} from '../../../utils/common';

function LoginLocation(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const randomIndex = getRandomInteger(0, Object.values(FilterType).length - 1);
  const randomCity = Object.values(FilterType)[randomIndex];

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <a
          className="locations__item-link"
          href="/"
          onClick={(evt) => {
            evt.preventDefault();

            dispatch(getAction(randomCity)());

            navigate(AppRoute.Root);
          }}
        >
          <span>{randomCity}</span>
        </a>
      </div>
    </section>
  );
}

export default LoginLocation;
