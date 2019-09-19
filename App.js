/* eslint-disable global-require */
import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import Root from '@/Root';

const loadAssets = async () =>
  // These are the assets needed for the splash screen. The rest of our assets
  // are loaded while the splash screen is displayed.
  Promise.all([
    Asset.fromModule(require('@assets/images/bg/bg_plain.jpg')).downloadAsync(),
    Asset.fromModule(require('@assets/images/logo.png')).downloadAsync(),
  ]);

const App = () => {
  const [loaded, setLoaded] = useState(false);
  // eslint-disable-next-line react/destructuring-assignment
  if (!loaded) {
    return <AppLoading startAsync={loadAssets} onFinish={() => setLoaded(true)} />;
  }
  return <Root />;
};

export default App;
