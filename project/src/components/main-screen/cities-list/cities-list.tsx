import {FilterType} from '../../../const';
import {useAppDispatch} from '../../../hooks/store';
import {activeCity} from '../../../store/action';

type CitiesListProps = {
  nameOfCity: FilterType;
}

function CitiesList({nameOfCity}: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Object.values(FilterType).map((city) => (
            <li className="locations__item" key={city}>
              <a
                className={`locations__item-link tabs__item${nameOfCity === city ? ' tabs__item--active' : ''}`}
                onClick={(evt) => {
                  evt.preventDefault();
                  dispatch(activeCity({activeCity: city}));
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

export default CitiesList;
