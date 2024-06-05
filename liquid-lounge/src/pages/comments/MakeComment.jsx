import React, { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

const MakeComment = () => {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`http://localhost:3000/comment/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("userToken")
      },
      body: JSON.stringify({ title, comment, drinkId: id }),
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        if (res.status === 401) {
          throw new Error("You need to log in")
        } else {
          throw new Error("Please fill in both title and comment fields.")
        }
      }
    })
    .then(() => {
      navigate(`/otherusers/${id}`)
    })
    .catch((error) => {
      console.error("Error:", error)
      setError(error.message)
    })
  }
  return (
    <div>
      <h2>Add Comment </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <textarea value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Comment:
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <button type="submit">Add Comment</button>
      </form>
      {error && <p>{error}</p>} 
     <Link to={`/otherusers/${id}`}>Go Back </Link>
    </div>
    
  )
}


export default MakeComment