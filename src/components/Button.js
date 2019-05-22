import React from 'react';
import { StyleSheet, Platform, View, TouchableOpacity } from 'react-native';

import tokens from '@design/tokens';
import { Label, Title, Heading } from './Text';
import { getLabelFontPaddingTop } from '@/utils';

const styles = StyleSheet.create({
  button: {
    backgroundColor: tokens.button.color.primary,
    borderRadius: 10,
    paddingTop: getLabelFontPaddingTop(Platform.OS),
    paddingHorizontal: 6,
  },
  buttonText: {
    color: tokens.button.color.text,
  },
});

const ButtonBase = ({ TextComponent, style, text, onPress, children }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.button}>
      <View style={style}>
        {children || <TextComponent style={styles.buttonText}>{text}</TextComponent>}
      </View>
    </View>
  </TouchableOpacity>
);

const ButtonSmall = props => <ButtonBase TextComponent={Label} {...props} />;
const ButtonMedium = props => <ButtonBase TextComponent={Title} {...props} />;
const ButtonLarge = props => <ButtonBase TextComponent={Heading} {...props} />;

const Button = {
  Small: ButtonSmall,
  Medium: ButtonMedium,
  Large: ButtonLarge,
};

export default Button;
