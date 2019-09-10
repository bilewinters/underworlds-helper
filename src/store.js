import { AsyncStorage } from 'react-native';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '@/rootReducer';

const STATE_KEY = 'UWH_STORE';

let store;

const persistingReducer = (previousState, action) => {
  const newState = rootReducer(previousState, action);
  AsyncStorage.setItem(STATE_KEY, JSON.stringify(newState));
  return newState;
};

export const initialiseStore = async () => {
  let storedState = {};
  try {
    const keys = await AsyncStorage.getAllKeys();
    if (keys.includes(STATE_KEY)) {
      storedState = JSON.parse(await AsyncStorage.getItem(STATE_KEY));
    }
  } catch (error) {
    console.warn(error);
  }
  store = createStore(persistingReducer, storedState, compose(applyMiddleware(thunk)));
};

export const getStore = () => store;
