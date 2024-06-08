import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ShowMyDrinkComments = () => {
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

  return (
    <div>
        <h1 className='text-3xl'>Reviews</h1>
        {isLoading ? (
      <p>Loading...</p>
    ) : (
      <ul>
        {Comments.map((comment, index) => (
          <li className='m-3' key={index}>
              <h2 className='text-xl'><span className='font-bold'>Title:</span> {comment.title}</h2>
              <p><span className='font-bold'>Review:</span> {comment.comment}</p>
              <p><span className='font-bold'>Created by:</span> {comment.user.username}</p>
          </li>
        ))}
      </ul>
    )}
    </div>
  )

}

export default ShowMyDrinkComments