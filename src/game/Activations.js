/* eslint-disable react-native/no-raw-text */
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Label, ActivationToken, largeToken, smallToken } from '@/components';
import { activationsForRound } from './gameUtils';
import { sizes } from '@/constants';

const tokenPadding = 16;
const largeControlWidth = largeToken.width * 4 + tokenPadding * 3;
const smallControlWidth = smallToken.width * 4 + tokenPadding * 3;

const styles = StyleSheet.create({
  activationsContainer: {
    marginVertical: 12,
    alignItems: 'center',
  },
  activationsLarge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: largeControlWidth,
  },
  activationsSmall: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: smallControlWidth,
  },
});

const Activations = ({ activations, round, onPress, playerIndex, size = sizes.large }) => (
  <View style={styles.activationsContainer}>
    <Label>Activations</Label>
    <View style={size === sizes.large ? styles.activationsLarge : styles.activationsSmall}>
      {activationsForRound(activations, round).map((used, i) => {
        const activationIndex = i + (round - 1) * 4;
        const Token = size === sizes.large ? ActivationToken.Large : ActivationToken.Small;
        return (
          <Token
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
