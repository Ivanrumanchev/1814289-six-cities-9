import NewReview from '../new-review/new-review';
import ReviewItem from '../review-item/review-item';
import {useAppSelector} from '../../../hooks/store';
import {authSelector} from '../../../store/selectors';
import {ReviewDTO} from '../../../types/review';
import {AuthorizationStatus} from '../../../const';

type ReviewsListProps = {
  reviews: ReviewDTO[];
}

const QUANTITY_REVIEWS = 10;

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  const authorization = useAppSelector(authSelector);

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>

      <ul className="reviews__list">
        {reviews.slice(0, QUANTITY_REVIEWS).map((review) => (
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
