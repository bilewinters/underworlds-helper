import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, View } from 'react-native';

import background from '@assets/images/bg/bg_plain.jpg';
import backgroundGlass from '@assets/images/bg/bg_teeth.jpg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});

const Background = ({ image, children }) => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
    <ImageBackground style={styles.backgroundImage} source={image}>
      {children}
    </ImageBackground>
  </View>
);

export const BackgroundPlain = ({ children }) => (
  <Background image={background}>{children}</Background>
);

export const BackgroundGlass = ({ children }) => (
  <Background image={backgroundGlass}>{children}</Background>
);
