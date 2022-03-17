import {ChangeEvent, FormEvent, useState} from 'react';
import {loginAction} from '../../../store/api-actions';
import {useAppDispatch} from '../../../hooks/store';
import {TextLength} from '../../../const';
import {AuthData} from '../../../types/auth-data';

enum ErrorMessage {
  Email = 'Введите корректный email, соответствующий шаблону Example@mail.ru',
  Password = 'Пароль должен содержать как минимум одну латинскую букву и одну цифру, а также не должен содержать пробелов',
}

function LoginForm(): JSX.Element {
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');

  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    onSubmit({
      email: emailState,
      password: passwordState,
    });
  };

  const handleEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const emailField = evt.target;

    setEmailState(emailField.value);

    const result = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(emailField.value);

    result === false
      ? emailField.setCustomValidity(ErrorMessage.Email)
      : emailField.setCustomValidity('');
  };

  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const passwordField = evt.target;

    setPasswordState(passwordField.value);

    const result = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{2,}$/.test(passwordField.value);

    result === false
      ? passwordField.setCustomValidity(ErrorMessage.Password)
      : passwordField.setCustomValidity('');
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
            required
            maxLength={TextLength.LoginMax}
            value={emailState}
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
            maxLength={TextLength.LoginMax}
            value={passwordState}
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
