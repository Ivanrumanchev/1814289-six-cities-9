import Header from '../components/common/header/header';
import LoginForm from '../components/login-screen/login-form/login-form';
import LoginLocation from '../components/login-screen/login-location/login-location';

function LoginScreen(): JSX.Element {
  return (
    <div className="page page--gray page--login">
      <Header isLogin />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm />

          <LoginLocation />
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
