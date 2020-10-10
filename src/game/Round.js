/* eslint-disable react-native/no-raw-text */
import React, { useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  BackHandler,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { useNavigationState } from "@react-navigation/native";

import {
  BackgroundPlain,
  Title,
  Header,
  Button,
  BurgerIcon,
  RotateIcon,
} from "@/components";
import {
  nextRound,
  moveToSummary,
  moveToMenu,
  vsFlip,
} from "./gameReducerActions";
import { showSideMenu } from "@/system/systemReducer";
import { activationsForRound } from "./gameUtils";
import { getTitleFontPaddingTop } from "@/utils";
import Player from "./Player";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  roundTextWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  roundText: {
    paddingTop: getTitleFontPaddingTop(Platform.OS),
  },
});

const allRoundActivationsUsed = (players, round) =>
  players.every(({ activations }) =>
    activationsForRound(activations, round).every((used) => used === true)
  );

const RoundHeader = ({ round, players, vs, dispatch }) => {
  const multiPlayer = players.length > 1;
  return (
    <Header
      left={<BurgerIcon onPress={() => showSideMenu(dispatch)} />}
      right={(() => {
        if (allRoundActivationsUsed(players, round)) {
          return (
            <Button.Small
              testID="end-of-round-button"
              text="End Round"
              onPress={() =>
                round < 3 ? nextRound(dispatch) : moveToSummary(dispatch)
              }
            />
          );
        }
        if (multiPlayer) {
          return <RotateIcon onPress={() => vsFlip(dispatch)} />;
        }
        return undefined;
      })()}
    >
      <View style={styles.roundTextWrap}>
        <Title style={styles.roundText} testID="round-label">
          {`${!vs ? "Round " : ""}${round}`}
        </Title>
      </View>
    </Header>
  );
};

const RoundPlayer = ({ player, round, multiPlayer, rotated }) => (
  <Player
    {...player}
    style={
      player.playerIndex === 0 &&
      rotated && { transform: [{ rotate: "180deg" }] }
    }
    round={round}
    key={`${player.playerIndex}`}
    multiPlayer={multiPlayer}
  />
);

const Round = ({ round, players, vs, dispatch }) => {
  const multiPlayer = players.length > 1;
  const player1 = players[0];
  const player2 = multiPlayer ? players[1] : undefined;

  const currentRouteName = useNavigationState(
    ({ index, routes }) => routes[index].name
  );

  useEffect(
    () =>
      BackHandler.addEventListener("hardwareBackPress", () => {
        if (currentRouteName.startsWith("round")) {
          moveToMenu(dispatch);
          return true;
        }
        return false;
      }).remove,
    [currentRouteName]
  );

  return (
    <BackgroundPlain>
      {!vs && (
        <RoundHeader
          round={round}
          players={players}
          vs={vs}
          dispatch={dispatch}
        />
      )}
      <SafeAreaView style={styles.container}>
        <RoundPlayer
          player={player1}
          round={round}
          multiPlayer={multiPlayer}
          rotated={vs}
        />
        {vs && (
          <RoundHeader
            round={round}
            players={players}
            vs={vs}
            dispatch={dispatch}
          />
        )}
        {player2 && (
          <RoundPlayer
            player={player2}
            round={round}
            multiPlayer={true}
            rotated={false}
          />
        )}
      </SafeAreaView>
    </BackgroundPlain>
  );
};

const mapStateToProps = (round) => (state) => ({
  ...state.game.games[state.game.currentGameId].gameState,
  round,
});

export const Round1 = connect(mapStateToProps(1))(Round);
export const Round2 = connect(mapStateToProps(2))(Round);
export const Round3 = connect(mapStateToProps(3))(Round);
