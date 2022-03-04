import {FilterType} from '../../../const';
import {useAppDispatch} from '../../../hooks/store';
import {paris, cologne, brussels, amsterdam, hamburg, dusseldorf} from '../../../store/action';

type CitiesListProps = {
  nameOfCity: FilterType;
}

const getAction = (city: FilterType) => {
  switch (city) {
    case FilterType.Paris: return paris;
    case FilterType.Cologne: return cologne;
    case FilterType.Brussels: return brussels;
    case FilterType.Amsterdam: return amsterdam;
    case FilterType.Hamburg: return hamburg;
    case FilterType.Dusseldorf: return dusseldorf;
  }
};

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
                  dispatch(getAction(city)());
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
