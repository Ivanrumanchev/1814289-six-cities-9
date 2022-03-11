import {FormEvent, Fragment, useRef, useState} from 'react';
import {ReviewData} from '../../../types/review-data';
import {TextLength} from '../../../const';

const ratings = [
  'perfect',
  'good',
  'not bad',
  'badly',
  'terribly',
];

function NewReview(): JSX.Element {
  const [ratingState, setRatingState] = useState('');
  const [validationReviewState, setValidationReviewState] = useState(false);

  const reviewRef = useRef<HTMLTextAreaElement | null>(null);

  const ratingChangeHandle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRatingState(evt.target.value);
  };

  const reviewChangeHandle = () => {
    if (reviewRef.current !== null) {
      const reviewField = reviewRef.current;

      const valueLength = reviewField.value.length;

      if (valueLength < TextLength.newReviewMin) {
        reviewField.setCustomValidity(`Ещё ${  TextLength.newReviewMin - valueLength } симв.`);
      } else if (valueLength > TextLength.newReviewMax) {
        reviewField.setCustomValidity(`Удалите лишние ${  valueLength - TextLength.newReviewMax } симв.`);
      } else {
        reviewField.setCustomValidity('');
      }

      setValidationReviewState(reviewField.reportValidity());
    }
  };

  const onSubmit = (authData: ReviewData) => {
    // dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (reviewRef.current !== null) {
      onSubmit({
        comment: reviewRef.current.value,
        rating: +ratingState,
      });
    }
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratings.map((rating, index) => (
          <Fragment key={rating}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              id={`${Math.abs(index - ratings.length)}-stars`}
              type="radio"
              value={Math.abs(index - ratings.length)}
              onChange={ratingChangeHandle}
            />
            <label
              htmlFor={`${Math.abs(index - ratings.length)}-stars`}
              className="reviews__rating-label form__rating-label"
              title={rating}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={reviewChangeHandle}
        ref={reviewRef}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={ratingState.length === 0 || !validationReviewState}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default NewReview;
