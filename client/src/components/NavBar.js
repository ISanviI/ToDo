import React from 'react'
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <>
      <ul id="navbar_list">
      <li> <Link className='navbar-link' to="/"> Home </Link></li>
      <li> <Link className='navbar-link' to="/profile"> Profile </Link></li>
    </ul>
    </>
  )
}

export default NavBar