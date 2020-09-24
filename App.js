import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux'
import configureStore from './redux/store'
const store = configureStore()
export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
      </Provider>
  );
}

