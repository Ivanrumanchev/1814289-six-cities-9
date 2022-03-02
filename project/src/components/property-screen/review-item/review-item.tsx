import Rating from '../../common/rating/rating';
import {ReviewDTO} from '../../../types/review';
import {RatingType} from '../../../const';
import {getFormattedAttrDate, getFormattedDate} from '../../../utils/common';

type ReviewProps = {
  review: ReviewDTO;
}

function ReviewItem({review}: ReviewProps): JSX.Element {
  const {user, rating, comment, date} = review;
  const {name, avatarUrl} = user;

  return (
    <li className="reviews__item" key={review.id}>
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>

        <span className="reviews__user-name">{name}</span>
      </div>

      <div className="reviews__info">
        <Rating
          rating={rating}
          ratingType={RatingType.Reviews}
        />

        <p className="reviews__text">
          {comment}
        </p>

        <time className="reviews__time" dateTime={getFormattedAttrDate(date)}>{getFormattedDate(date)}</time>
      </div>
    </li>
  );
}

export default ReviewItem;
