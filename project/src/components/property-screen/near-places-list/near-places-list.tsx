import Card from '../../common/card/card';
import {OfferDTO} from '../../../types/offer';
import {TypeScreen} from '../../../const';

type NearPlacesListProps = {
  nearPlaces: OfferDTO[];
}

function NearPlacesList({nearPlaces}: NearPlacesListProps): JSX.Element {

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>

        <div className="near-places__list places__list">
          {nearPlaces.map((nearPlace) => (
            <Card
              key={nearPlace.id}
              offer={nearPlace}
              typeCardProp={TypeScreen.Properties}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default NearPlacesList;
