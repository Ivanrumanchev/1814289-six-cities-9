import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import App from './components/app/app';
import {offers} from './mocks/offers';
import {store} from './store/store';
import {checkAuthAction} from './store/api-actions';
import {fetchOffersAction} from './store/offers-data/offers-data';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App
        offers={offers}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
