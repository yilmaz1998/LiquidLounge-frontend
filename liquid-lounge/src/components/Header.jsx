import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { BiDrink } from "react-icons/bi";

const Header = () => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem('userToken')
  const username = localStorage.getItem('username')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    console.log('Logged out')
    navigate('/login')
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }


  return (
    <nav className="bg-indigo-500 text-white px-4 py-4 flex justify-between items-center">
      <Link className='text-xl' to={'/'}>LiquidLounge</Link>

      <div className="lg:hidden">
        <button onClick={toggleSidebar} className="text-lg">
          {sidebarOpen ? 'X' : <GiHamburgerMenu />}
        </button>
      </div>

      <div className="hidden lg:flex gap-8">
        <Link to={'/classics'} className="hover:text-red-500">See Classics</Link>
        <Link to={'/drink'} className="hover:text-red-500">My Cocktails</Link>
        <Link to={'/drink/new'} className="hover:text-red-500">Make a New Cocktail</Link>
        <Link to={'/otherusers'} className="hover:text-red-500">See Other Users Cocktails</Link>
        <Link to={'/favorite'} className="hover:text-red-500">My Favorites</Link>

        {userToken ? (
          <div className="flex">
            <span className='mr-8'>Welcome, {username}</span>
            <button onClick={handleLogout} className="hover:text-red-500">Logout</button>
          </div>
        ) : (
          <Link to={'/login'} className="hover:text-red-500">Login</Link>
        )}
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-48 md:w-72 bg-indigo-600 text-white transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <button
          className="absolute top-4 right-4 text-lg"
          onClick={toggleSidebar}
        >
          X
        </button>

        <div className="mt-16 flex flex-col gap-6 p-6">
        <Link to={'/classics'} onClick={toggleSidebar} className="hover:text-red-500">See Classics</Link>
        <Link to={'/drink'} onClick={toggleSidebar} className="hover:text-red-500">My Cocktails</Link>
        <Link to={'/drink/new'} onClick={toggleSidebar}className="hover:text-red-500">Make a New Cocktail</Link>
        <Link to={'/otherusers'} onClick={toggleSidebar} className="hover:text-red-500">See Other Users Cocktails</Link>
        <Link to={'/favorite'} onClick={toggleSidebar} className="hover:text-red-500">My Favorites</Link>

        {userToken ? (
          <div className="flex flex-col gap-2">
            <span>Welcome, {username}</span>
            <button onClick={handleLogout} className="-ml-20 mt-2 hover:text-red-500">Logout</button>
          </div>
        ) : (
          <Link to={'/login'} onClick={toggleSidebar} className="hover:text-red-500">Login</Link>
        )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
