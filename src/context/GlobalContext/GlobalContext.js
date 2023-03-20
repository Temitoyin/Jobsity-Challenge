import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  showReminderModal: true,
  setShowReminderModal: () => {},
  smallCalenderMonth: 0,
  setSmallCalenderMonth: () => {},
  daySelected: null,
  setDaySelected: () => {},
  savedReminders: [],
  dispatchCalEvent: (type, payload) => {},
  selectedEvent: null,
  setSelectedEvent: () => {},
});

export default GlobalContext;
