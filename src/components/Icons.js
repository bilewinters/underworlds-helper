import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const hitSlop = {
  top: 8,
  bottom: 8,
  left: 8,
  right: 8,
};

export const BurgerIcon = ({ onPress, style = { marginLeft: 12 } }) => (
  <TouchableOpacity onPress={onPress} hitSlop={hitSlop}>
    <Feather name="menu" size={32} color="white" style={style} />
  </TouchableOpacity>
);

export const CloseIcon = ({ onPress, style }) => (
  <TouchableOpacity onPress={onPress} hitSlop={hitSlop}>
    <Feather name="x" size={32} color="white" style={style} />
  </TouchableOpacity>
);
