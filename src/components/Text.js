import React from 'react';
import { StyleSheet, Text } from 'react-native';
import tokens from '@design/tokens';

const common = {
  fontFamily: tokens.text.font,
  color: tokens.text.primaryColor,
};

const styles = StyleSheet.create({
  heading: {
    ...common,
    fontSize: tokens.text.headingSize,
  },
  title: {
    ...common,
    fontSize: tokens.text.titleSize,
  },
  label: {
    ...common,
    fontSize: tokens.text.labelSize,
  },
});

export const Heading = ({ children, style }) => (
  <Text style={[styles.heading, style]}>{children}</Text>
);
export const Title = ({ children, style }) => <Text style={[styles.title, style]}>{children}</Text>;
export const Label = ({ children, style }) => <Text style={[styles.label, style]}>{children}</Text>;
