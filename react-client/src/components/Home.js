import React from "react";
import { Link } from 'react-router-dom';
import Register from "./Register/Register"

function Home() {

  return (
    <div>
      Hej
      <Link to="/register">Register</Link>
    
    </div>
  );
}

export default Home;
