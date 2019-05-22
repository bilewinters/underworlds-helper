/* eslint-disable global-require */
import React from 'react';
import { AppLoading, Asset } from 'expo';
import Root from '@/Root';

const loadAssets = async () =>
  // These are the assets needed for the splash screen. The rest of our assets
  // are loaded while the spash screen is displayed.
  Promise.all([
    Asset.fromModule(require('@assets/images/bg_glass.jpg')).downloadAsync(),
    Asset.fromModule(require('@assets/images/logo.png')).downloadAsync(),
  ]);

export default class App extends React.Component {
  state = { loaded: false };

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    if (!this.state.loaded) {
      return (
        <AppLoading startAsync={loadAssets} onFinish={() => this.setState({ loaded: true })} />
      );
    }
    return <Root />;
  }
}
