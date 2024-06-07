import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ClassicsPage = () => {
  const [classicDrinks, setClassicDrinks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filteredDrinks, setFilteredDrinks] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/classic', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Failed to fetch')
        }
      })
      .then((data) => {setClassicDrinks(data)
        setFilteredDrinks(data)})
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setIsLoading(false))
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase()
    setSearchQuery(query)
    const filtered = classicDrinks.filter((drink) =>
      drink.name.toLowerCase().includes(query)
    )
    setFilteredDrinks(filtered)
  };

  return (
    <div>
      <h1 className='text-3xl'>Classic Cocktails</h1>
      <input
        type="text"
        placeholder="Search classic drinks..."
        value={searchQuery}
        onChange={handleSearch}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredDrinks.map((drink, index) => (
            <li key={index}>
              <Link to={`/classics/${drink._id}`}>
                <h2>{drink.name}</h2>
                <img src={drink.img}></img>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClassicsPage;

