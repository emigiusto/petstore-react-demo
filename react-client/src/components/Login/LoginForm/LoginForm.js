import { useRef } from "react";

function LoginForm() {
  const emailAdress = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const enteredEmailAdress = emailAdress.current.value;

    console.log(enteredEmailAdress);
  }

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="email">E-Mail Adress</label>
      <input type="text" required id="email" ref={emailAdress}></input>
      <button>Submit</button>
    </form>
  );
}

export default LoginForm;
