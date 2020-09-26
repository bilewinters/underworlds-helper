/* eslint-disable react-native/no-raw-text */
import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  BackHandler,
  Platform,
} from "react-native";
import { connect } from "react-redux";

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

class Round extends React.Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (Actions.currentScene.startsWith("round")) {
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

  renderHeader() {
    const { round, players, vs, dispatch } = this.props;
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
  }

  renderPlayer = ({ player, round, multiPlayer, rotated }) => (
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

  render() {
    const { round, players, vs } = this.props;
    const multiPlayer = players.length > 1;
    const player1 = players[0];
    const player2 = multiPlayer ? players[1] : undefined;

    return (
      <BackgroundPlain>
        {!vs && this.renderHeader()}
        <SafeAreaView style={styles.container}>
          {this.renderPlayer({
            player: player1,
            round,
            multiPlayer,
            rotated: vs,
          })}
          {vs && this.renderHeader()}
          {player2 &&
            this.renderPlayer({
              player: player2,
              round,
              multiPlayer,
              rotated: false,
            })}
        </SafeAreaView>
      </BackgroundPlain>
    );
  }
}

const mapStateToProps = (round) => (state) => ({
  ...state.game.games[state.game.currentGameId].gameState,
  round,
});

export const Round1 = connect(mapStateToProps(1))(Round);
export const Round2 = connect(mapStateToProps(2))(Round);
export const Round3 = connect(mapStateToProps(3))(Round);
