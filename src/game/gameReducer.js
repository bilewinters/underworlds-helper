import { deepClone } from "@/utils";
import { naviagationService } from "../navigationService";
import { actionTypes } from "./gameReducerActions";

const getPlayerState = (state, playerIndex) =>
  state.games[state.currentGameId].gameState.players.find(
    (player) => player.playerIndex === playerIndex
  );

const initialisePlayer = (playerIndex, isArenaMortis) => ({
  playerIndex,
  activations: new Array(isArenaMortis ? 9 : 12).fill(false),
  glory: [],
});

const newGame = (id, startDateTime, numberOfPlayers, isArenaMortis) => ({
  id,
  startDateTime,
  numberOfPlayers,
  isArenaMortis,
  initiative: 6,
  gameState: {
    round: 1,
    complete: false,
    vs: false,
    roundEndTimes: [],
    players: new Array(numberOfPlayers)
      .fill(undefined)
      .map((_, playerIndex) => initialisePlayer(playerIndex, isArenaMortis)),
  },
  history: [],
});

const reducer = (state = { games: {} }, action) => {
  const { games } = state;
  switch (action.type) {
    case actionTypes.initialiseGameType: {
      const { id, startDateTime, numberOfPlayers, isArenaMortis } = action;
      return {
        ...state,
        currentGameId: id,
        games: {
          ...games,
          [id]: newGame(id, startDateTime, numberOfPlayers, isArenaMortis),
        },
      };
    }
    case actionTypes.moveToGameType: {
      if (state.games[state.currentGameId].isArenaMortis) {
        naviagationService.navigateTo(`mortis`);
      } else {
        naviagationService.navigateTo(
          `round${state.games[state.currentGameId].gameState.round}`
        );
      }
      return state;
    }
    case actionTypes.setInitiativeType: {
      const newState = deepClone(state);
      newState.games[state.currentGameId].initiative = action.initiative;
      return newState;
    }
    case actionTypes.flipActivationType: {
      const newState = deepClone(state);
      const playerState = getPlayerState(newState, action.playerIndex);
      playerState.activations[action.activationIndex] = !playerState
        .activations[action.activationIndex];
      return newState;
    }
    case actionTypes.addGloryType: {
      const newState = deepClone(state);
      const playerState = getPlayerState(newState, action.playerIndex);
      playerState.glory.push(false);
      return newState;
    }
    case actionTypes.removeGloryType: {
      const newState = deepClone(state);
      const playerState = getPlayerState(newState, action.playerIndex);
      playerState.glory.pop();
      return newState;
    }
    case actionTypes.flipGloryType: {
      const newState = deepClone(state);
      const playerState = getPlayerState(newState, action.playerIndex);
      playerState.glory[action.gloryIndex] = !playerState.glory[
        action.gloryIndex
      ];
      return newState;
    }
    case actionTypes.nextRoundUpdateType: {
      const newState = deepClone(state);
      const { round: currentRound, roundEndTimes } = newState.games[newState.currentGameId].gameState;
      if (action.updateRound) {
        newState.games[newState.currentGameId].gameState.round = currentRound + 1;
      }
      if (roundEndTimes) {
        roundEndTimes[currentRound - 1] = (Date.now()/1000)*1000;
      }
      return newState;
    }
    case actionTypes.nextRoundMoveType: {
      naviagationService.navigateTo(
        `round${state.games[state.currentGameId].gameState.round}`
      );
      return state;
    }
    case actionTypes.previousRoundUpdateType: {
      const newState = deepClone(state);
      const { round } = newState.games[newState.currentGameId].gameState;
      newState.games[newState.currentGameId].gameState.round =
        round > 1 ? round - 1 : round;
      return newState;
    }
    case actionTypes.previousRoundMoveType: {
      naviagationService.goBack();
      return state;
    }
    case actionTypes.moveToSummaryType: {
      naviagationService.navigateTo("summary");
      return state;
    }
    case actionTypes.moveBackToGameType: {
      naviagationService.goBack();
      return state;
    }
    case actionTypes.vsFlipType: {
      const { vs } = state.games[state.currentGameId].gameState;
      const newState = deepClone(state);
      newState.games[newState.currentGameId].gameState.vs = !vs;
      return newState;
    }
    case actionTypes.completeGameType: {
      const newState = deepClone(state);
      newState.games[newState.currentGameId].gameState.complete = true;
      return newState;
    }
    case actionTypes.moveToMenuType: {
      naviagationService.goToMenu();
      return state;
    }
    default:
      return state;
  }
};

export default reducer;
