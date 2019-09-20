/* eslint-disable react-native/no-raw-text */
import React from 'react';
import { View, SafeAreaView, StyleSheet, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { BackgroundPlain, Title, Header, Button } from '@/components';
import { nextRound, moveToSummary, moveToMenu } from './gameReducer';
import { activationsForRound } from './gameUtils';
import Player from './Player';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  roundTextWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const allRoundActivationsUsed = (players, round) =>
  players.every(({ activations }) =>
    activationsForRound(activations, round).every(used => used === true));

class Game extends React.Component {
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
        <Header>
          <View style={styles.roundTextWrap}>
            <Title>{`Round ${round}`}</Title>
            {allRoundActivationsUsed(players, round) ? (
              <Button.Small
                text="End Round"
                onPress={() => (round < 3 ? nextRound(dispatch) : moveToSummary(dispatch))}
              />
            ) : null}
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

const mapStateToProps = state => ({
  ...state.game.games[state.game.currentGameId].gameState,
});

export default connect(mapStateToProps)(Game);
