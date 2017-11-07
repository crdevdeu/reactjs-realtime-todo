import React from 'react';
import ReduxThunk from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

import reducers from './reducers';
import MainPage from './components/MainPage';

import '../styles/main.scss';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

const App = () => (
  <MainPage />
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
