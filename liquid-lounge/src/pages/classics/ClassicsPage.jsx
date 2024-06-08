import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ClassicsPage = () => {
  const [classicDrinks, setClassicDrinks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filteredDrinks, setFilteredDrinks] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('http://localhost:4000/classic', {
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
    <div className='text-center'>
      <h1 className='text-3xl mt-4 mb-4'>Classic Cocktails</h1>
      <input
        className='mb-4'
        type="text"
        placeholder="Search classic drinks..."
        value={searchQuery}
        onChange={handleSearch}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='flex flex-wrap -mx-4'>
          {filteredDrinks.map((drink, index) => (
            <div className='w-full md:w-1/3 mb-8' key={index}>
              <Link to={`/classics/${drink._id}`}>
                <h2 className='text-xl font-bold mb-2'>{drink.name}</h2>
                <img className='h-80 p-2 rounded-full' src={drink.img}></img>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassicsPage;

