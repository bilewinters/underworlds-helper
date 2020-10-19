import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import designTokens from "@design/tokens";

const activationImage = require("@assets/images/tokens/activation.png");
const activationUsedImage = require("@assets/images/tokens/activation-used.png");
const gloryImage = require("@assets/images/tokens/glory.png");
const gloryUsedImage = require("@assets/images/tokens/glory-used.png");

const tokenBase = {
  alignItems: "center",
  justifyContent: "center",
};
export const largeToken = {
  ...tokenBase,
  height: 60,
  width: 60,
  borderRadius: 30,
};
export const smallToken = {
  ...tokenBase,
  height: 40,
  width: 40,
  borderRadius: 20,
};

const styles = {
  largeToken,
  smallToken,
  activation: {
    backgroundColor: designTokens.color.primary,
  },
  activationUsed: {
    backgroundColor: designTokens.pallet.grey,
  },
  unspentGlory: {
    backgroundColor: designTokens.pallet.gold,
    marginLeft: 16,
    marginBottom: 16,
  },
  spentGlory: {
    backgroundColor: designTokens.pallet.grey,
    marginLeft: 16,
    marginBottom: 16,
  },
  initiative: {
    alignItems: "center",
    justifyContent: "center",
    ...largeToken,
  },
};

const Token = ({
  id,
  style,
  onPress,
  disabled,
  children,
  testID,
  activeOpacity = 0.2,
}) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={() => onPress(id)}
    activeOpacity={activeOpacity}
  >
    <View style={style} testID={testID} accessible accessibilityLabel={testID}>
      {children}
    </View>
  </TouchableOpacity>
);

const ActivationToken = ({
  activationIndex,
  used,
  onPress,
  large,
  style,
  testID,
}) => (
  <Token
    onPress={onPress}
    id={activationIndex}
    testID={testID}
    style={{
      ...(used ? styles.activationUsed : styles.activation),
      ...(large ? styles.largeToken : styles.smallToken),
      ...(style || {}),
    }}
  >
    <Image
      source={used ? activationUsedImage : activationImage}
      style={large ? styles.largeToken : styles.smallToken}
      resizeMode="contain"
    />
  </Token>
);

const GloryToken = ({ gloryIndex, used, onPress, large, testID }) => (
  <Token
    onPress={onPress}
    id={gloryIndex}
    testID={testID}
    style={{
      ...(used ? styles.spentGlory : styles.unspentGlory),
      ...(large ? styles.largeToken : styles.smallToken),
    }}
  >
    <Image
      source={used ? gloryUsedImage : gloryImage}
      style={large ? styles.largeToken : styles.smallToken}
      resizeMode="contain"
    />
  </Token>
);

const InitiativeToken = ({
  children,
  value,
  selected,
  disabled,
  style,
  onPress,
  testID,
}) => (
  <Token
    activeOpacity={1}
    zIndex={selected ? 2 : 1}
    disabled={disabled}
    onPress={onPress}
    id={value}
    testID={testID || `initiative-token-${value}`}
    style={{
      ...styles.initiative,
      ...(style || {}),
    }}
  >
    <Image
      source={activationUsedImage}
      style={{ ...styles.largeToken, position: "absolute" }}
      resizeMode="contain"
    />
    {children}
  </Token>
);

const AT = {
  Large: (props) => <ActivationToken {...props} large />,
  Small: (props) => <ActivationToken {...props} />,
};

const GT = {
  Large: (props) => <GloryToken {...props} large />,
  Small: (props) => <GloryToken {...props} />,
};

export { AT as ActivationToken, GT as GloryToken, InitiativeToken };
