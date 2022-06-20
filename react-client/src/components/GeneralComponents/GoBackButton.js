import React from 'react'
import { useNavigate } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../Checkout/Checkout.css'

export default function GoBackButton() {

  const navigate = useNavigate();  

  return (
    <div className="col-sm-12 d-flex justify-content-left px-5 mx-5">
        <div className="goback px-3" onClick = {() => navigate(-1)}> <FontAwesomeIcon icon={faArrowLeft} />Go back</div> 
    </div>
  )
}
