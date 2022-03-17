import {useEffect, useState} from 'react';
import NewReview from '../new-review/new-review';
import ReviewItem from '../review-item/review-item';
import LoadingScreen from '../../loading-screen/loading-screen';
import {authSelector, reviewsSelector} from '../../../store/selectors';
import {clearReviews} from '../../../store/room-data/room-data';
import {fetchReviewsAction} from '../../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../../hooks/store';
import {sortReviewsByPrice} from '../../../utils/common';
import {AuthorizationStatus} from '../../../const';

type ReviewsListProps = {
  offerId: number;
}

const QUANTITY_REVIEWS = 10;

function ReviewsList({offerId}: ReviewsListProps): JSX.Element {
  const [loading, setLoading] = useState(false);
  const authorization = useAppSelector(authSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);

    dispatch(fetchReviewsAction(offerId)).then(() => setLoading(false));

    return () => {
      dispatch(clearReviews());
    };
  },[dispatch, offerId]);

  const reviews = useAppSelector(reviewsSelector);

  if (loading) {
    return (
      <LoadingScreen />
    );
  } else if (!reviews) {
    return (
      <h2 className="reviews__title">Отзывы не загрузились. Попробуйте перезагрузить страницу</h2>
    );
  }

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>

      <ul className="reviews__list">
        {reviews.slice().sort(sortReviewsByPrice).slice(0, QUANTITY_REVIEWS).map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
          />
        ))}
      </ul>

      {authorization === AuthorizationStatus.Auth && <NewReview />}
    </section>
  );
}

export default ReviewsList;
