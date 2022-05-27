import { Link } from "react-router-dom";

function LoginLogoutButton(props) {
  if (props.userId === null) {
    return (
      <Link
        to="/login"
        className="text-capitalize text-decoration-none d-flex align-items-center text-secondary"
      >
        Login
      </Link>
    );
  } else {
    return (
      <div
        onClick={props.signout}
        className="text-capitalize text-decoration-none d-flex align-items-center text-secondary"
      >
        <span role="button">Logout</span>
      </div>
    );
  }
}

export default LoginLogoutButton;
