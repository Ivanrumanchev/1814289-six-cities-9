import {createAction} from '@reduxjs/toolkit';
import {FilterType} from '../const';

export const activeCity = createAction<{activeCity: FilterType}>('main/activeCity');

export const auth = createAction('global/auth');
export const noAuth = createAction('global/noAuth');
