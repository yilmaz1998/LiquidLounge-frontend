import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ClassicsPage = () => {
  const [classicDrinks, setClassicDrinks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filteredDrinks, setFilteredDrinks] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('https://liquid-lounge-acdcda81ea65.herokuapp.com/classic', {
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
      <h1 className='text-3xl font-bold mt-4 mb-4'>Classic Cocktails</h1>
      <input
        className='border-2 border-gray-300 rounded-lg px-4 py-2 mb-4 focus:border-blue-500 focus:outline-none'
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
                <div className='image'>
                    <img className='h-80 p-2 rounded-full' src={drink.img}></img>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassicsPage;

