function SuccessAlert(props) {
  if (props.state.success) {
    return (
      <div className="alert alert-success" role="alert">
        {props.state.text}
      </div>
    );
  } else {
    return (
      <div className="alert alert-danger" role="alert">
        {props.state.text}
      </div>
    );
  }
}

export default SuccessAlert;
