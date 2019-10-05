import React from 'react';
import { StyleSheet, StatusBar, SafeAreaView, View } from 'react-native';

const styles = StyleSheet.create({
  header: {
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
    width: '100%',
  },
  contentWrapper: {
    width: '100%',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 53,
  },
  contentLeft: {
    position: 'absolute',
    left: 0,
    paddingLeft: 8,
  },
  contentRight: {
    position: 'absolute',
    right: 0,
    paddingRight: 8,
    height: '100%',
    justifyContent: 'center',
  },
});

const Header = ({ children, left, right }) => (
  <View style={styles.header}>
    <SafeAreaView style={styles.contentWrapper}>
      <View style={styles.content}>
        {left && <View style={styles.contentLeft}>{left}</View>}
        {children}
        {right && <View style={styles.contentRight}>{right}</View>}
      </View>
    </SafeAreaView>
  </View>
);

export default Header;
