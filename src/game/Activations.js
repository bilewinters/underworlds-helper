/* eslint-disable react-native/no-raw-text */
import React from "react";
import { View, StyleSheet } from "react-native";

import { Label, ActivationToken, largeToken, smallToken } from "@/components";
import { sizes } from "@/constants";

const tokenPadding = 16;
const largeControlWidth = largeToken.width * 4 + tokenPadding * 3;
const smallControlWidth = smallToken.width * 4 + tokenPadding * 3;

const styles = StyleSheet.create({
  activationsContainer: {
    marginVertical: 12,
    alignItems: "center",
  },
});

const getActivationControlWidth = (size, activationsPerRow) =>
  (size === sizes.large ? largeToken.width : smallToken.width) *
    activationsPerRow +
  tokenPadding * (activationsPerRow - 1);

const getActivateionControlStyle = (size, activationsPerRow) => ({
  marginTop: 4,
  flexDirection: "row",
  justifyContent: "space-between",
  width: getActivationControlWidth(size, activationsPerRow),
  flexWrap: "wrap",
});

const Activations = ({
  activationsPerRow = 4,
  activations,
  round,
  onPress,
  playerIndex,
  size = sizes.large,
  tokenStyle,
}) => (
  <View style={styles.activationsContainer}>
    <Label>Activations</Label>
    <View style={getActivateionControlStyle(size, activationsPerRow)}>
      {activations.map((used, i) => {
        const activationIndex = i + (round - 1) * 4;
        const Token =
          size === sizes.large ? ActivationToken.Large : ActivationToken.Small;
        return (
          <Token
            style={tokenStyle}
            key={`${activationIndex}${used}`}
            activationIndex={activationIndex}
            used={used}
            onPress={onPress}
            testID={`player-${playerIndex}-activation-token-${activationIndex}`}
          />
        );
      })}
    </View>
  </View>
);

export default Activations;
