import {createAction} from '@reduxjs/toolkit';

export const paris = createAction('main/paris');
export const cologne = createAction('main/cologne');
export const brussels = createAction('main/brussels');
export const amsterdam = createAction('main/amsterdam');
export const hamburg = createAction('main/hamburg');
export const dusseldorf = createAction('main/dusseldorf');

export const auth = createAction('global/auth');
export const noAuth = createAction('global/noAuth');
