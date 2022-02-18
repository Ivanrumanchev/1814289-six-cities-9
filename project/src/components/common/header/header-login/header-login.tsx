import {useContext} from 'react';
import {AuthContext} from '../../../app/app';
import {AuthorizationStatus} from '../../../../const';

function SignOut(): JSX.Element {
  return (
    <li className="header__nav-item">
      <a className="header__nav-link" href="/">
        <span className="header__signout">Sign out</span>
      </a>
    </li>
  );
}

function HeaderLogin(): JSX.Element {
  const auth = useContext(AuthContext);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <a className="header__nav-link header__nav-link--profile" href="/">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            {auth === AuthorizationStatus.Auth
              ? <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
              : <span className="header__login">Sign in</span>}
          </a>
        </li>
        {auth === AuthorizationStatus.Auth ? <SignOut /> : ''}
      </ul>
    </nav>
  );
}

export default HeaderLogin;
