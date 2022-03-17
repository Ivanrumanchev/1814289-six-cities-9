import {combineReducers} from '@reduxjs/toolkit';
import {offersData} from './offers-data/offers-data';
import {roomData} from './room-data/room-data';
import {userProcess} from './user-process/user-process';
import {NameSpace} from '../const';

export const rootReducer = combineReducers({
  [NameSpace.OffersData]: offersData.reducer,
  [NameSpace.RoomData]: roomData.reducer,
  [NameSpace.User]: userProcess.reducer,
});

export type RootState = ReturnType<typeof rootReducer>
