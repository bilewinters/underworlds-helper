import React from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';

import designTokens from '@design/tokens';
import { Heading, Label, GloryToken, largeToken, smallToken } from '@/components';
import { getTitleFontPaddingTop } from '@/utils';
import { sizes } from '@/constants';

const tokenPadding = 16;
const largeControlWidth = largeToken.width * 4 + tokenPadding * 3;
const smallControlWidth = smallToken.width * 3 + tokenPadding * 2;

const buttonBase = {
  backgroundColor: designTokens.button.color.primary,
  alignItems: 'center',
  justifyContent: 'center',
};
const gloryCountBase = {
  backgroundColor: designTokens.color.primary,
  paddingTop: getTitleFontPaddingTop(Platform.OS),
  alignItems: 'center',
  justifyContent: 'center',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContainer: {
    alignItems: 'center',
    flex: 1,
  },
  gloryContainer: {
    marginVertical: 12,
    alignItems: 'center',
  },
  gloryControlsLarge: {
    flexDirection: 'row',
    width: largeControlWidth,
    justifyContent: 'space-between',
  },
  gloryControlsSmall: {
    flexDirection: 'row',
    width: smallControlWidth,
    justifyContent: 'space-between',
  },
  gloryButtonLarge: {
    ...buttonBase,
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  gloryButtonSmall: {
    ...buttonBase,
    height: 40,
    width: 40,
    borderRadius: 5,
  },
  gloryButtonTextLarge: {
    fontSize: 36,
  },
  gloryButtonTextSmall: {
    fontSize: 22,
  },
  gloryCountLarge: {
    ...gloryCountBase,
    width: largeToken.width * 2,
    height: largeToken.height,
  },
  gloryCountSmall: {
    ...gloryCountBase,
    width: smallToken.width,
    height: smallToken.height,
  },
  gloryPoints: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const Glory = ({
  glory,
  onAddGlory,
  onRemoveGlory,
  onFlipGlory,
  playerIndex,
  size = sizes.large,
}) => (
  <View style={styles.container}>
    <GloryControls
      gloryCount={glory.length}
      onAddGlory={onAddGlory}
      onRemoveGlory={onRemoveGlory}
      playerIndex={playerIndex}
      size={size}
    />
    <GloryPoints glory={glory} onFlipGlory={onFlipGlory} size={size} playerIndex={playerIndex} />
  </View>
);

const GloryControls = ({ gloryCount, onAddGlory, onRemoveGlory, playerIndex, size }) => (
  <View style={styles.gloryContainer}>
    {/* eslint-disable-next-line react-native/no-raw-text */}
    <Label>Glory</Label>
    <View style={size === sizes.large ? styles.gloryControlsLarge : styles.gloryControlsSmall}>
      <GloryButton
        onPress={onRemoveGlory}
        text="-"
        size={size}
        testID={`player-${playerIndex}-glory-remove-button`}
      />
      <GloryCount size={size} testID={`player-${playerIndex}-glory-count`}>
        {gloryCount}
      </GloryCount>
      <GloryButton
        onPress={onAddGlory}
        text="+"
        size={size}
        testID={`player-${playerIndex}-glory-add-button`}
      />
    </View>
  </View>
);

const GloryButton = ({ text, onPress, testID, size }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={size === sizes.large ? styles.gloryButtonLarge : styles.gloryButtonSmall}
      testID={testID}
      accessible
      accessibilityLabel={testID}
    >
      <Text
        style={size === sizes.large ? styles.gloryButtonTextLarge : styles.gloryButtonTextSmall}
      >
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);

const GloryCount = ({ children, size, testID }) => (
  <View style={size === sizes.large ? styles.gloryCountLarge : styles.gloryCountSmall}>
    {size === sizes.large ? (
      <Heading testID={testID}>{children}</Heading>
    ) : (
      <Label testID={testID}>{children}</Label>
    )}
  </View>
);

const GloryPoints = ({ glory, onFlipGlory, playerIndex, size }) => {
  const tokenWholeWidth =
    (size === sizes.large ? largeToken.width : smallToken.width) + tokenPadding;
  const gloryPointsContainerWidth =
    Math.floor(Dimensions.get('window').width / tokenWholeWidth) * tokenWholeWidth + tokenPadding;
  const Token = size === sizes.large ? GloryToken.Large : GloryToken.Small;
  return (
    <View style={styles.centeredContainer}>
      <ScrollView alwaysBounceVertical={false} indicatorStyle="white">
        <View style={[{ width: gloryPointsContainerWidth }, styles.gloryPoints]}>
          {glory.map((used, gloryIndex) => (
            <Token
              // eslint-disable-next-line react/no-array-index-key
              key={`${gloryIndex}${used}`}
              id={gloryIndex}
              used={used}
              onPress={() => onFlipGlory(gloryIndex)}
              testID={`player-${playerIndex}-glory-token-${gloryIndex}`}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export { GloryControls, GloryPoints };

export default Glory;
