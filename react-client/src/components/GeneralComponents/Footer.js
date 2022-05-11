import React from 'react'
import {Link} from 'react-router-dom';

export default function Footer() {
  return (
    <div>
    <ul className="nav justify-content-center border-bottom pb-3 mb-3 navbar-fixed-bottom">
    <li className="nav-item"><Link to="/" className="nav-link px-2 text-muted">Home</Link></li>
    <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Imprint</Link></li>
    <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">About</Link></li>
    </ul>
    <p className="text-center text-muted">© 2022 Pet Store</p>
    </div>
  )
}
