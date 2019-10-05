/* eslint-disable react-native/no-raw-text */
import React from 'react';
import { View, SafeAreaView, StyleSheet, BackHandler, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { BackgroundPlain, Title, Header, Button } from '@/components';
import { nextRound, moveToSummary, moveToMenu } from './gameReducer';
import { activationsForRound } from './gameUtils';
import { getTitleFontPaddingTop } from '@/utils';
import Player from './Player';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  roundTextWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: getTitleFontPaddingTop(Platform.OS),
  },
});

const allRoundActivationsUsed = (players, round) =>
  players.every(({ activations }) =>
    activationsForRound(activations, round).every(used => used === true));

class Round extends React.Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (Actions.currentScene === 'game') {
        const { dispatch } = this.props;
        moveToMenu(dispatch);
        return true;
      }
      return false;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  render() {
    const { round, players, dispatch } = this.props;
    return (
      <BackgroundPlain>
        <Header
          right={
            allRoundActivationsUsed(players, round) && (
              <Button.Small
                testID="end-of-round-button"
                text="End Round"
                onPress={() => (round < 3 ? nextRound(dispatch) : moveToSummary(dispatch))}
              />
            )
          }
        >
          <View style={styles.roundTextWrap}>
            <Title testID="round-label">{`Round ${round}`}</Title>
          </View>
        </Header>
        <SafeAreaView style={styles.container}>
          {players.map(player => (
            <Player
              {...player}
              round={round}
              key={`${player.playerIndex}`}
              multiPlayer={players.length > 1}
            />
          ))}
        </SafeAreaView>
      </BackgroundPlain>
    );
  }
}

const mapStateToProps = round => state => ({
  ...state.game.games[state.game.currentGameId].gameState,
  round,
});

export const Round1 = connect(mapStateToProps(1))(Round);
export const Round2 = connect(mapStateToProps(2))(Round);
export const Round3 = connect(mapStateToProps(3))(Round);
