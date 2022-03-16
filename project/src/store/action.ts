import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../const';

export const REDIRECT_TO_ROUTE = 'global/redirectToRoute';

export const redirectToRoute = createAction<AppRoute>(REDIRECT_TO_ROUTE);
