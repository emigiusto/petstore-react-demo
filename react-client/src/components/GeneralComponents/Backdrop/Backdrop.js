import classes from "./Backdrop.module.css";
import { Link } from "react-router-dom";

function Backdrop(props) {
  return (
    <div className={classes.backdrop} onClick={props.onClick}>
    </div>
  );
}

export default Backdrop;
