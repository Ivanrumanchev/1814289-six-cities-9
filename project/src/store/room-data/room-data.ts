import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {errorServerHandle} from '../../services/error-handle';
import {api} from '../store';
import {RootState} from '../rootReducer';
import {redirectToRoute} from '../action';
import {OfferDTO} from '../../types/offer';
import {AppDispatch, RoomData} from '../../types/state';
import {APIRoute, AppRoute, NameSpace, ApiActions, LoadingStatus} from '../../const';

const initialState: RoomData = {
  loading: LoadingStatus.Idle,
  room: null,
  reviews: null,
  nearby: null,
  currentRequestId: '',
  error: null,
};

export const fetchRoomAction = createAsyncThunk<OfferDTO | unknown, number, {state: RootState, dispatch: AppDispatch}>(
  ApiActions.FetchRoom,
  async (id, {getState, requestId, dispatch}) => {
    const {currentRequestId, loading} = getState()[NameSpace.RoomData];

    if (loading !== LoadingStatus.Pending || requestId !== currentRequestId) {
      return;
    }

    try {
      const {data} = await api.get<OfferDTO>(`${APIRoute.Room}${id}`);

      return data as OfferDTO;
    } catch (error) {
      errorServerHandle(error);
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const roomData = createSlice({
  name: NameSpace.RoomData,
  initialState,
  reducers: {
    loadReviews: (state, action) => {
      state.reviews = action.payload;
    },
    loadNearby: (state, action) => {
      state.nearby = action.payload;
    },
    clearReviews: (state) => {
      state.reviews = null;
    },
    clearNearby: (state) => {
      state.nearby = null;
    },
    clearRoom: (state) => {
      state.room = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomAction.pending, (state, action) => {
        if (state.loading === LoadingStatus.Idle) {
          state.loading = LoadingStatus.Pending;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchRoomAction.fulfilled, (state, action) => {
        const {requestId} = action.meta;
        if (
          state.loading === LoadingStatus.Pending &&
          state.currentRequestId === requestId
        ) {
          state.loading = LoadingStatus.Idle;
          state.room = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(fetchRoomAction.rejected, (state, action) => {
        const {requestId} = action.meta;
        if (
          state.loading === LoadingStatus.Pending &&
          state.currentRequestId === requestId
        ) {
          state.loading = LoadingStatus.Idle;
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      });
  },
});

export const {clearRoom, loadReviews, clearReviews, loadNearby, clearNearby} = roomData.actions;
