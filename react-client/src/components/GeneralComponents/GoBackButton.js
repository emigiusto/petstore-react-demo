import { Button } from 'bootstrap';
import React from 'react'
import Link from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import MaterialIcon from 'react-google-material-icons'

export default function GoBackButton() {

  const navigate = useNavigate();  

  return (
    <div className="col-sm-12 d-flex justify-content-left px-5 mx-5">
        <button className="goback px-3" onClick = {() => navigate(-1)}><MaterialIcon icon="arrow_back" size={24}/> Go back</button>
    </div>
  )
}
