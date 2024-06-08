import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return ( 
    <div className='text-center'>
    <h1 className='mt-10 font-bold text-5xl'>Welcome to LiquidLounge</h1>
    <p className='mt-5 text-xl'>Explore endless drink possibilities, from classics to creative blends. Cheers to unforgettable moments shared over the perfect sip. Let's start mixing!</p>
    <div className='mt-8'>
      <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-1" to={'/login'}>Log In</Link>
      <Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-1" to={'/signup'}>Sign Up</Link>
    </div>
    <div className="image-container flex flex-col items-center mt-10">
      <img src="https://mixologycrew.com/wp-content/uploads/2019/05/fruit-cocktail-ingredients.jpg" className="w-full max-w-md h-auto rounded-lg mb-4" />
      <img src="https://img.delicious.com.au/F_C2-w6_/w759-h506-cfill/del/2015/11/summer-cocktails-24374-3.jpg" className="w-full max-w-md h-auto rounded-lg mb-4" />
      <img src="https://www.eatthis.com/wp-content/uploads/sites/4/2021/12/cocktails-on-bar.jpg?quality=82&strip=1" className="w-full max-w-md h-auto rounded-lg mb-4" />
    </div>
  </div>
  )
}

export default WelcomePage;
