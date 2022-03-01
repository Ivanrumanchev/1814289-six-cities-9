import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import useMap from '../../../hooks/use-map';
import {OfferDTO} from '../../../types/offer';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT, citiesLocation, FilterType} from '../../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: OfferDTO[];
  city: string;
  activeCard: OfferDTO | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map(props: MapProps): JSX.Element {
  const {city, offers, activeCard} = props;

  const nameOfCity = Object.values(FilterType).filter((type) => city === type)[0];
  const cityLocation = citiesLocation[nameOfCity];

  const mapRef = useRef(null);
  const map = useMap(mapRef, cityLocation);

  useEffect(() => {
    if (map) {
      map.flyTo(
        [cityLocation.location.latitude, cityLocation.location.longitude],
        cityLocation.location.zoom,
        { animate: true,
          duration: 2.5 },
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
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
  }, [map, offers, activeCard]);


  return (
    <div className="cities__right-section">
      <section className="cities__map map" ref={mapRef}>
      </section>
    </div>
  );
}

export default Map;
