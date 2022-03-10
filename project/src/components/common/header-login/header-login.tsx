import {Link} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../../../hooks/store';
import {logoutAction} from '../../../store/api-actions';
import {authSelector, userDataSelector} from '../../../store/selectors';
import {AppRoute, AuthorizationStatus} from '../../../const';

function HeaderLogin(): JSX.Element {
  const authorization = useAppSelector(authSelector);
  const isAuth = authorization === AuthorizationStatus.Auth;

  const userData = useAppSelector(userDataSelector);

  const dispatch = useAppDispatch();

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div
              className="header__avatar-wrapper user__avatar-wrapper"
              style={{
                'backgroundImage': `url(${isAuth ? userData.avatarUrl : '../img/avatar.svg'})`,
                'borderRadius': '50%'}}
            >
            </div>
            {isAuth
              ? <span className="header__user-name user__name">{userData.email}</span>
              : <span className="header__login">Sign in</span>}
          </Link>
        </li>
        {isAuth &&
        <li className="header__nav-item">
          <a className="header__nav-link"
            href='/'
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(logoutAction());
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
