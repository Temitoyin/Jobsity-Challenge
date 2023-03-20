import React, { useContext } from "react";

import dayjs from "dayjs";

import GlobalContext from "../../context/GlobalContext/GlobalContext";
import Icon from "../Icon/icon";
import styles from "./Header.module.scss";

/**
 * @returns {React.Component} Calender Header component
 */
const Header = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  /**
   * Handles setting the calender to the previous month
   * @returns {null} null
   */
  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  /**
   * Handles setting the calender to the next month
   * @returns {null} null
   */
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  /**
   * Handles resting the calender to the current month
   * @returns {null} null
   */
  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  };

  return (
    <header className={styles.header}>
      <h1>Calender</h1>
      <div className={styles.header_content}>
        <button onClick={() => handlePrevMonth()} data-testid="prev-button">
          <span>
            <Icon name="chevron-previous" />
          </span>
        </button>
        <button
          className={styles.header_content_todayBtn}
          onClick={() => handleReset()}
          data-testid="Today"
        >
          Today
        </button>

        <button onClick={() => handleNextMonth()} data-testid="next-button">
          <span>
            <Icon name="chevron-next" />
          </span>
        </button>
        <h2>
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </div>
    </header>
  );
};
export default Header;
