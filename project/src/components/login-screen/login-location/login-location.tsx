import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../../hooks/store';
import {activeCity} from '../../../store/offers-data/offers-data';
import {getRandomInteger} from '../../../utils/common';
import {AppRoute, City} from '../../../const';

function LoginLocation(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const randomIndex = getRandomInteger(0, Object.values(City).length - 1);
  const randomCity = Object.values(City)[randomIndex];

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <a
          className="locations__item-link"
          href="/"
          onClick={(evt) => {
            evt.preventDefault();

            dispatch(activeCity(randomCity));

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
