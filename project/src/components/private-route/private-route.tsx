import {Navigate} from 'react-router-dom';
import {RouteProps} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppSelector} from '../../hooks/store';

type PrivateRouteProps = RouteProps & {
  targetRoute: AppRoute;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children, targetRoute} = props;

  const authorization = useAppSelector((state) => state.auth);

  switch (targetRoute) {
    case AppRoute.Login: return (
      authorization === AuthorizationStatus.Auth
        ? children
        : <Navigate to={targetRoute} />
    );
    case AppRoute.Root: return (
      authorization === AuthorizationStatus.NoAuth
        ? children
        : <Navigate to={targetRoute} />
    );
    default: return children;
  }
}

export default PrivateRoute;
