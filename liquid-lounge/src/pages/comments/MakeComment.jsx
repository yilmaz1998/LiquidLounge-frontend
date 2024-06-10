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

    fetch(`https://liquid-lounge-acdcda81ea65.herokuapp.com/comment/new`, {
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
    <div className='text-center'>
      <h2 className='text-3xl font-bold'>Add Review </h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
        <span className="text-gray-700 font-bold">Title:</span>
          <input className='form-input mt-1 block w-full border rounded py-2 px-3' value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label className="block mb-4">
        <span className="text-gray-700 font-bold">Review:</span>
          <textarea className='form-input mt-1 block w-full border rounded py-2 px-3' value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">Add Review</button>
      </form>
      <div className='mt-4'>
     <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to={`/otherusers/${id}`}>Go Back </Link>
     </div>
     {error && <p className='font-bold text-red-500 mt-2'>{error}</p>} 
    </div>
    
  )
}


export default MakeComment