import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { fetchFavoriteOffers, fetchOffers, fetchUserStatus } from './store/action';
import App from './components/app/app';
import store from './store';

store.dispatch(fetchUserStatus());
store.dispatch(fetchOffers());
store.dispatch(fetchFavoriteOffers());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
);
