import { Link } from "react-router-dom";

function LoginLogoutButton(props) {
  if (props.userId === null) {
    return (
      <Link
        to="/login"
        className="text-capitalize text-reset text-decoration-none d-flex align-items-center mx-4"
      >
        Login
      </Link>
    );
  } else {
    return (
      <div
        onClick={props.signout}
        className="text-capitalize text-reset text-decoration-none d-flex align-items-center mx-4"
      >
        <span role="button">Logout</span>
      </div>
    );
  }
}

export default LoginLogoutButton;
