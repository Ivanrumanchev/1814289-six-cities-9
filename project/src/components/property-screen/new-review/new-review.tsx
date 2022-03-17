import {ChangeEvent, Fragment, useState} from 'react';
import {postNewReviewAction} from '../../../store/api-actions';
import {loadReviews} from '../../../store/room-data/room-data';
import {useAppDispatch} from '../../../hooks/store';
import {ApiActions, TextLength} from '../../../const';
import {errorHandle} from '../../../services/error-handle';

const ERROR_MESSAGE = 'Невозможно отправить отзыв. Попробуйте позднее';

const ratings = [
  'perfect',
  'good',
  'not bad',
  'badly',
  'terribly',
];

function NewReview(): JSX.Element {
  const [ratingState, setRatingState] = useState('');
  const [reviewState, setReviewState] = useState('');
  const [validationReviewState, setValidationReviewState] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const ratingChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    setRatingState(evt.target.value);
  };

  const reviewChangeHandle = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const reviewField = evt.target;

    setReviewState(reviewField.value);

    const valueLength = reviewField.value.length;

    if (valueLength < TextLength.NewReviewMin) {
      reviewField.setCustomValidity(`Ещё ${  TextLength.NewReviewMin - valueLength } симв.`);
    } else if (valueLength > TextLength.NewReviewMax) {
      reviewField.setCustomValidity(`Удалите лишние ${  valueLength - TextLength.NewReviewMax } симв.`);
    } else {
      reviewField.setCustomValidity('');
    }

    setValidationReviewState(reviewField.reportValidity());
  };

  const resetForm = () => {
    setRatingState('');
    setReviewState('');

    setValidationReviewState(false);
    setLoading(false);
  };

  const handleSubmit = async (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setLoading(true);

    try {
      const newReviewsList = await dispatch(postNewReviewAction({
        comment: reviewState,
        rating: +ratingState,
      }));

      if (newReviewsList.type === `${ApiActions.postNewReview}/rejected`) {
        errorHandle(ERROR_MESSAGE);
        throw new Error(ERROR_MESSAGE);
      }

      dispatch(loadReviews(newReviewsList.payload));

      resetForm();
    } catch (error) {
      setLoading(false);
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
        {ratings.map((rating, index) => {
          const ratingValue = Math.abs(index - ratings.length);

          return (
            <Fragment key={rating}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                id={`${ratingValue}-stars`}
                type="radio"
                value={ratingValue}
                checked={ratingState === ratingValue.toString()}
                onChange={ratingChangeHandle}
                disabled={loading}
              />
              <label
                htmlFor={`${ratingValue}-stars`}
                className="reviews__rating-label form__rating-label"
                title={rating}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          );
        })}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={reviewChangeHandle}
        value={reviewState}
        disabled={loading}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={ratingState.length === 0 || !validationReviewState || loading}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default NewReview;
