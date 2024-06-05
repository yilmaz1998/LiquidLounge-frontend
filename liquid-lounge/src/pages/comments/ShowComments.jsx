import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const ShowComments = () => {
    const { id } = useParams()
    const [Comments, setComments] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:3000/comment/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("userToken")
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Failed to fetch comment')
                }
            })
            .then((data) => setComments(data))
            .catch((error) => console.error('Error fetching comment:', error))
            .finally(() => setIsLoading(false))
    }, [])

  return (
    <div>
        <h1 className='text-3xl'>Comments</h1>
        {isLoading ? (
      <p>Loading...</p>
    ) : (
      <ul>
        {Comments.map((comment, index) => (
          <li key={index}>
              <h2 className='text-2xl'>Title:{comment.title}</h2>
              <p>Comment:{comment.comment}</p>
              <p>CreatedBy:{comment.user.username}</p>
              <Link to={`/otherusers/${id}/comment/${comment._id}`}>Edit Comment</Link>
          </li>
        ))}
      </ul>
    )}
    </div>
  )
    
}

export default ShowComments