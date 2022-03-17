import {ChangeEvent, FormEvent, Fragment, useState} from 'react';
import {postNewReviewAction} from '../../../store/api-actions';
import {loadReviews} from '../../../store/room-data/room-data';
import {useAppDispatch} from '../../../hooks/store';
import {ApiActions, TextLength} from '../../../const';
import './new-review.css';

const SHAKE_ANIMATION_TIMEOUT = 600;

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

  const resetForm = (form: HTMLFormElement) => {
    form.reset();

    setRatingState('');
    setReviewState('');

    setValidationReviewState(false);
    setLoading(false);
  };

  const showError = (form: HTMLFormElement) => {
    form.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT/1000}s`;

    setTimeout(() => {
      form.style.animation = '';

      setLoading(false);
    }, SHAKE_ANIMATION_TIMEOUT);
  };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setLoading(true);

    try {
      const newReviewsList = await dispatch(postNewReviewAction({
        comment: reviewState,
        rating: +ratingState,
      }));

      if (newReviewsList.type === `${ApiActions.postNewReview}/rejected`) {
        throw new Error('Невозможно отправить отзыв. Попробуйте позднее');
      }

      dispatch(loadReviews(newReviewsList.payload));

      resetForm(evt.target as HTMLFormElement);
    } catch (error) {
      showError(evt.target as HTMLFormElement);
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
              onInput={ratingChangeHandle}
              disabled={loading}
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
