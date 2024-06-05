// scrollMiddleware.js
import { TAB_PRESSED, TRIGGER_SCROLL_TO_TOP } from './ActionTypes';

const scrollMiddleware = store => next => action => {
  if (action.type === TAB_PRESSED) {
    const state = store.getState();

    // Prüfe, ob der Benutzer auf den Feed Tab gedrückt hat und ob die Scrollposition nicht 0 ist
    if (action.payload === 'EventFeed' && state.feed.scrollPosition > 0) {
      // Trigger die Aktion zum Zurückscrollen
      store.dispatch({ type: TRIGGER_SCROLL_TO_TOP });
    }
  }

  // Leite alle Aktionen weiter
  return next(action);
};

export default scrollMiddleware;
