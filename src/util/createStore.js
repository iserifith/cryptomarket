import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from '../reducers';

const persistConfig = {
  timeout: 0,
  key: '_cmc',
  storage: AsyncStorage,
  whitelist: ['cryptocurrencies'],
};

const middleware = [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(compose(applyMiddleware(...middleware))),
  );

  const persistor = persistStore(store);
  return { store, persistor };
};
