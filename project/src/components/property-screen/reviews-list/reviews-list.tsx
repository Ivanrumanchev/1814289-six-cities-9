import {useEffect} from 'react';
import NewReview from '../new-review/new-review';
import ReviewItem from '../review-item/review-item';
import LoadingScreen from '../../loading-screen/loading-screen';
import {useAppDispatch, useAppSelector} from '../../../hooks/store';
import {authSelector, reviewsSelector} from '../../../store/selectors';
import {clearReviews} from '../../../store/room-data/room-data';
import {fetchReviewsAction} from '../../../store/api-actions';
import {AuthorizationStatus} from '../../../const';
import {sortReviewsByPrice} from '../../../utils/common';

type ReviewsListProps = {
  offerId: number;
}

const QUANTITY_REVIEWS = 10;

function ReviewsList({offerId}: ReviewsListProps): JSX.Element {
  const authorization = useAppSelector(authSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReviewsAction(offerId));

    return () => {
      dispatch(clearReviews());
    };
  },[dispatch, offerId]);

  const reviews = useAppSelector(reviewsSelector);

  if (!reviews) {
    return (
      <LoadingScreen />
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
