/* eslint-disable global-require */
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Constants from "expo-constants";
import * as Font from "expo-font";
import { Asset } from "expo-asset";

import designTokens from "@design/tokens";
import { BackgroundGlass, Logo } from "@/components";
import buildInfo from "../../buildInfo.json";

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200,
  },
  version: {
    color: designTokens.text.primaryColor,
  },
});

const loadAssets = async () =>
  Promise.all([
    Font.loadAsync({
      "sava-pro-semibold": require("@assets/fonts/SavaPro-Semibold.otf"),
    }),
    Asset.fromModule(
      require("@assets/images/tokens/activation.png")
    ).downloadAsync(),
    Asset.fromModule(
      require("@assets/images/tokens/activation-used.png")
    ).downloadAsync(),
    Asset.fromModule(
      require("@assets/images/tokens/glory.png")
    ).downloadAsync(),
    Asset.fromModule(
      require("@assets/images/tokens/glory-used.png")
    ).downloadAsync(),
  ]);

class Splash extends React.Component {
  async componentDidMount() {
    const { onFinishLoading } = this.props;
    await Promise.all([loadAssets(), new Promise((r) => setTimeout(r, 1000))]);
    onFinishLoading();
  }

  render() {
    return (
      <BackgroundGlass>
        <View style={styles.centered}>
          <Logo style={styles.logo} resizeMode="contain" />
          <Text style={styles.version}>
            {`${Constants.manifest.version} - ${buildInfo.buildNumber}`}
          </Text>
        </View>
      </BackgroundGlass>
    );
  }
}

export default Splash;
