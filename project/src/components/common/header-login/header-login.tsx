import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../../const';
import {useAppSelector, useAppDispatch} from '../../../hooks/store';
import {noAuth} from '../../../store/action';

function HeaderLogin(): JSX.Element {
  const authorization = useAppSelector((state) => state.auth);
  const isAuth = authorization === AuthorizationStatus.Auth;

  const dispatch = useAppDispatch();

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            {isAuth
              ? <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
              : <span className="header__login">Sign in</span>}
          </Link>
        </li>
        {isAuth &&
        <li className="header__nav-item">
          <a className="header__nav-link"
            href='/'
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(noAuth());
            }}
          >
            <span className="header__signout">Sign out</span>
          </a>
        </li>}
      </ul>
    </nav>
  );
}

export default HeaderLogin;
