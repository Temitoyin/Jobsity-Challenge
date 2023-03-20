import dayjs from "dayjs";

/**
 * Checks if an array is empty
 * @param {Int} month the value of months requried
 * @returns {Array} Array of the required months and their date
 */
export function getMonth(month = dayjs().month()) {
  //This was done to convert the decimal number created in the reset func
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}

/**
 * Checks if an array is empty
 * @param {Array} arr Array to be tested
 * @returns {Boolean} Boolean value
 */
export const isNotEmptyArray = (arr) => Array.isArray(arr) && arr.length > 0;

/**
 * Compose a number of styles together easily
 * @param {String} styles Classes/styles to be applied
 * @returns {String} Combined classes
 */
export const composeClasses = (...styles) => {
  let classes = "";

  styles.forEach((arg) => {
    if (arg) classes += `${arg} `;
  });

  return classes.trim();
};
