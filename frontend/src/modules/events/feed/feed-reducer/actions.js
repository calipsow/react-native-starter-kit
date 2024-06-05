// actions.js
import {
  SET_SCROLL_POSITION,
  RESET_SCROLL_TO_TOP,
  TRIGGER_SCROLL_TO_TOP,
  TAB_PRESSED,
} from './ActionTypes';

export const setScrollPosition = position => ({
  type: SET_SCROLL_POSITION,
  payload: position,
});

export const resetScrollToTop = () => ({
  type: RESET_SCROLL_TO_TOP,
});

export const triggerScrollToTop = executeEvent => ({
  type: TRIGGER_SCROLL_TO_TOP,
  payload: executeEvent,
});

export const tabPressed = tabName => ({
  type: TAB_PRESSED,
  payload: tabName,
});
