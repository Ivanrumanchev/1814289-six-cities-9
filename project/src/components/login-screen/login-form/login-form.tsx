import {useRef, FormEvent} from 'react';
import {useAppDispatch} from '../../../hooks/store';
import {loginAction} from '../../../store/api-actions';
import {AuthData} from '../../../types/auth-data';
import {TextLength} from '../../../const';

enum ErrorMessage {
  Email = 'Введите корректный email, соответствующий шаблону Example@mail.ru',
  Password = 'Пароль должен содержать как минимум одну латинскую букву и одну цифру, а также не должен содержать пробелов',
}

function LoginForm(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  const handleEmailChange = () => {
    if (emailRef.current !== null) {
      const emailField = emailRef.current;

      const result = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailField.value);

      result === false
        ? emailField.setCustomValidity(ErrorMessage.Email)
        : emailField.setCustomValidity('');
    }
  };

  const handlePasswordChange = () => {
    if (passwordRef.current !== null) {
      const passwordField = passwordRef.current;

      const containNumber = /\d/g.test(passwordField.value);
      const containString = /[a-z]/gi.test(passwordField.value);
      const containSpace = /[\s]/gi.test(passwordField.value);

      const result = containNumber && containString && !containSpace;

      result === false
        ? passwordField.setCustomValidity(ErrorMessage.Password)
        : passwordField.setCustomValidity('');
    }
  };

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>

      <form
        className="login__form form"
        action="#"
        onSubmit={handleSubmit}
      >
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>

          <input
            className="login__input form__input"
            type="email"
            name="email"
            placeholder="Email"
            maxLength={TextLength.loginMax}
            required
            ref={emailRef}
            onChange={handleEmailChange}
          />
        </div>

        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">Password</label>

          <input
            className="login__input form__input"
            type="password"
            name="password"
            placeholder="Password"
            required
            maxLength={TextLength.loginMax}
            ref={passwordRef}
            onChange={handlePasswordChange}
          />
        </div>

        <button
          className="login__submit form__submit button"
          type="submit"
        >
          Sign in
        </button>
      </form>
    </section>
  );
}

export default LoginForm;
