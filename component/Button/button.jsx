// This file contains reusable button components styled using Bootstrap and custom CSS.//
// It encapsulates various button components for different use cases within the app//
import Link from 'next/link';
import classes from './button.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Button component that renders a styled button.
 * @param {string} text - Text displayed on the button.
 * @param {string} color - Determines the button color using Bootstrap classes.
 *                        Allowed values: 'success' (green), 'warning' (orange), 'danger' (red).
 * @param {Function} click - Click event handler for the button.
 * @returns {JSX.Element} - Rendered button element.
 */
export default function Button({ text, color, click }) {
  return (
    <button onClick={click} type="button" className={`btn btn-${color}`} aria-label={text}>
      {text}
    </button>
  );
}

/**
 * FormButton component that renders a styled form button.
 * @param {string} text - Text displayed on the button.
 * @returns {JSX.Element} - Rendered button element.
 */
export function FormButton({ text }) {
  return <button type="button" className={classes.button}>{text}</button>;
}

/**
 * LinkButton component that renders a styled Next.js Link.
 * @param {string} path - URL path for the link.
 * @param {string} text - Text displayed for the link.
 * @param {Function} click - Click event handler for the link.
 * @returns {JSX.Element} - Rendered Link component.
 */
export function LinkButton({ path, text, click }) {
  return (
    <Link href={path} className={classes.linkbutton} onClick={click}>
      {text}
    </Link>
  );
}

/**
 * BlueButton component that renders a styled blue button.
 * @param {Function} click - Click event handler for the button.
 * @param {string} text - Text displayed on the button.
 * @returns {JSX.Element} - Rendered button element.
 */
export function BlueButton({ click, text }) {
  return (
    <button onClick={click} type="button" className={classes.linkbutton}>
      {text}
    </button>
  );
}

/**
 * WhiteButton component that renders a styled white button.
 * @param {Function} click - Click event handler for the button.
 * @param {string} text - Text displayed on the button.
 * @returns {JSX.Element} - Rendered button element.
 */
export function WhiteButton({ click, text }) {
  return (
    <button onClick={click} type="button" className={classes.whitebutton}>
      {text}
    </button>
  );
}
