import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const NewDrink = () => {
  const [name, setName] = useState("")
  const [img, setImg] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [method, setMethod] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`http://localhost:3000/drink/new`, {
      method: "POST",
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
          if (res.status === 401) {
            throw new Error("You need to log in")
          } else {
            throw new Error("Failed to create.")
          }
        }
      })
      .then(() => {
        navigate("/drink")
      })
      .catch((error) => {
        console.error("Error:", error)
        setError(error.message)
      })
  };

  return (
    <div>
      <h2>Add New Drink</h2>
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
        <button type="submit">Add Drink</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  )
}

export default NewDrink;
