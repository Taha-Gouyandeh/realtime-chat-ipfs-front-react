import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux-config/store';
import { RouterPage } from './Router/index';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';
import './i18n';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <RouterPage />
    </Provider>
  );
}

export default App;
