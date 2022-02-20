import {AuthorizationStatus} from '../const';
import {NavigateFunction} from 'react-router-dom';

export const toSignInScreen = (auth : string, navigate: NavigateFunction) => auth === AuthorizationStatus.NoAuth ? navigate('/login') : '';
