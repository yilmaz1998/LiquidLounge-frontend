import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ShowComments = () => {
    const { id } = useParams();
    const [Comments, setComments] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:4000/comment/${id}`, {
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

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/comment/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("userToken")
            },
        })
            .then((res) => {
                if (res.ok) {
                    setComments(Comments.filter(comment => comment._id !== id))
                } else {
                    throw new Error('Failed to delete comment')
                }
            })
            .catch((error) => console.error('Error deleting comment:', error));
    }

  return (
    <div>
        <h1 className='text-3xl'>Reviews</h1>
        {isLoading ? (
      <p>Loading...</p>
    ) : (
      <ul>
        {Comments.map((comment, index) => (
          <li key={index}>
              <h2 className='text-xl'><span className='font-bold'>Title:</span> {comment.title}</h2>
              <p><span className='font-bold'>Review:</span> {comment.comment}</p>
              <p><span className='font-bold'>Created by:</span> {comment.user.username}</p>
              <div className="flex flex-col items-center justify-center">
              <Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2" to={`/otherusers/${id}/comment/${comment._id}`}>Edit</Link>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2"  onClick={() => handleDelete(comment._id)}>Delete</button>
              </div>
          </li>
        ))}
      </ul>
    )}
    </div>
  )

}

export default ShowComments