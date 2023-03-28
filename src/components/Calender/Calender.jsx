import React, { useState, useContext, useEffect } from "react";

import GlobalContext from "../../context/GlobalContext/GlobalContext";
import { getMonth } from "../../utils/utils";
import Header from "../Header/Header";
import Month from "../Month/Month";
import ReminderModal from "../ReminderModal/ReminderModal";
import styles from "./Calender.module.scss";

/**
 * @returns {React.Component} Calender component
 */
export const Calender = () => {
  const { monthIndex, showReminderModal } = useContext(GlobalContext);
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <div className={styles.calender}>
      {showReminderModal && <ReminderModal />}
      <Header />
      <Month month={currentMonth} monthIndex={monthIndex} />
    </div>
  );
};
