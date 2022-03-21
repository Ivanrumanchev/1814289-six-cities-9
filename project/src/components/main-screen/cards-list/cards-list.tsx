import {useState} from 'react';
import Card from '../../common/card/card';
import Map from '../../common/map/map';
import Sort from '../sort/sort';
import {getSortedOffers} from '../../../utils/common';
import {City, SortTypes, TypeScreen} from '../../../const';
import {OfferDTO} from '../../../types/offer';

type CardsListProps = {
  offers: OfferDTO[];
  city: City;
  isNotEmptyOffers: boolean;
}

function CardsList({offers, city, isNotEmptyOffers}: CardsListProps): JSX.Element {
  const [activeCard, onSetActiveCard] = useState<null | OfferDTO>(null);

  const [activeSort, onSetActiveSort] = useState(SortTypes.Popular);

  const sortedOffers = getSortedOffers(offers, activeSort);

  return (
    <div className="cities">
      <div className={`cities__places-container container ${isNotEmptyOffers ? '' : 'cities__places-container--empty'}`}>
        {isNotEmptyOffers
          ?
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
          :
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in {city}</p>
            </div>
          </section>}

        <div className="cities__right-section">
          {isNotEmptyOffers &&
            <Map
              offers={sortedOffers}
              city={city}
              activeCard={activeCard}
              typeScreenProp={TypeScreen.Main}
            />}
        </div>
      </div>
    </div>
  );
}

export default CardsList;
