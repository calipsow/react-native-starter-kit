import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadItems } from './CalendarState';
import CalendarScreen from './CalendarView';

const CalendarContainer = () => {
  const items = useSelector(state => state.calendar.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadItems());
  }, [dispatch]);

  // Assuming CalendarScreen needs the items and the loadItems action:
  return (
    <CalendarScreen items={items} loadItems={() => dispatch(loadItems())} />
  );
};

export default CalendarContainer;
