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
    fetch(`http://localhost:3000/drink/${id}`, {
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

    fetch(`http://localhost:3000/drink/${id}`, {
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
    <div>
      <h2>Edit Drink</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <textarea value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Image URL:
          <textarea value={img} onChange={(e) => setImg(e.target.value)} />
        </label>
        <label>
          Ingredients:
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
        </label>
        <label>
          Method:
          <textarea value={method} onChange={(e) => setMethod(e.target.value)} />
        </label>
        <button type="submit">Save Changes</button>
        <Link to={`/drink`}>
            Go Back
          </Link>
      </form>
    </div>
  );
};

export default EditDrink
