import { combineReducers } from 'redux';
import systemReducer from '@/system/systemReducer';
import gameReducer from '@/game/gameReducer';

export default combineReducers({
  system: systemReducer,
  game: gameReducer,
});
