import React, { useState, useEffect, useReducer } from "react";

import dayjs from "dayjs";

import GlobalContext from "../GlobalContext/GlobalContext";

/**
 * The saved reminders reducer
 * @param {Array} state the state of the savedReminders
 * @param {string} type the type of action being dispatched
 * @param {object} payload the payload being dispatched
 * @returns {null} null
 */
const savedRemindersReducer = (state, { type, payload }) => {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
};

/**
 * Handles setting the calender to the next month
 * @returns {Array} Array of parsed Reminders
 */
const initEvents = () => {
  const storageReminders = localStorage.getItem("savedReminders");
  const parsedReminders = storageReminders ? JSON.parse(storageReminders) : [];
  return parsedReminders;
};
const ContextWrapper = (props) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [smallCalenderMonth, setSmallCalenderMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(null);
  const [savedReminders, dispatchCalEvent] = useReducer(
    savedRemindersReducer,
    [],
    initEvents
  );

  useEffect(() => {
    localStorage.setItem("savedReminders", JSON.stringify(savedReminders));
  }, [savedReminders]);

  useEffect(() => {
    if (smallCalenderMonth !== null) {
      setMonthIndex(smallCalenderMonth);
    }
  }, [smallCalenderMonth]);

  useEffect(() => {
    if (!showReminderModal) {
      setSelectedEvent(null);
    }
  }, [showReminderModal]);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        showReminderModal,
        setShowReminderModal,
        smallCalenderMonth,
        setSmallCalenderMonth,
        daySelected,
        savedReminders,
        setDaySelected,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
