import { Actions } from 'react-native-router-flux';
import { deepClone } from '@/utils';

const initialiseGameType = 'INITIALISE_GAME';
const flipActivationType = 'FLIP_ACTIVATION';
const addGloryType = 'ADD_GLORY';
const removeGloryType = 'REMOVE_GLORY';
const flipGloryType = 'FLIP_GLORY';
const nextRoundUpdateType = 'NEXT_ROUND_UPDATE';
const nextRoundMoveType = 'NEXT_ROUND_MOVE';
const previousRoundUpdateType = 'PREVIOUS_ROUND_UPDATE';
const previousRoundMoveType = 'PREVIOUS_ROUND_MOVE';
const moveToSummaryType = 'MOVE_TO_SUMMARY';
const moveBackToGameType = 'MOVE_BACK_TO_GAME';
const completeGameType = 'COMPLETE_GAME';
const moveToMenuType = 'MOVE_TO_MENU';
const moveToGameType = 'MOVE_TO_GAME';

const initialiseGame = (numberOfPlayers, dispatch) => {
  const now = new Date().getTime();
  dispatch({
    type: initialiseGameType,
    numberOfPlayers,
    id: now,
    startDateTime: now,
  });
  dispatch({ type: moveToGameType });
};

const continueGame = dispatch => {
  dispatch({ type: moveToGameType });
};

const flipActivation = (playerIndex, activationIndex, dispatch) =>
  dispatch({
    type: flipActivationType,
    playerIndex,
    activationIndex,
  });

const addGlory = (playerIndex, dispatch) => {
  dispatch({
    type: addGloryType,
    playerIndex,
  });
};

const removeGlory = (playerIndex, dispatch) =>
  dispatch({
    type: removeGloryType,
    playerIndex,
  });

const flipGlory = (playerIndex, gloryIndex, dispatch) =>
  dispatch({
    type: flipGloryType,
    playerIndex,
    gloryIndex,
  });

const nextRound = dispatch => {
  dispatch({
    type: nextRoundUpdateType,
  });
  dispatch({
    type: nextRoundMoveType,
  });
};

const previousRound = dispatch => {
  dispatch({
    type: previousRoundUpdateType,
  });
  dispatch({
    type: previousRoundMoveType,
  });
};

const moveToSummary = dispatch => {
  dispatch({
    type: moveToSummaryType,
  });
};

const moveBackToGame = dispatch => {
  dispatch({ type: moveBackToGameType });
};

const completeGame = dispatch => {
  dispatch({
    type: completeGameType,
  });
  dispatch({
    type: moveToMenuType,
  });
};

const moveToMenu = dispatch => {
  dispatch({
    type: moveToMenuType,
  });
};

const getPlayerState = (state, playerIndex) =>
  state.games[state.currentGameId].gameState.players.find(
    player => player.playerIndex === playerIndex,
  );

const initialisePlayer = playerIndex => ({
  playerIndex,
  activations: new Array(12).fill(false),
  glory: [],
});

const newGame = (id, startDateTime, numberOfPlayers) => ({
  id,
  startDateTime,
  numberOfPlayers,
  gameState: {
    round: 1,
    complete: false,
    players: new Array(numberOfPlayers)
      .fill(undefined)
      .map((_, playerIndex) => initialisePlayer(playerIndex)),
  },
  history: [],
});

const reducer = (state = { games: {} }, action) => {
  const { games } = state;
  switch (action.type) {
    case initialiseGameType: {
      const { id, startDateTime, numberOfPlayers } = action;
      return {
        ...state,
        currentGameId: id,
        games: { ...games, [id]: newGame(id, startDateTime, numberOfPlayers) },
      };
    }
    case moveToGameType: {
      Actions.game();
      return state;
    }
    case flipActivationType: {
      const newState = deepClone(state);
      const playerState = getPlayerState(newState, action.playerIndex);
      playerState.activations[action.activationIndex] = !playerState.activations[
        action.activationIndex
      ];
      return newState;
    }
    case addGloryType: {
      const newState = deepClone(state);
      const playerState = getPlayerState(newState, action.playerIndex);
      playerState.glory.push(false);
      return newState;
    }
    case removeGloryType: {
      const newState = deepClone(state);
      const playerState = getPlayerState(newState, action.playerIndex);
      playerState.glory.pop();
      return newState;
    }
    case flipGloryType: {
      const newState = deepClone(state);
      const playerState = getPlayerState(newState, action.playerIndex);
      playerState.glory[action.gloryIndex] = !playerState.glory[action.gloryIndex];
      return newState;
    }
    case nextRoundUpdateType: {
      const newState = deepClone(state);
      newState.games[newState.currentGameId].gameState.round += 1;
      return newState;
    }
    case nextRoundMoveType: {
      Actions.game();
      return state;
    }
    case previousRoundUpdateType: {
      const newState = deepClone(state);
      const { round } = newState.games[newState.currentGameId].gameState;
      newState.games[newState.currentGameId].gameState.round = round > 1 ? round - 1 : round;
      return newState;
    }
    case previousRoundMoveType: {
      Actions.pop();
      return state;
    }
    case moveToSummaryType: {
      Actions.summary();
      return state;
    }
    case moveBackToGameType: {
      Actions.pop();
      return state;
    }
    case completeGameType: {
      const newState = deepClone(state);
      newState.games[newState.currentGameId].gameState.complete = true;
      return newState;
    }
    case moveToMenuType: {
      Actions.popTo('menu');
      return state;
    }
    default:
      return state;
  }
};

export default reducer;

export {
  initialiseGame,
  continueGame,
  flipActivation,
  addGlory,
  removeGlory,
  flipGlory,
  nextRound,
  previousRound,
  moveToSummary,
  moveBackToGame,
  completeGame,
  moveToMenu,
};
