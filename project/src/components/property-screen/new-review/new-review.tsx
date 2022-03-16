import {FormEvent, Fragment, useRef, useState} from 'react';
import {useAppDispatch} from '../../../hooks/store';
import {postNewReviewAction} from '../../../store/api-actions';
import {loadReviews} from '../../../store/room-data/room-data';
import {errorHandle} from '../../../services/error-handle';
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
  const [validationReviewState, setValidationReviewState] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const reviewRef = useRef<HTMLTextAreaElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const ratingChangeHandle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRatingState(evt.target.value);
  };

  const reviewChangeHandle = () => {
    if (reviewRef.current !== null) {
      const reviewField = reviewRef.current;

      const valueLength = reviewField.value.length;

      if (valueLength < TextLength.NewReviewMin) {
        reviewField.setCustomValidity(`Ещё ${  TextLength.NewReviewMin - valueLength } симв.`);
      } else if (valueLength > TextLength.NewReviewMax) {
        reviewField.setCustomValidity(`Удалите лишние ${  valueLength - TextLength.NewReviewMax } симв.`);
      } else {
        reviewField.setCustomValidity('');
      }

      setValidationReviewState(reviewField.reportValidity());
    }
  };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (reviewRef.current !== null && formRef.current !== null) {
      setLoading(true);

      try {
        const newReviewsList = await dispatch(postNewReviewAction({
          comment: reviewRef.current.value,
          rating: +ratingState,
        }));

        if (newReviewsList.type === `${ApiActions.postNewReview}/rejected`) {
          throw new Error('Невозможно отправить отзыв. Попробуйте позднее');
        }

        dispatch(loadReviews(newReviewsList.payload));

        formRef.current.reset();
        setRatingState('');
        setValidationReviewState(false);

        setLoading(false);
      } catch (error) {
        errorHandle(error as string);
        reviewRef.current.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT/1000}s`;

        setTimeout(() => {
          if (reviewRef.current !== null) {
            reviewRef.current.style.animation = '';
          }

          setLoading(false);
        }, SHAKE_ANIMATION_TIMEOUT);
      }
    }
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
      ref={formRef}
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
        ref={reviewRef}
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
