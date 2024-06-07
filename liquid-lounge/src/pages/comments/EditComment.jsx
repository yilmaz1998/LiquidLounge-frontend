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
    fetch(`http://localhost:3000/comment/${id}/get`, {
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

    fetch(`http://localhost:3000/comment/${id}`, {
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
    <div>
      <h2>Edit Comment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Comment:
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <button type="submit">Edit Comment</button>
      </form>
      {error && <p>{error}</p>}
      <Link to={`/otherusers`}>Go Back</Link>
    </div>
  );
};

export default EditComment;

