import { FcClock, FcAlarmClock } from 'react-icons/fc';
import { TfiTimer } from 'react-icons/tfi';
import { PiKnifeBold } from 'react-icons/pi';
import { LuAlarmClock } from 'react-icons/lu';
import { BsPerson } from 'react-icons/bs';
import classes from './timeRead.module.css';

// the function changes number to a time format

export default function NumToTime(num) {
  let hours = Math.floor(num / 60);
  let minutes = num % 60;
  if (minutes + ''.length < 2) {
    minutes = '0' + minutes;
  }
  // enable the return to display h for hours and min for minuetes
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
