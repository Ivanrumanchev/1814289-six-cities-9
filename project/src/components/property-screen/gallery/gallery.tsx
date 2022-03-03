import {OfferDTO} from '../../../types/offer';

type GalleryProps = {
  room: OfferDTO;
}

const QUANTITY_IMAGES_GALLERY = 6;

function Gallery({room}: GalleryProps): JSX.Element {
  const images = room.images.slice(0, QUANTITY_IMAGES_GALLERY);

  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.map((image) => (
          <div className="property__image-wrapper" key={image}>
            <img className="property__image" src={image} alt="Room" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
