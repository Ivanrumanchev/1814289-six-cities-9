import HeaderLogo from './header-logo/header-logo';
import HeaderLogin from './header-login/header-login';

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogo />
          <HeaderLogin />
        </div>
      </div>
    </header>
  );
}

export default Header;
