import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = () => {
  return ( 
     <div>
    <h1>Welcome to LiquidLounge</h1>
    <Link to={'/login'}>Log In</Link>
    <Link to={'/signup'}>Sign Up</Link>
    </div>
  )
}

export default WelcomePage