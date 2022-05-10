import React from 'react'
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
                        <h1 className="display-3"> 404</h1>
                        <h1> error</h1>
                        <h2> PAGE NOT FOUND</h2>
                        <p>The requested url was not found.<br></br> Please check your url direction.</p>
                        <Link to="/">Go back to Home</Link>
                    </div>
                </div>
            </div>
  )
}

export default NotFound
