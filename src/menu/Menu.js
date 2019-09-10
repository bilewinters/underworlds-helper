/* eslint-disable react-native/no-raw-text */
import React from 'react';
import { BackHandler, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { BackgroundGlass, Heading } from '@/components';
import { initialiseGame, continueGame } from '@/game/gameReducer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Menu extends React.Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (Actions.currentScene === 'menu') {
        BackHandler.exitApp();
        return true;
      }
      return false;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const { dispatch, currentGameId } = this.props;
    return (
      <BackgroundGlass>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity onPress={() => initialiseGame(1, dispatch)}>
            <Heading>1 Player</Heading>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => initialiseGame(2, dispatch)}>
            <Heading>2 Players</Heading>
          </TouchableOpacity>
          {currentGameId && (
            <TouchableOpacity onPress={() => continueGame(dispatch)}>
              <Heading>Continue</Heading>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      </BackgroundGlass>
    );
  }
}

const mapStateToProps = state => ({
  currentGameId: state.game.currentGameId,
});

export default connect(mapStateToProps)(Menu);
