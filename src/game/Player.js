/* eslint-disable react-native/no-raw-text */
import React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";

import {
  flipActivation,
  addGlory,
  removeGlory,
  flipGlory,
} from "./gameReducerActions";
import Activations from "./Activations";
import Glory from "./Glory";
import { sizes } from "@/constants";
import { activationsForRound } from "./gameUtils";
import { isTablet } from "@/system/systemUtils"

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Player = ({
  playerIndex,
  activations,
  glory,
  round,
  multiPlayer,
  style,
  dispatch,
}) => (
  <View style={[styles.container, style]}>
    <Activations
      activations={activationsForRound(activations, round)}
      playerIndex={playerIndex}
      round={round}
      onPress={(activationIndex) =>
        flipActivation(playerIndex, activationIndex, dispatch)
      }
      size={multiPlayer && !isTablet() ? sizes.small : sizes.large}
    />
    <Glory
      glory={glory}
      playerIndex={playerIndex}
      onAddGlory={() => addGlory(playerIndex, dispatch)}
      onRemoveGlory={() => removeGlory(playerIndex, dispatch)}
      onFlipGlory={(gloryIndex) => flipGlory(playerIndex, gloryIndex, dispatch)}
      size={multiPlayer && !isTablet() ? sizes.small : sizes.large}
    />
  </View>
);

export default connect()(Player);
