const initialiseGameType = "INITIALISE_GAME";
const flipActivationType = "FLIP_ACTIVATION";
const addGloryType = "ADD_GLORY";
const removeGloryType = "REMOVE_GLORY";
const flipGloryType = "FLIP_GLORY";
const nextRoundUpdateType = "NEXT_ROUND_UPDATE";
const nextRoundMoveType = "NEXT_ROUND_MOVE";
const previousRoundUpdateType = "PREVIOUS_ROUND_UPDATE";
const previousRoundMoveType = "PREVIOUS_ROUND_MOVE";
const moveToSummaryType = "MOVE_TO_SUMMARY";
const moveBackToGameType = "MOVE_BACK_TO_GAME";
const completeGameType = "COMPLETE_GAME";
const moveToMenuType = "MOVE_TO_MENU";
const moveToGameType = "MOVE_TO_GAME";
const setInitiativeType = "SET_INITIATIVE";
const vsFlipType = "VS_FLIP_GAME";

export const actionTypes = {
  initialiseGameType,
  flipActivationType,
  addGloryType,
  removeGloryType,
  flipGloryType,
  nextRoundUpdateType,
  nextRoundMoveType,
  previousRoundUpdateType,
  previousRoundMoveType,
  moveToSummaryType,
  moveBackToGameType,
  completeGameType,
  moveToMenuType,
  moveToGameType,
  setInitiativeType,
  vsFlipType,
};

export const initialiseGame = (numberOfPlayers, dispatch) => {
  const now = new Date().getTime();
  dispatch({
    type: initialiseGameType,
    numberOfPlayers,
    id: now,
    startDateTime: now,
  });
  dispatch({ type: moveToGameType });
};

export const initialiseMortisGame = (dispatch) => {
  const now = new Date().getTime();
  dispatch({
    type: initialiseGameType,
    numberOfPlayers: 1,
    id: now,
    startDateTime: now,
    isArenaMortis: true,
  });
  dispatch({ type: moveToGameType });
};

export const continueGame = (dispatch) => {
  dispatch({ type: moveToGameType });
};

export const setInitiative = (initiative, dispatch) => {
  dispatch({ type: setInitiativeType, initiative });
};

export const vsFlip = (dispatch) => {
  dispatch({ type: vsFlipType });
};

export const flipActivation = (playerIndex, activationIndex, dispatch) =>
  dispatch({
    type: flipActivationType,
    playerIndex,
    activationIndex,
  });

export const addGlory = (playerIndex, dispatch) => {
  dispatch({
    type: addGloryType,
    playerIndex,
  });
};

export const removeGlory = (playerIndex, dispatch) =>
  dispatch({
    type: removeGloryType,
    playerIndex,
  });

export const flipGlory = (playerIndex, gloryIndex, dispatch) =>
  dispatch({
    type: flipGloryType,
    playerIndex,
    gloryIndex,
  });

export const nextRound = (dispatch) => {
  dispatch({
    type: nextRoundUpdateType,
    updateRound: true,
  });
  dispatch({
    type: nextRoundMoveType,
  });
};

export const previousRound = (dispatch) => {
  dispatch({
    type: previousRoundUpdateType,
  });
  dispatch({
    type: previousRoundMoveType,
  });
};

export const moveToSummary = (dispatch) => {
  dispatch({
    type: nextRoundUpdateType,
    updateRound: false,
  });
  dispatch({
    type: moveToSummaryType,
  });
};

export const moveBackToGame = (dispatch) => {
  dispatch({ type: moveBackToGameType });
};

export const completeGame = (dispatch) => {
  dispatch({
    type: completeGameType,
  });
  dispatch({
    type: moveToMenuType,
  });
};

export const moveToMenu = (dispatch) => {
  dispatch({
    type: moveToMenuType,
  });
};
