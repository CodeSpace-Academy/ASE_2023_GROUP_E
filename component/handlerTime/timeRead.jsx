import { FcClock, FcAlarmClock } from 'react-icons/fc';
import { TfiTimer } from 'react-icons/tfi';
import { PiKnifeBold } from 'react-icons/pi';
import { LuAlarmClock } from 'react-icons/lu';
import { BsPerson } from 'react-icons/bs';
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
  return hours + ':' + minutes;
}



export function PrepandCookTime({ recipe }) {
  return (
    <div className={classes.times}>
      <div>
        <FcClock /> Prep: {NumToTime(recipe.prep)}
      </div>

      <div>
        <FcAlarmClock /> Cook: {NumToTime(recipe.cook)}
      </div>
      <div>
        <TfiTimer /> Total Time: {NumToTime(recipe.prep + recipe.cook)}
      </div>
    </div>
  );
}
export function RecipePreviewTimes({ recipe }) {
  return (
    <div className={classes.recipePreviewTimes}>
      <div>
        <PiKnifeBold className={classes.icon} /> Prep: {NumToTime(recipe.prep)}
      </div>

      <div>
        <LuAlarmClock className={classes.icon} /> Cook: {NumToTime(recipe.cook)}
      </div>

      <div>
        <BsPerson className={classes.icon} />
        Servings: {recipe.servings ? recipe.servings : 'n/a'}
      </div>
    </div>
  );
}
