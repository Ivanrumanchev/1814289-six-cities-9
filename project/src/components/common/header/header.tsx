import HeaderLogo from './header-logo/header-logo';
import HeaderLogin from './header-login/header-login';

type HeaderProps = {
  login: boolean;
}

Header.defaultProps = {
  login: false,
};

function Header({login}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogo />
          {login ? '' : <HeaderLogin />}
        </div>
      </div>
    </header>
  );
}

export default Header;
