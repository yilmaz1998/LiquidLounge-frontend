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
    fetch(`http://localhost:3000/comment/${id}`, {
      headers: {
        "Authorization": localStorage.getItem("userToken"),
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Failed to fetch comment')
      }
    })
    .then((data) => {
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
    .then(() => {
      navigate(`/otherusers`)
    })
    .catch((error) => {
      console.error("Error:", error)
      setError(error.message)
    })
  }

  const handleDelete = () => {
    fetch(`http://localhost:3000/comment/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.getItem("userToken")
      },
    })
      .then((res) => {
        if (res.ok) {
          setDeleted(true)
        } else {
          throw new Error('Failed to delete')
        }
      })
      .catch((error) => {
        console.error('Error deleting comment:', error)
        setError('You are not the owner of this comment')
      })
  }

  if (deleted) {
    return (
      <div>
        <p>Comment has been deleted successfully.</p>
        <a href={`/otherusers/`}>Go Back</a>
      </div>
    )
  } 
  return (
    <div>
      <h2>Edit Comment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <textarea value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Comment:
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        </label>
        <button type="submit">Edit Comment</button>
      </form>
      {error && <p>{error}</p>}
      <Link to={`/otherusers`}>Go Back</Link>
      <button onClick={handleDelete}>Delete This Comment</button>
    </div>
  );
};

export default EditComment;

