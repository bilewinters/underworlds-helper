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
  activationsLarge: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    width: largeControlWidth,
    flexWrap: "wrap",
  },
  activationsSmall: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    width: smallControlWidth,
    flexWrap: "wrap",
  },
});

const Activations = ({
  activations,
  round,
  onPress,
  playerIndex,
  size = sizes.large,
  tokenStyle,
}) => (
  <View style={styles.activationsContainer}>
    <Label>Activations</Label>
    <View
      style={
        size === sizes.large ? styles.activationsLarge : styles.activationsSmall
      }
    >
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
