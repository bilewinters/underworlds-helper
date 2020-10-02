/* eslint-disable react-native/no-raw-text */
import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  BackHandler,
  Platform,
} from "react-native";
import { connect } from "react-redux";

import {
  BackgroundPlain,
  Title,
  Header,
  Button,
  BurgerIcon,
} from "@/components";
import {
  moveToSummary,
  moveToMenu,
  flipActivation,
  addGlory,
  removeGlory,
  flipGlory,
} from "./gameReducerActions";
import { showSideMenu } from "@/system/systemReducer";
import { getTitleFontPaddingTop } from "@/utils";
import { sizes } from "@/constants";
import Activations from "./Activations";
import Glory from "./Glory";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  roundTextWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  roundText: {
    paddingTop: getTitleFontPaddingTop(Platform.OS),
  },
});

class MortisGame extends React.Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (Actions.currentScene.startsWith("round")) {
        const { dispatch } = this.props;
        moveToMenu(dispatch);
        return true;
      }
      return false;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  renderHeader() {
    const { dispatch } = this.props;
    return (
      <Header
        left={<BurgerIcon onPress={() => showSideMenu(dispatch)} />}
        right={
          <Button.Small
            testID="end-of-game-button"
            text="End Game"
            onPress={() => moveToSummary(dispatch)}
          />
        }
      >
        <View style={styles.roundTextWrap}>
          <Title style={styles.roundText} testID="game-label">
            Arena Mortis
          </Title>
        </View>
      </Header>
    );
  }

  render() {
    const { players, dispatch } = this.props;
    const { activations, glory } = players[0];
    return (
      <BackgroundPlain>
        {this.renderHeader()}
        <SafeAreaView style={styles.container}>
          <View style={[styles.container]}>
            <Activations
              activations={activations}
              playerIndex={0}
              round={1}
              onPress={(activationIndex) =>
                flipActivation(0, activationIndex, dispatch)
              }
              size={sizes.large}
              tokenStyle={{ marginBottom: 8 }}
            />
            <Glory
              glory={glory}
              playerIndex={0}
              onAddGlory={() => addGlory(0, dispatch)}
              onRemoveGlory={() => removeGlory(0, dispatch)}
              onFlipGlory={(gloryIndex) => flipGlory(0, gloryIndex, dispatch)}
              size={sizes.large}
            />
          </View>
        </SafeAreaView>
      </BackgroundPlain>
    );
  }
}

const mapStateToProps = () => (state) => ({
  ...state.game.games[state.game.currentGameId].gameState,
});

export default connect(mapStateToProps())(MortisGame);
