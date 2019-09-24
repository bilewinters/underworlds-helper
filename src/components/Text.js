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

export const Heading = ({ children, style, testID }) => (
  <Text style={[styles.heading, style]} testID={testID} accessible accessibilityLabel={testID}>
    {children}
  </Text>
);
export const Title = ({ children, style, testID }) => (
  <Text style={[styles.title, style]} testID={testID} accessible accessibilityLabel={testID}>
    {children}
  </Text>
);
export const Label = ({ children, style, testID }) => (
  <Text style={[styles.label, style]} testID={testID} accessible accessibilityLabel={testID}>
    {children}
  </Text>
);
