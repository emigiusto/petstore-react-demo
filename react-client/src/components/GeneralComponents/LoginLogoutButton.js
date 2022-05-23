import { Link } from "react-router-dom";
import { ProductConsumer } from "../../context";

function LoginLogoutButton(props) {
  if (props.userID === null) {
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
      <ProductConsumer>
        {(context) => {
          return (
            <div
              onClick={context.signout}
              className="text-capitalize text-reset text-decoration-none d-flex align-items-center mx-4"
            >
              Logout
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}

export default LoginLogoutButton;
