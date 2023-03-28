import React from "react";

import { isNotEmptyArray } from "../../utils/utils";
import Day from "../Day/Day";
import { daysOfTheWeek } from "./data";
import styles from "./Month.module.scss";

/**
 * @param {Array} month the month array containing the weeks and days
 * @returns {React.Component} Calender Header component
 */
const Month = ({ month, monthIndex }) => {
  return (
    <div className={styles.month}>
      <div className={styles.month_header}>
        {daysOfTheWeek.map((day, i) => (
          <span key={i}>{day}</span>
        ))}
      </div>
      <div className={styles.month_content}>
        {month &&
          isNotEmptyArray(month) &&
          month.map((row, i) => (
            <React.Fragment key={i}>
              {row &&
                isNotEmptyArray(row) &&
                row.map((day, index) => (
                  <Day
                    day={day}
                    key={index}
                    rowIdx={i}
                    monthIndex={monthIndex}
                  />
                ))}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default Month;
