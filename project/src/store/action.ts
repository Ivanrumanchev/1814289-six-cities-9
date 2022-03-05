import {createAction} from '@reduxjs/toolkit';
import {FilterType} from '../const';

export const activeCity = createAction('main/activeCity', (value: FilterType) => ({payload: value}));

export const auth = createAction('global/auth');
export const noAuth = createAction('global/noAuth');
