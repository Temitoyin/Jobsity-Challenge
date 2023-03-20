import React, { useState, useEffect } from "react";
import { useContext } from "react";

import dayjs from "dayjs";

import GlobalContext from "../../context/GlobalContext/GlobalContext";
import { getMonth } from "../../utils/utils";
import Icon from "../Icon/icon";
import styles from "./SmallCalender.module.scss";
const SmallCalender = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  /**
   * Handles setting the calender to the previous month
   * @returns {null} null
   */
  const handlePrevMonth = (e) => {
    e.preventDefault();
    setCurrentMonthIdx(currentMonthIdx - 1);
  };

  /**
   * Handles setting the calender to the next month
   * @returns {null} null
   */
  const handleNextMonth = (e) => {
    e.preventDefault();
    setCurrentMonthIdx(currentMonthIdx + 1);
  };

  const { monthIndex, setSmallCalenderMonth, daySelected, setDaySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  /**
   * Handles setting the month of the calender and syncing it with the parent calender
   * @returns {null} null
   */
  const handleSetSmallCalenderMonth = (e, day) => {
    e.preventDefault();
    setSmallCalenderMonth(currentMonthIdx);
    setDaySelected(day);
  };

  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return styles.activeDate;
    } else if (currDay === slcDay) {
      return styles.selectedDate;
    } else {
      return "";
    }
  }
  return (
    <div className={styles.smallCalender}>
      <header className={styles.smallCalender_header}>
        <p>
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div>
          <button onClick={(e) => handlePrevMonth(e)}>
            <Icon name="chevron-previous" />
          </button>
          <button onClick={(e) => handleNextMonth(e)}>
            <Icon name="chevron-next" />
          </button>
        </div>
      </header>
      <div className={styles.smallCalender_content}>
        {currentMonth[0].map((day, i) => (
          <span className={styles.dayOfTheWeek} key={i}>
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, i) => (
              <button
                className={getDayClass(day)}
                key={i}
                onClick={(e) => handleSetSmallCalenderMonth(e, day)}
              >
                <span>{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SmallCalender;
