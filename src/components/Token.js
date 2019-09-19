import React from 'react';
import { View, TouchableOpacity, Platform, Image } from 'react-native';
import designTokens from '@design/tokens';
import { Title } from './Text';
import { getTitleFontPaddingTop } from '@/utils';

const activationImage = require('@assets/images/tokens/activation.png');
const activationUsedImage = require('@assets/images/tokens/activation-used.png');
const gloryImage = require('@assets/images/tokens/glory.png');
const gloryUsedImage = require('@assets/images/tokens/glory-used.png');

const tokenBase = {
  alignItems: 'center',
  justifyContent: 'center',
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
};

const Token = ({ id, style, onPress, children }) => (
  <TouchableOpacity onPress={() => onPress(id)}>
    <View style={style}>{children}</View>
  </TouchableOpacity>
);

const ActivationToken = ({ activationIndex, used, onPress, large }) => (
  <Token
    onPress={onPress}
    id={activationIndex}
    style={{
      ...(used ? styles.activationUsed : styles.activation),
      ...(large ? styles.largeToken : styles.smallToken),
    }}
  >
    <Image
      source={used ? activationUsedImage : activationImage}
      style={large ? styles.largeToken : styles.smallToken}
      resizeMode="contain"
    />
  </Token>
);

const GloryToken = ({ gloryIndex, used, onPress, large }) => (
  <Token
    onPress={onPress}
    id={gloryIndex}
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

const AT = {
  Large: props => <ActivationToken {...props} large />,
  Small: props => <ActivationToken {...props} />,
};

const GT = {
  Large: props => <GloryToken {...props} large />,
  Small: props => <GloryToken {...props} />,
};

export { AT as ActivationToken, GT as GloryToken };
