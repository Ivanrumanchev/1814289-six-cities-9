import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';
import {api} from '../store';
import {errorServerHandle} from '../../services/error-handle';
import {APIRoute, NameSpace, ApiActions, LoadingStatus} from '../../const';
import {OfferDTO} from '../../types/offer';
import {OffersData} from '../../types/state';

const initialState: Omit<OffersData, 'city'> = {
  loading: LoadingStatus.Idle,
  offers: [],
  currentRequestId: '',
  error: null,
};

export const fetchFavoritesAction = createAsyncThunk<
    OfferDTO[],
    void,
    {
      state: RootState,
      rejectValue: undefined,
    }
  >(ApiActions.fetchFavorites, async (_,{getState, requestId, rejectWithValue}) => {
    const {currentRequestId, loading} = getState()[NameSpace.FavoriteData];

    if (loading !== LoadingStatus.Pending || requestId !== currentRequestId) {
      return rejectWithValue(undefined);
    }

    try {
      const {data} = await api.get<OfferDTO[]>(APIRoute.Favorite);

      return data;
    } catch (error) {
      errorServerHandle(error);

      return rejectWithValue(undefined);
    }
  });

export const FavoritesData = createSlice({
  name: NameSpace.FavoriteData,
  initialState,
  reducers: {
    updateFavorites: (state, action) => {
      if (state.offers) {
        const index = state.offers.findIndex((offer) => offer.id === action.payload.id);

        index !== -1
          ? state.offers.splice(index, 1)
          : state.offers.push(action.payload);
      }
    },
    clearFavorites: (state) => {
      state.offers = initialState.offers;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesAction.pending, (state, action) => {
        if (state.loading === LoadingStatus.Idle) {
          state.loading = LoadingStatus.Pending;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
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
      .addCase(fetchFavoritesAction.rejected, (state, action) => {
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

export const {updateFavorites, clearFavorites} = FavoritesData.actions;
