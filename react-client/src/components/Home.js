import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      Hej
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/product-list">Product List</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
