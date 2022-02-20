import {useContext} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {AppRoute} from '../../../../const';
import {AuthContext} from '../../../app/app';
import {AuthorizationStatus} from '../../../../const';

function HeaderLogin(): JSX.Element {
  const auth = useContext(AuthContext);
  const location = useLocation();

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            {auth === AuthorizationStatus.Auth
              ? <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
              : <span className="header__login">Sign in</span>}
          </Link>
        </li>
        {auth === AuthorizationStatus.Auth &&
        <li className="header__nav-item">
          <Link className="header__nav-link" to={location.pathname === '/favorites' ? AppRoute.Root : location.pathname}>
            <span className="header__signout">Sign out</span>
          </Link>
        </li>}
      </ul>
    </nav>
  );
}

export default HeaderLogin;
