import React from 'react';
import {StatusBar} from 'react-native';
import Router from './router';
import {Provider} from 'react-redux';
import {store} from './redux/store';
const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <Router />
      </Provider>
    </>
  );
};

export default App;
