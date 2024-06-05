// reducer.js
import {
  SET_SCROLL_POSITION,
  RESET_SCROLL_TO_TOP,
  TRIGGER_SCROLL_TO_TOP,
  TAB_PRESSED,
} from './ActionTypes';

const initialState = {
  scrollPosition: 0,
  scrollToTopTriggered: false,
};

const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCROLL_POSITION:
      return {
        ...state,
        scrollPosition: action.payload,
      };
    case RESET_SCROLL_TO_TOP:
      return {
        ...state,
        scrollToTopTriggered: false,
      };
    case TRIGGER_SCROLL_TO_TOP:
      return {
        ...state,
        scrollToTopTriggered: action.payload,
      };
    case TAB_PRESSED:
      return {
        ...state,
        scrollToTopTriggered: state.scrollPosition > 0,
      };
    default:
      return state;
  }
};

export default feedReducer;
