/* eslint-disable global-require */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Asset, Constants, Font, Updates } from 'expo';

import { BackgroundGlass, Logo } from '@/components';
import { onNextToastHide } from '@/system/Toast';
import { showToast } from '@/system/systemReducer';
import store from '@/store';
import designTokens from '@design/tokens';
import buildInfo from '../../buildInfo.json';

const shouldUpdate = () => Constants.manifest.releaseChannel === 'alpha';

let updatesCheckPerformed = false;
const checkForUpdates = async () => {
  if (!updatesCheckPerformed) {
    updatesCheckPerformed = true;
    if (shouldUpdate()) {
      const { dispatch } = store;
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          onNextToastHide(() => Updates.reloadFromCache());
          showToast('Got an update, tap or restart to apply.', dispatch);
        }
      } catch (e) {
        // onNextToastHide(() => Updates.reloadFromCache());
        showToast(`${e}`, dispatch);
      }
    }
  }
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
  },
  version: {
    color: designTokens.text.primaryColor,
  },
});

const loadAssets = async () =>
  Promise.all([
    Font.loadAsync({
      'sava-pro-semibold': require('@assets/fonts/SavaPro-Semibold.otf'),
    }),
    Asset.fromModule(require('@assets/images/bg_plain.jpg')).downloadAsync(),
  ]);

class Splash extends React.Component {
  async componentDidMount() {
    await Promise.all([loadAssets(), new Promise(r => setTimeout(r, 1000))]);
    checkForUpdates();
    Actions.menu();
  }

  render() {
    return (
      <BackgroundGlass>
        <View style={styles.centered}>
          <Logo style={styles.logo} resizeMode="contain" />
          <Text style={styles.version}>
            {`${Constants.manifest.version} - ${buildInfo.buildNumber}`}
          </Text>
        </View>
      </BackgroundGlass>
    );
  }
}

export default connect()(Splash);
