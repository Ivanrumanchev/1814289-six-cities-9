import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {errorServerHandle} from '../../services/error-handle';
import {api} from '../store';
import {OfferDTO} from '../../types/offer';
import {OffersData} from '../../types/state';
import {RootState} from '../rootReducer';
import {APIRoute, FilterType, NameSpace, ApiActions, LoadingStatus} from '../../const';

const initialState: OffersData = {
  loading: LoadingStatus.Idle,
  offers: [],
  currentRequestId: '',
  error: null,
  city: FilterType.Paris,
};

export const fetchOffersAction = createAsyncThunk<OfferDTO | unknown, void, {state: RootState}>(
  ApiActions.FetchOffers,
  async (_,{getState, requestId}) => {
    const {currentRequestId, loading} = getState()[NameSpace.OffersData];

    if (loading !== LoadingStatus.Pending || requestId !== currentRequestId) {
      return;
    }

    try {
      const {data} = await api.get<OfferDTO[]>(APIRoute.Offers);

      return data as OfferDTO[];
    } catch (error) {
      errorServerHandle(error);
    }
  },
);

export const offersData = createSlice({
  name: NameSpace.OffersData,
  initialState,
  reducers: {
    activeCity: (state, action) => {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state, action) => {
        if (state.loading === LoadingStatus.Idle) {
          state.loading = LoadingStatus.Pending;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        const {requestId} = action.meta;
        if (
          state.loading === LoadingStatus.Pending &&
          state.currentRequestId === requestId
        ) {
          state.loading = LoadingStatus.Idle;
          state.offers = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(fetchOffersAction.rejected, (state, action) => {
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

export const {activeCity} = offersData.actions;
