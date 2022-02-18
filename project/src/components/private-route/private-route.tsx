import {Navigate} from 'react-router-dom';
import {RouteProps} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

type PrivateRouteProps = RouteProps & {
  authorizationStatus: AuthorizationStatus;
  targetRoute: AppRoute;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children, targetRoute} = props;

  switch (targetRoute) {
    case AppRoute.Login: return (
      authorizationStatus === AuthorizationStatus.Auth
        ? children
        : <Navigate to={targetRoute} />
    );
    case AppRoute.Root: return (
      authorizationStatus === AuthorizationStatus.NoAuth
        ? children
        : <Navigate to={targetRoute} />
    );
    default: return children;
  }
}

export default PrivateRoute;
