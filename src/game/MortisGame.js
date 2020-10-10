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
  Initiative,
} from "@/components";
import {
  moveToSummary,
  moveToMenu,
  flipActivation,
  addGlory,
  removeGlory,
  flipGlory,
  setInitiative,
} from "./gameReducerActions";
import { showSideMenu } from "@/system/systemReducer";
import { getTitleFontPaddingTop } from "@/utils";
import { InitiativeToken } from "@/components/Token";
import { sizes } from "@/constants";
import Activations from "./Activations";
import Glory from "./Glory";
import { largeToken } from "../components/Token";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  state = {};

  initiativeRef = React.createRef();

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
    const { players, initiative, dispatch } = this.props;
    const { activations, glory } = players[0];
    return (
      <BackgroundPlain>
        {this.renderHeader()}
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <Activations
              activationsPerRow={3}
              activations={activations}
              playerIndex={0}
              round={1}
              onPress={(activationIndex) =>
                flipActivation(0, activationIndex, dispatch)
              }
              size={sizes.large}
              tokenStyle={{ marginBottom: 8 }}
            />
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Title>Initiative</Title>
              <View style={{ width: 8 }} />
              <View ref={this.initiativeRef} onLayout={() => {}}>
                <InitiativeToken
                  value={initiative}
                  selected={false}
                  disabled={false}
                  onPress={() => {
                    if (!this.state.initiativePosition) {
                      this.initiativeRef.current.measure(
                        (x, y, w, h, pX, pY) => {
                          this.setState({
                            initiativeOpen: true,
                            initiativePosition: { x: pX, y: pY },
                          });
                        }
                      );
                    }
                  }}
                >
                  <Title
                    style={{ bottom: Platform.OS === "ios" ? -2 : undefined }}
                  >
                    {initiative}
                  </Title>
                </InitiativeToken>
              </View>
            </View>
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
        {this.state.initiativePosition ? (
          <Initiative
            startOpen
            position={this.state.initiativePosition}
            initiative={initiative}
            onInitiativeSelect={(newInitiative) => {
              setInitiative(newInitiative, dispatch);
            }}
          />
        ) : null}
      </BackgroundPlain>
    );
  }
}

const mapStateToProps = () => (state) => {
  return {
    ...state.game.games[state.game.currentGameId].gameState,
    initiative: state.game.games[state.game.currentGameId].initiative,
  };
};

export default connect(mapStateToProps())(MortisGame);
