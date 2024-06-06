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
    <header className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
      <div>
        <Link to={'/classics'} className="mr-4">See Classic Cocktails</Link>
        <Link to={'/drink'} className="mr-4">My Cocktails</Link>
        <Link to={'/drink/new'} className="mr-4">Make a New Cocktail</Link>
        <Link to={'/otherusers'} className="mr-4">See Other Users Cocktails</Link>
        <Link to={'/favorite'}>My Favorites</Link>
      </div>
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Logout</button>
    </header>
  )
}

export default Header