import Logo from '../../common/logo/logo';
import HeaderLogin from './header-login/header-login';

type HeaderProps = {
  isLogin?: boolean;
}

function Header({isLogin = false} : HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo isHeader />
          </div>
          {!isLogin && <HeaderLogin />}
        </div>
      </div>
    </header>
  );
}

export default Header;
