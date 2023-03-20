import React, { useState, useContext, useEffect } from "react";
import TimePicker from "react-time-picker";

import { ApiRequestClient } from "../../api/ApiClinient";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import Icon from "../Icon/icon";
import SmallCalender from "../SmallCalender/SmallCalender";
import styles from "./ReminderModal.module.scss";

/**
 * @returns {React.Component} Calender Header component
 */
const ReminderModal = () => {
  const { setShowReminderModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);
  const [weatherText, setWeatherText] = useState(
    selectedEvent ? selectedEvent.weatherText : ""
  );
  const [reminder, setReminder] = useState(
    selectedEvent ? selectedEvent.reminder : ""
  );
  const [showSmallCallender, setShowSmallCalender] = useState(false);
  const [city, setCity] = useState(selectedEvent ? selectedEvent.city : "");
  const [time, setTime] = useState(
    selectedEvent ? selectedEvent.time : new Date()
  );
  const [error, setError] = useState("");
  useEffect(() => {
    setShowSmallCalender(false);
  }, [daySelected]);

  const handleWeatherCall = async (e) => {
    e.preventDefault();
    try {
      await ApiRequestClient.get(
        `${process.env.REACT_APP_WEATHER_BASE_URL}${city}/${daySelected
          .format("YYYY MM DD")
          .replaceAll(" ", "-")}/?key=${process.env.REACT_APP_WEATHER_KEY}`
      ).then((res) => {
        const weatherText =
          res && res.data && res.data.days[0] && res.data.days[0].conditions;
        setWeatherText(weatherText);
        handleSubmit(e, weatherText);
      });
    } catch (error) {
      setError(error.response.data);
      throw new Error(error);
    }
  };
  /**xw
   * The handle submit function for the reminder modal
   * @param {e} e the DOM Event
   * @returns {null} null
   */
  const handleSubmit = async (e, weatherText) => {
    e.preventDefault();

    const calenderEvent = {
      reminder,
      city: city,
      weatherText: weatherText,
      day: daySelected.valueOf(),
      time: time,
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calenderEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calenderEvent });
    }
    setError("");
    setShowReminderModal(false);
  };
  return (
    <div className={styles.reminderModal}>
      <form className={styles.reminderModal_form}>
        <header className={styles.reminderModal_form_header}>
          <p>{weatherText}</p>
          <div className={styles.reminderModal_form_headerLeft}>
            {selectedEvent && (
              <button
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowReminderModal(false);
                }}
              >
                <Icon name="trash" />
              </button>
            )}

            <button onClick={() => setShowReminderModal(false)}>
              <Icon name="close" />
            </button>
          </div>
        </header>
        <div className={styles.reminderModal_form_content}>
          <div>
            <input
              className={styles.input}
              type="text"
              maxLength={30}
              required
              value={reminder}
              placeholder="Add Reminder"
              onChange={(e) => setReminder(e.target.value)}
            />
          </div>
          <div>
            {error && <span className={styles.error}>{error}</span>}
            <input
              onChange={(e) => setCity(e.target.value)}
              value={city}
              className={styles.input}
              required
              type="text"
              placeholder="Add City"
            />
          </div>
          <div className={styles.reminderModal_form_contentDateTime}>
            <div onClick={() => setShowSmallCalender(!showSmallCallender)}>
              {daySelected.format("DD MMMM YYYY")}
            </div>
            <div>
              <TimePicker
                disableClock
                className={styles.timePicker}
                onChange={setTime}
                value={time}
              />
            </div>
          </div>

          {showSmallCallender && <SmallCalender />}
        </div>
        <footer className={styles.reminderModal_form_footer}>
          <button type="submit" onClick={(e) => handleWeatherCall(e)}>
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default ReminderModal;
