import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

const EditComment = () => {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    console.log(id)
    fetch(`https://liquid-lounge-acdcda81ea65.herokuapp.com/comment/${id}/get`, {
      headers: {
        "Authorization": localStorage.getItem("userToken"),
      },
    })
    .then((res) => {
      if (res.ok) {
        console.log('Response Status:', res)
        return res.json();
      } else {
        throw new Error('Failed to fetch comment')
      }
    })
    .then((data) => {
      console.log("Fetched Data:", data)
      if (!data) {
        throw new Error('Received empty data from server.');
      }
      setTitle(data.title)
      setComment(data.comment)
    })
    .catch((error) => {
      console.error("Error:", error)
      setError(error.message)
    });
  }, [id])
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !comment || !title.trim() || !comment.trim()) {
      setError('Please fill in both title and comment fields.')
      return
    }

    fetch(`https://liquid-lounge-acdcda81ea65.herokuapp.com/comment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("userToken"),
      },
      body: JSON.stringify({ title, comment }),
    })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error("You are not the owner of this comment.")
      }
    })
    .then((data) => {
      const contentId = data.drink
      navigate(`/otherusers/${contentId}`)
    })
    .catch((error) => {
      console.error("Error:", error)
      setError(error.message)
    })
  }

  return (
    <div className='text-center'>
      <h2 className='text-3xl font-bold'>Edit Comment</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
        <span className="text-gray-700 font-bold">Title:</span>
          <input className='form-input mt-1 block w-full border rounded py-2 px-3' value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700 font-bold">Review:</span>
          <textarea className='form-input mt-1 block w-full border rounded py-2 px-3' value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <button  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">Edit Review</button>
      </form>
      <div className='mt-4'>
      <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to={`/otherusers`}>Go Back</Link>
      </div>
      {error && <p className='font-bold text-red-500 mt-2'>{error}</p>} 
    </div>
  );
};

export default EditComment;

