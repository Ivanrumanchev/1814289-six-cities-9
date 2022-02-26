import {ReviewDTO} from '../../../types/review';
import {getFormattedAttrDate, getFormattedDate, getRatingRate} from '../../../utils/common';

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
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: getRatingRate(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <p className="reviews__text">
          {comment}
        </p>

        <time className="reviews__time" dateTime={getFormattedAttrDate(date)}>{getFormattedDate(date)}</time>
      </div>
    </li>
  );
}

export default ReviewItem;
