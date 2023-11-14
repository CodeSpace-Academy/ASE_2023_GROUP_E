/* eslint-disable react/button-has-type */
import Link from 'next/link';
import classes from './button.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 *
 * @param {*} param0
 *
 *
 *  {@link color} if you want to change the color of the button use :
 * success for green
 * warning for orange
 * danger for red
 *
 * visit bootstrap to learn more colors to use
 */

export default function Button({ text, color, click }) {
  return (
    <button onClick={click} type="button" className={`btn btn-${color}`}>{text}</button>
  );
}

export function FormButton({ text }) {
  return <button className={classes.button}>{text}</button>;
}

export function LinkButton({ path, text, click }) {
  return <Link href={path} className={classes.linkbutton} onClick={click}>{text}</Link>;
}

export function BlueButton({ click, text }) {
  return <button onClick={click} className={classes.linkbutton}>{text}</button>;
}

export function WhiteButton({ click, text }) {
  return <button onClick={click} class={classes.whitebutton} role="button">{text}</button>;
}
