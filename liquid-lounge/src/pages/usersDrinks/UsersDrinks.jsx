import React, { useState, useEffect }from 'react'
import { Link } from 'react-router-dom'

const UsersDrinks = () => {
  const [OthersDrinks, setOthersDrinks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsLoggedIn(true);
      fetch('http://localhost:3000/drink/others', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Failed to fetch')
          }
        })
        .then((data) => setDrinks(data))
        .catch((error) => console.error('Error fetching data:', error))
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, []);

  return (
    <div>
    <h1 className='text-3xl'>Other Users Cocktails</h1>
    {isLoggedIn ? (
      isLoading ? (
      <p>Loading...</p>
    ) : (
      <ul>
        {OthersDrinks.map((drink, index) => (
          <li className='p-3' key={index}>
            <Link to={`/otherusers/${drink._id}`}>
              <h2>{drink.name}</h2>
              <img src={drink.img}></img>
              <h2>Created By{drink.user.username}</h2>
            </Link>
          </li>
        ))}
      </ul>
    )
    ) : (
      <p>Please log in to view other users cocktails.</p>
    )}
  </div>
  )
}

export default UsersDrinks