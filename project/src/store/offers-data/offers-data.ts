import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';
import {api} from '../store';
import {errorServerHandle} from '../../services/error-handle';
import {APIRoute, City, NameSpace, ApiActions, LoadingStatus} from '../../const';
import {OfferDTO} from '../../types/offer';
import {OffersData} from '../../types/state';

const initialState: OffersData = {
  loading: LoadingStatus.Idle,
  offers: [],
  currentRequestId: '',
  error: null,
  city: City.Paris,
};

export const fetchOffersAction = createAsyncThunk<
    OfferDTO[],
    void,
    {
      state: RootState,
      rejectValue: undefined,
    }
  >(ApiActions.FetchOffers, async (_,{getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading} = getState()[NameSpace.OffersData];

    if (loading !== LoadingStatus.Pending || requestId !== currentRequestId) {
      return rejectWithValue(undefined);
    }

    try {
      const {data} = await api.get<OfferDTO[]>(APIRoute.Offers);

      return data;
    } catch (error) {
      errorServerHandle(error);

      return rejectWithValue(undefined);
    }
  });

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
