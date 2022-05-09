import classes from "./Backdrop.module.css";
import { Link } from "react-router-dom";

function Backdrop(props) {
  return (
    <div className={classes.backdrop} onClick={props.onCancel}>
      <Link to="/" />
    </div>
  );
}

export default Backdrop;
