import classes from './button.module.css'
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


export default function Button({text, color, click}){
    return(
        <button onClick={click} type="button" className={`btn btn-${color}`}>{text}</button>
    )
}
