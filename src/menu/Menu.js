/* eslint-disable react-native/no-raw-text */
import React from 'react';
import { BackHandler, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { BackgroundGlass, SubHeading, Header, BurgerIcon } from '@/components';
import { initialiseGame, initialiseMortisGame, continueGame } from '@/game/gameReducer';
import { showSideMenu } from '@/system/systemReducer';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  menuContainer: {
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
        <SafeAreaView style={styles.screenContainer}>
          <Header left={<BurgerIcon onPress={() => showSideMenu(dispatch)} />} />
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => initialiseGame(1, dispatch)}>
              <SubHeading testID="menu-1-player-button">1 Player</SubHeading>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => initialiseGame(2, dispatch)}>
              <SubHeading testID="menu-2-player-button">2 Players</SubHeading>
            </TouchableOpacity>
            {currentGameId && (
              <TouchableOpacity onPress={() => continueGame(dispatch)}>
                <SubHeading testID="menu-continue-button">Continue</SubHeading>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </BackgroundGlass>
    );
  }
}

const mapStateToProps = state => ({
  currentGameId: state.game.currentGameId,
});

export default connect(mapStateToProps)(Menu);
