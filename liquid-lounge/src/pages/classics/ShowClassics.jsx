import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ShowClassics = () => {
  const { id } = useParams()
  const [classicDrink, setClassicDrink] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:3000/classic/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to fetch');
        }
      })
      .then((data) => setClassicDrink(data))
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setIsLoading(false))
  }, [id])

  return (
    <div>
      <h1>Classic Cocktail Details</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : classicDrink ? (
        <div>
          <h2>{classicDrink.name}</h2>
          <img src={classicDrink.img}></img>
          <p>{classicDrink.ingredients}</p>
          <p>{classicDrink.method}</p>
        </div>
      ) : (
        <p>No data found for this classic cocktail.</p>
      )}
    </div>
  );
};

export default ShowClassics;
