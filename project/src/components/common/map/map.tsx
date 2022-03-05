import {useRef, useEffect} from 'react';
import {Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../../hooks/use-map';
import {OfferDTO} from '../../../types/offer';
import {getIcon} from '../../../utils/common';
import {citiesLocation, FilterType, TypeScreen} from '../../../const';

type MapProps = {
  offers: OfferDTO[];
  city: FilterType;
  activeCard: OfferDTO | null;
  typeScreenProp: string;
};

const DURATION_FLY = 2.5;
const URL_MARKER_DEFAULT = './img/pin.svg';
const URL_MARKER_CURRENT = './img/pin-active.svg';

function Map(props: MapProps): JSX.Element {
  const {city, offers, activeCard, typeScreenProp} = props;

  const cityLocation = citiesLocation[city];

  const mapRef = useRef(null);
  const map = useMap(mapRef, cityLocation);

  useEffect(() => {
    if (map) {
      map.flyTo(
        [cityLocation.location.latitude, cityLocation.location.longitude],
        cityLocation.location.zoom,
        { animate: true,
          duration: DURATION_FLY },
      );
    }
  }, [map, cityLocation]);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            activeCard !== null && offer.id === activeCard.id
              ? getIcon(URL_MARKER_CURRENT)
              : getIcon(URL_MARKER_DEFAULT),
          )
          .addTo(map);
      });
    }
  }, [map, offers, activeCard]);


  return (
    <section
      className={`${typeScreenProp === TypeScreen.Main ? 'cities' : 'property'}__map map`}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
