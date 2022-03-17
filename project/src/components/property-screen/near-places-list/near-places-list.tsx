import {useEffect, useState} from 'react';
import Card from '../../common/card/card';
import LoadingScreen from '../../loading-screen/loading-screen';
import {nearbySelector} from '../../../store/selectors';
import {clearNearby} from '../../../store/room-data/room-data';
import {fetchNearbyAction} from '../../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../../hooks/store';
import {TypeScreen} from '../../../const';

type NearPlacesListProps = {
  offerId: number;
}

function NearPlacesList({offerId}: NearPlacesListProps): JSX.Element {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);

    dispatch(fetchNearbyAction(offerId)).then(() => setLoading(false));

    return () => {
      dispatch(clearNearby());
    };
  },[dispatch, offerId]);

  const nearby = useAppSelector(nearbySelector);

  if (loading) {
    return (
      <LoadingScreen />
    );
  } else if (!nearby) {
    return (
      <h2 className="near-places__title">Объявления рядом не загрузились. Попробуйте перезагрузить страницу</h2>
    );
  }

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>

        <div className="near-places__list places__list">
          {nearby.map((nearPlace) => (
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
