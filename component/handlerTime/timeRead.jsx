import { PiKnifeBold } from 'react-icons/pi';
import { LuAlarmClock } from 'react-icons/lu';
import { PiCookingPotBold } from 'react-icons/pi';
import classes from './timeRead.module.css';

/**
 * Changes the time from seconds to an hours and minutes format
 * @param {Number} num Amount of time in seconds
 * @returns {String} hours : minutes string format
 */

export default function NumToTime(num) {
  let hours = Math.floor(num / 60);
  let minutes = num % 60;
  // Puts a zero before the minute value if it is
  // less than 10
  if (minutes + ''.length < 2) {
    minutes = '0' + minutes;
  }
  // returns string that seperates the hours and minutes
  // with a :  return hours + ':' + minutes;
  return `${hours} hr : ${minutes} min`;
}
/**
 * Displays preparation, cook and total time as string with
 * icons next to them.
 * @param {Object} recipe Single recipe object
 *  @returns {JSX.Element} Div containing the times and icons
 */
export function PrepandCookTime({ recipe }) {
  return (
    <div className={classes.times}>
      <div className={classes.IconTimeContainer}>
        <PiKnifeBold className={classes.icon} /> Prep: {NumToTime(recipe.prep)}
      </div>

      <div className={classes.IconTimeContainer}>
        <PiCookingPotBold className={classes.icon} /> Cook:
        {NumToTime(recipe.cook)}
      </div>
      <div className={classes.IconTimeContainer}>
        <LuAlarmClock className={classes.icon} /> Total Time:
        {NumToTime(recipe.prep + recipe.cook)}
      </div>
    </div>
  );
}
