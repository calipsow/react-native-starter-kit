import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import gallery from '../modules/gallery/GalleryState';
import app from '../modules/AppState';
import calendar from '../modules/calendar/CalendarState';
import feed from '../modules/events/feed/feed-reducer/reducer';

export default combineReducers({
  // ## Generator Reducers
  gallery,
  app,
  calendar,
  feed,
});
