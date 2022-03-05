import {useState} from 'react';
import Card from '../../common/card/card';
import Map from '../../common/map/map';
import Sort from '../sort/sort';
import {OfferDTO} from '../../../types/offer';
import {FilterType, SortTypes, TypeScreen} from '../../../const';
import {getSortedOffers} from '../../../utils/common';

type CardsListProps = {
  offers: OfferDTO[];
  city: FilterType;
}

function CardsList({offers, city}: CardsListProps): JSX.Element {
  const [activeCard, onSetActiveCard] = useState<null | OfferDTO>(null);

  const [activeSort, onSetActiveSort] = useState(SortTypes.Popular);

  const sortedOffers = getSortedOffers(offers, activeSort);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>

          <b className="places__found">{sortedOffers.length} places to stay in {city}</b>

          <Sort
            activeSort={activeSort}
            onSetActiveSort={onSetActiveSort}
          />

          <div className="cities__places-list places__list tabs__content">
            {sortedOffers.map((offer) => (
              <Card
                key={offer.id}
                offer={offer}
                typeCardProp={TypeScreen.Main}
                onSetActiveCard={onSetActiveCard}
              />
            ))}
          </div>
        </section>

        <div className="cities__right-section">
          <Map
            offers={sortedOffers}
            city={city}
            activeCard={activeCard}
            typeScreenProp={TypeScreen.Main}
          />
        </div>
      </div>
    </div>

  );
}

export default CardsList;
