import {Navigate} from 'react-router-dom';
import {RouteProps} from 'react-router-dom';
import {useAppSelector} from '../../hooks/store';
import {authSelector} from '../../store/selectors';
import {AppRoute, AuthorizationStatus} from '../../const';

type PrivateRouteProps = RouteProps & {
  targetRoute: AppRoute;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children, targetRoute} = props;

  const authorization = useAppSelector(authSelector);
  const isAuth = authorization === AuthorizationStatus.Auth;

  switch (targetRoute) {
    case AppRoute.Login: return (
      isAuth
        ? children
        : <Navigate to={targetRoute} />
    );
    case AppRoute.Root: return (
      isAuth
        ? <Navigate to={targetRoute} />
        : children
    );
    default: return children;
  }
}

export default PrivateRoute;
