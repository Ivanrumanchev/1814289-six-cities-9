import {memo, MutableRefObject, useEffect, useRef, useState} from 'react';
import {SortTypes} from '../../../const';

type SortProps = {
  activeSort: SortTypes;
  onSetActiveSort: (sort: SortTypes) => void;
}

function Sort({activeSort, onSetActiveSort}: SortProps): JSX.Element {
  const [openedList, setOpenedList] = useState(false);

  const sortsListRef: MutableRefObject<HTMLUListElement | null> = useRef(null);

  useEffect(() => {
    const outSortClickHandler = (evt: Event) => {
      evt.preventDefault();

      const sortsListElement = sortsListRef.current;

      const target = evt.target as HTMLElement;

      const isClickInside = sortsListElement ? sortsListElement.contains(target) : null;

      if (!isClickInside) {
        setOpenedList(false);
      }
    };

    document.addEventListener('mousedown', outSortClickHandler);

    return () => {
      document.removeEventListener('mousedown', outSortClickHandler);
    };
  });

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>

      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setOpenedList(true)}
      >
        {activeSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul
        className={`places__options places__options--custom ${openedList ? 'places__options--opened' : ''}`}
        ref={sortsListRef}
        onClick={(evt: React.SyntheticEvent<EventTarget>) => {
          const targetSort = (evt.target as HTMLLIElement).textContent;
          onSetActiveSort(targetSort as SortTypes);
          setOpenedList(false);
        }}
      >
        {Object.values(SortTypes).map((sortType) => (
          <li
            className={`places__option ${activeSort === sortType ? 'places__option--active' : ''}`}
            tabIndex={0}
            key={sortType}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default memo(Sort);
