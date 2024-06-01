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
    <button onClick={handleLogout} className="text-left w-full px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white focus:outline-none">Logout</button>
  )
}

export default Header