import {Fragment, useState} from 'react';

const ratings = [
  'perfect',
  'good',
  'not bad',
  'badly',
  'terribly',
];

function NewReview(): JSX.Element {
  const [, setRatingState] = useState('');
  const [reviewState, setReviewState] = useState('');

  const ratingChangeHandle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setRatingState(evt.target.value);
  };

  const reviewChangeHandle = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewState(evt.target.value);
  };

  return (
    <form className="reviews__form form" action="#" method="post">
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
        value={reviewState}
        onChange={reviewChangeHandle}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

export default NewReview;
