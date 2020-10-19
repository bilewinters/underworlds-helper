import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const hitSlop = {
  top: 8,
  bottom: 8,
  left: 8,
  right: 8,
};

export const BurgerIcon = ({ onPress, style = { marginLeft: 12 } }) => (
  <TouchableOpacity onPress={onPress} hitSlop={hitSlop} >
    <View testID={"burger-menu-icon"} accessible accessibilityLabel={"burger-menu-icon"}>
      <Feather name="menu" size={32} color="white" style={style} />
    </View>
  </TouchableOpacity>
);

export const CloseIcon = ({ onPress, style }) => (
  <TouchableOpacity onPress={onPress} hitSlop={hitSlop}>
    <View testID={"x-close-icon"} accessible accessibilityLabel={"x-close-icon"}>
      <Feather name="x" size={32} color="white" style={style} />
    </View>
  </TouchableOpacity>
);

export const RotateIcon = ({ onPress, style = { marginRight: 12 } }) => (
  <TouchableOpacity onPress={onPress} hitSlop={hitSlop}>
    <View testID={"vs-rotate-icon"} accessible accessibilityLabel={"vs-rotate-icon"}>
      <Feather name="rotate-cw" size={32} color="white" style={style} />
    </View>
  </TouchableOpacity>
);
