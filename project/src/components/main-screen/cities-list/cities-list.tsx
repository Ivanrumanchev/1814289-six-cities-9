import {memo} from 'react';
import {activeCity} from '../../../store/offers-data/offers-data';
import {useAppDispatch} from '../../../hooks/store';
import {City} from '../../../const';

type CitiesListProps = {
  nameOfCity: City;
}

function CitiesList({nameOfCity}: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Object.values(City).map((city) => (
            <li className="locations__item" key={city}>
              <a
                className={`locations__item-link tabs__item${nameOfCity === city ? ' tabs__item--active' : ''}`}
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(activeCity(city));
                }}
                href="/"
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default memo(CitiesList);
