import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import app from '../modules/AppState';
import calendar from '../modules/calendar/CalendarState';

export default combineReducers({
  // ## Generator Reducers
  app,
  calendar,
});
