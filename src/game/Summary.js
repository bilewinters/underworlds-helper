/* eslint-disable react-native/no-raw-text */
import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import designTokens from '@design/tokens';
import { BackgroundGlass, Heading, Title, Label, Header, Button } from '@/components';
import { moveBackToGame, completeGame } from './gameReducer';

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
  summaryButton: {
    width: 150,
    alignItems: 'center',
  },
  summaryButtonText: {
    color: designTokens.button.color.text,
  },
});

const Summary = ({ players, dispatch }) => (
  <BackgroundGlass>
    <Header>
      <Title>Summary</Title>
    </Header>
    <SafeAreaView style={styles.playersContainer}>
      {players.map(player => (
        <View style={styles.container} key={`player-${player.playerIndex + 1}`}>
          <Label>{`Player ${player.playerIndex + 1}`}</Label>
          <Heading style={styles.gloryCount}>{`${player.glory.length}`}</Heading>
          <Title>Glory Points</Title>
        </View>
      ))}
      <View style={styles.summaryButtonsContainer}>
        <SummaryButton onPress={() => moveBackToGame(dispatch)}>Back to game</SummaryButton>
        <SummaryButton onPress={() => completeGame(dispatch)}>Menu</SummaryButton>
      </View>
    </SafeAreaView>
  </BackgroundGlass>
);

const SummaryButton = ({ onPress, children }) => (
  <Button.Small onPress={onPress}>
    <View style={styles.summaryButton}>
      <Label style={styles.summaryButtonText}>{children}</Label>
    </View>
  </Button.Small>
);

const mapStateToProps = state => ({
  ...state.game.games[state.game.currentGameId].gameState,
});

export default connect(mapStateToProps)(Summary);
