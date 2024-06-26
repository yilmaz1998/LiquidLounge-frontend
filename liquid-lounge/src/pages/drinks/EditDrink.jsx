import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

const EditDrink = () => {
  const { id } = useParams()
  const [name, setName] = useState("")
  const [img, setImg] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [method, setMethod] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://liquid-lounge-acdcda81ea65.herokuapp.com/drink/${id}`, {
      headers: {
        Authorization: localStorage.getItem("userToken"),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Failed to fetch drink')
        }
      })
      .then((data) => {
        setName(data.name)
        setImg(data.img)
        setIngredients(data.ingredients)
        setMethod(data.method)
      })
      .catch((error) => console.error('Error fetching drink data:', error))
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`https://liquid-lounge-acdcda81ea65.herokuapp.com/drink/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("userToken")
      },
      body: JSON.stringify({ name, img, ingredients, method }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error("Failed to update.")
        }
      })
      .then(() => {
        navigate("/drink")
      })
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div className='login-page text-center'>
      <h2 className='text-3xl font-bold mb-4'>Edit Drink</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          <span className="text-gray-700 font-bold">Name:</span>
          <input className='form-input mt-1 block w-full border rounded py-2 px-3' value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="block mb-4">
        <span className="text-gray-700 font-bold">Image URL:</span>
          <textarea className='form-input mt-1 block w-full border rounded py-2 px-3' value={img} onChange={(e) => setImg(e.target.value)} />
        </label>
        <label>
        <span className="text-gray-700 font-bold">Ingredients:</span>
          <textarea className='form-input mt-1 block w-full border rounded py-2 px-3' value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        </label>
        <label>
        <span className="text-gray-700 font-bold">Method:</span>
          <textarea className='form-input mt-1 block w-full border rounded py-2 px-3' value={method} onChange={(e) => setMethod(e.target.value)} />
        </label>
        <div className='mt-3 flex flex-col items-center justify-center'>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">Save Changes</button>
        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3" to={`/drink`}>
            Go Back
          </Link></div>
      </form>
    </div>
  );
};

export default EditDrink
