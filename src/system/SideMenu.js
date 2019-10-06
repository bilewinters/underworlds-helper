import React, { useRef, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import tokens from '@design/tokens';
import { connect } from 'react-redux';

import { Label, Header, CloseIcon } from '@/components';
import { hideSideMenu } from '@/system/systemReducer';
import { initialiseGame, moveToMenu, continueGame } from '@/game/gameReducer';
import { getLabelFontPaddingTop } from '@/utils';

const styles = StyleSheet.create({
  app: { position: 'absolute', left: 0, bottom: 0, right: 0, top: 0 },
  menuWrapper: { position: 'absolute', left: 0, bottom: 0, right: 0, top: 0, flexDirection: 'row' },
  menu: {
    height: '100%',
    backgroundColor: tokens.color.primary,
    borderRightWidth: 1,
    borderRightColor: tokens.pallet.grey,
    paddingLeft: 8,
    paddingRight: 8,
  },
  screenOverlay: {
    flex: 1,
    backgroundColor: tokens.color.primary,
    opacity: 0.6,
  },
  menuItem: {
    paddingTop: getLabelFontPaddingTop(Platform.OS),
    height: 55,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  menuItemBorder: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: tokens.pallet.grey,
  },
});

const MenuItemBorder = () => <View style={styles.menuItemBorder} />;

const MenuItem = ({ children, onPress }) => (
  <>
    <TouchableOpacity onPress={onPress}>
      <View style={styles.menuItem}>{children}</View>
    </TouchableOpacity>
    <MenuItemBorder />
  </>
);

const SideMenu = ({ dispatch, showSideMenu, children }) => {
  const { width } = Dimensions.get('window');
  const menuPosition = useRef(new Animated.Value(-width)).current;
  useEffect(() => {
    Animated.timing(menuPosition, {
      toValue: showSideMenu ? 0 : -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showSideMenu]);

  return (
    <>
      <View style={styles.app}>{children}</View>
      <Animated.View
        style={[
          styles.menuWrapper,
          {
            transform: [{ translateX: menuPosition }],
          },
        ]}
      >
        <View style={styles.menu}>
          <SafeAreaView>
            <Header right={<CloseIcon onPress={() => hideSideMenu(dispatch)} />} />
            <MenuItemBorder />
            <MenuItem
              onPress={() => {
                moveToMenu(dispatch);
                hideSideMenu(dispatch);
              }}
            >
              <Label>Main Menu</Label>
            </MenuItem>
            <MenuItem
              onPress={() => {
                initialiseGame(1, dispatch);
                hideSideMenu(dispatch);
              }}
            >
              <Label>New 1 Player Game</Label>
            </MenuItem>
            <MenuItem
              onPress={() => {
                initialiseGame(2, dispatch);
                hideSideMenu(dispatch);
              }}
            >
              <Label>New 2 Player Game</Label>
            </MenuItem>
            <MenuItem
              onPress={() => {
                continueGame(dispatch);
                hideSideMenu(dispatch);
              }}
            >
              <Label>Continue Last Game</Label>
            </MenuItem>
          </SafeAreaView>
        </View>
        <TouchableWithoutFeedback onPress={() => hideSideMenu(dispatch)}>
          <View style={styles.screenOverlay} />
        </TouchableWithoutFeedback>
      </Animated.View>
    </>
  );
};

const mapStateToProps = state => ({
  showSideMenu: state.system.showSideMenu,
});

export default connect(mapStateToProps)(SideMenu);
