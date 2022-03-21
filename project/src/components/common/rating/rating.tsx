import {memo} from 'react';
import {getRatingRate} from '../../../utils/common';
import {RatingType} from '../../../const';

type RatingProps = {
  ratingType: string;
  rating: number;
};

function Rating({rating, ratingType}: RatingProps): JSX.Element {
  return (
    <div className={`${ratingType}__rating rating`}>
      <div className={`${ratingType}__stars rating__stars`}>
        <span style={{width: getRatingRate(rating)}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {ratingType === RatingType.Property && <span className="property__rating-value rating__value">{rating}</span>}
    </div>
  );
}

export default memo(Rating);
