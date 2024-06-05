import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    console.log('Logged out')
    navigate('/login')
  }


  return (
    <div>
    <Link to={'classics'}>See Classic Cocktails</Link>
    <Link to={'/drink'}>My Cocktails</Link>
    <Link to={'/drink/new'}>Make a New Cocktail</Link>
    <Link to={'/otherusers'}>See Other Users Cocktails</Link>
    <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Header