import {memo} from 'react';

type GalleryProps = {
  roomImages: string[];
}

const QUANTITY_IMAGES_GALLERY = 6;

function Gallery({roomImages}: GalleryProps): JSX.Element {
  const images = roomImages.slice(0, QUANTITY_IMAGES_GALLERY);

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

export default memo(Gallery);
