import browserHistory from '../../services/browser-history';
import {Middleware} from 'redux';
import {reducer} from '../reducer';
import {Actions} from '../action';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer>=
  (_store) =>
    (next) =>
      (action) => {
        if (action.type === Actions.RedirectToRoute) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
