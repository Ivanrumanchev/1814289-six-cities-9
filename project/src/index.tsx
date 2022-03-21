import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/app/app';
import {store} from './store/store';
import {checkAuthAction} from './store/api-actions';
import {fetchOffersAction} from './store/offers-data/offers-data';
import {fetchFavoritesAction} from './store/favorites-data/favorites-data';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());
store.dispatch(fetchFavoritesAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
