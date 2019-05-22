import React from 'react';
import {
  View,
  SafeAreaView,
  Animated,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

import { Label } from '@/components';
import { hideToast } from '@/system/systemReducer';

const actionsOnHide = [];
const onNextToastHide = action => actionsOnHide.push(action);

const toastHeight = 60;
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0;
const toastWrapperHeight = toastHeight + statusBarHeight;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  screenContentWrapper: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  toastWrapper: {
    backgroundColor: 'blue',
    paddingTop: statusBarHeight,
    paddingHorizontal: 8,
    position: 'absolute',
    height: toastHeight,
    width: '100%',
    top: -(toastHeight + statusBarHeight),
  },
  toast: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

class Toast extends React.Component {
  state = { shown: false };

  top = new Animated.Value(-toastWrapperHeight);

  render() {
    const { showToast, toastMessage, dispatch } = this.props;
    const { shown } = this.state;

    if (showToast && !shown) {
      this.animateIn();
    }

    if (!showToast && shown) {
      this.animateOut();
    }

    if (showToast || shown) {
      return (
        <Animated.View style={[styles.toastWrapper, { top: this.top }]}>
          <TouchableOpacity onPress={() => hideToast(dispatch)}>
            <SafeAreaView style={styles.toast}>
              <Label>{toastMessage}</Label>
            </SafeAreaView>
          </TouchableOpacity>
        </Animated.View>
      );
    }

    return null;
  }

  animateIn = () =>
    Animated.timing(this.top, {
      toValue: 0,
      duration: 500,
    }).start(() => this.setState({ shown: true }));

  animateOut = () => {
    Animated.timing(this.top, {
      toValue: -toastWrapperHeight,
      duration: 500,
    }).start(() => this.setState({ shown: false }));
    actionsOnHide.forEach(action => {
      try {
        action();
      } catch (_) {
        // Do nothing
      }
    });
  };
}

const mapStateToProps = state => ({
  ...state.system,
});

const ConnectedToast = connect(mapStateToProps)(Toast);

const ToastableScreen = ({ children }) => (
  <View style={[styles.fullScreen]}>
    <View style={styles.screenContentWrapper}>{children}</View>
    <ConnectedToast />
  </View>
);

export default ToastableScreen;

export { onNextToastHide };
