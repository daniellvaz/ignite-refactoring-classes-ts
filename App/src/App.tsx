import React from 'react';
import { StatusBar } from 'react-native'
import Home from './screens/Home';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#14141b" />
      <Home />
    </>
  );
};

export default App;
