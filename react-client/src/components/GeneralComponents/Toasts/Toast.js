import React, { useState, useEffect } from "react";

export default function Toast(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true)
    setTimeout(function () {
        setShow(false);
    }, 5000);
  }, [props.category, props.message, props.show]);

  return (
    <>
      { show ? (<div className={`alert alert-${props.category}`} role="alert">{props.message}</div>) : <></>}
    </>
  );
}