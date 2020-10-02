/* eslint-disable react-native/no-raw-text */
import React, { useEffect } from "react";
import {
  BackHandler,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigationState } from "@react-navigation/native";

import { BackgroundGlass, SubHeading, Header, BurgerIcon } from "@/components";
import {
  initialiseGame,
  initialiseMortisGame,
  continueGame,
} from "@/game/gameReducerActions";
import { showSideMenu } from "@/system/systemReducer";

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Menu() {
  const currentGameId = useSelector((state) => state.game.currentGameId);
  const dispatch = useDispatch();
  const currentRouteName = useNavigationState(
    ({ index, routes }) => routes[index].name
  );

  useEffect(() => {
    const { remove } = BackHandler.addEventListener("hardwareBackPress", () => {
      if (currentRouteName === "menu") {
        BackHandler.exitApp();
        return true;
      }
      return false;
    });
    return remove;
  }, [currentRouteName]);

  return (
    <BackgroundGlass>
      <SafeAreaView style={styles.screenContainer}>
        <Header left={<BurgerIcon onPress={() => showSideMenu(dispatch)} />} />
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => initialiseGame(1, dispatch)}>
            <SubHeading testID="menu-1-player-button">1 Player</SubHeading>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => initialiseGame(2, dispatch)}>
            <SubHeading testID="menu-2-player-button">2 Players</SubHeading>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => initialiseMortisGame(dispatch)}>
            <SubHeading testID="menu-mortis-button">Arena Mortis</SubHeading>
          </TouchableOpacity>
          {currentGameId && (
            <TouchableOpacity onPress={() => continueGame(dispatch)}>
              <SubHeading testID="menu-continue-button">Continue</SubHeading>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </BackgroundGlass>
  );
}
