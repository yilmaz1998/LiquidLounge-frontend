import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem('userToken')
  const username = localStorage.getItem('username')

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    console.log('Logged out')
    navigate('/login')
  }

  return (
    <header className="bg-indigo-500 text-white py-4 px-6 flex flex-col sm:flex-row justify-between items-center">
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        <Link to={'/classics'} className="sm:mb-0 sm:mr-6">See Classics</Link>
        <Link to={'/drink'} className="sm:mb-0 sm:mr-6">My Cocktails</Link>
        <Link to={'/drink/new'} className="sm:mb-0 sm:mr-6">Make a New Cocktail</Link>
        <Link to={'/otherusers'} className="sm:mb-0 sm:mr-6">See Other Users Cocktails</Link>
        <Link to={'/favorite'}>My Favorites</Link>
      </div>
      {userToken ? (
        <div className="flex flex-col sm:flex-row items-center">
          <span className="mr-2 mb-2 sm:mb-0">Welcome, {username}</span>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Logout</button>
        </div>
      ) : (
        <Link to={'/login'} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-2 sm:mt-0">Login</Link>
      )}
    </header>
  );
};

export default Header;
