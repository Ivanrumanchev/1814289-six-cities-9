import browserHistory from '../../services/browser-history';
import {Middleware} from 'redux';
import {rootReducer} from '../rootReducer';
import {REDIRECT_TO_ROUTE} from '../action';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer>=
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === REDIRECT_TO_ROUTE) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
