import React from 'react';
import { StyleSheet, StatusBar, SafeAreaView, View } from 'react-native';

import tokens from '@design/tokens';

const styles = StyleSheet.create({
  header: {
    backgroundColor: tokens.color.primary,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
  },
  contentWrapper: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
});

const Header = ({ children }) => (
  <View style={styles.header}>
    <SafeAreaView>
      <View style={styles.contentWrapper}>{children}</View>
    </SafeAreaView>
  </View>
);

export default Header;
