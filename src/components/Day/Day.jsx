import React, { useState, useContext, useEffect } from "react";

import dayjs from "dayjs";

import GlobalContext from "../../context/GlobalContext/GlobalContext";
import { composeClasses } from "../../utils/utils";
import styles from "./Day.module.scss";

/**
 * @param {object} day the day object for that day
 * @returns {React.Component} Calender component
 */
const Day = ({ day, monthIndex }) => {
  const [dayEvents, setDayEvents] = useState([]);

  const {
    setDaySelected,
    setShowReminderModal,
    savedReminders,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events =
      savedReminders &&
      savedReminders.filter(
        (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
      );
    setDayEvents(events);
  }, [savedReminders, day]);

  /**
   * Function to get the class name for the current day
   * @returns {object} styles the styles object
   */
  const getCurrentDayClass = () => {
    if (day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")) {
      return styles.day_currentDate;
    } else if (day.$M === monthIndex && day.format("dddd").startsWith("S")) {
      return styles.day_dateWeekend;
    } else if (day.$M !== monthIndex) {
      return styles.day_dateOdd;
    } else {
      return "";
    }
  };

  /**
   * Function to handle showing the reminder modal
   * @param {e} event the event
   * @param {day} day the day object
   * @returns {null} null
   */
  const handleReminderEvent = (e, day) => {
    e.preventDefault();
    setDaySelected(day);
    setShowReminderModal(true);
  };
  return (
    <div
      className={composeClasses(styles.day)}
      onClick={(e) => {
        handleReminderEvent(e, day);
      }}
    >
      <p className={composeClasses(styles.day_date, getCurrentDayClass())}>
        {day.format("DD")}
      </p>
      <div className={styles.day_labelWrapper}>
        {dayEvents.map((evt, idx) => (
          <div
            className={composeClasses(styles.day_label)}
            key={idx}
            onClick={() => setSelectedEvent(evt)}
          >
            {evt.reminder}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Day;
