/* eslint-disable react-native/no-raw-text */
import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import designTokens from '@design/tokens';
import { BackgroundGlass, Heading, Title, Label, Header, Button, Clock } from '@/components';
import { moveBackToGame, completeGame } from './gameReducerActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playersContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  gloryCount: {
    paddingTop: 16,
  },
  summaryButtonsContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  summaryTimesContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  summaryTime: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryButton: {
    width: 150,
    alignItems: 'center',
  },
  summaryButtonText: {
    color: designTokens.button.color.text,
  },
});

const Summary = ({ players, startTime, roundEndTimes, dispatch }) => (
  <BackgroundGlass>
    <Header>
      <Title>Summary</Title>
    </Header>
    <SafeAreaView style={styles.playersContainer}>
      {players.map(({ playerIndex, glory }) => (
        <View style={styles.container} key={`player-${playerIndex + 1}`}>
          <Label>{`Player ${playerIndex + 1}`}</Label>
          <Heading style={styles.gloryCount} testID={`player-${playerIndex}-score`}>
            {`${glory.length}`}
          </Heading>
          <Title>Glory Points</Title>
        </View>
      ))}
      {roundEndTimes && <View style={styles.summaryTimesContainer}>
        {roundEndTimes.map((endTime, index) => (
          <View key={`${index}`} style={styles.summaryTime}>
            <Label>Round {index + 1} - </Label>
            <Clock startTime={index === 0 ? startTime : roundEndTimes[index - 1]} endTime={endTime}/>
          </View>
        ))}
        <View style={styles.summaryTime}>
          <Label>Game - </Label>
          <Clock startTime={startTime} endTime={roundEndTimes[roundEndTimes.length - 1]}/>
        </View>
      </View>}
      <View style={styles.summaryButtonsContainer}>
        <SummaryButton testID="back-to-game-button" onPress={() => moveBackToGame(dispatch)}>
          Back to game
        </SummaryButton>
        <SummaryButton testID="to-menu-button" onPress={() => completeGame(dispatch)}>
          Menu
        </SummaryButton>
      </View>
    </SafeAreaView>
  </BackgroundGlass>
);

const SummaryButton = ({ onPress, children, testID }) => (
  <Button.Small onPress={onPress}>
    <View style={styles.summaryButton}>
      <Label testID={testID} style={styles.summaryButtonText}>
        {children}
      </Label>
    </View>
  </Button.Small>
);

const mapStateToProps = state => ({
  startTime: state.game.games[state.game.currentGameId].startDateTime,
  ...state.game.games[state.game.currentGameId].gameState,
});

export default connect(mapStateToProps)(Summary);
