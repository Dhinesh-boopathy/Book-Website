import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";  
import { useNavigate } from "react-router-dom";

function Favorite() {
  const [favorites, setFavorites] = useState([]);  
  const { user } = useUser(); // Get user from UserContext
  const navigate = useNavigate() 

  useEffect(() => { 
    const fetchFavorites = async () => { 
      if (!user) { 
        return; // Make sure user is defined before fetching
      }
      try {
        const response = await fetch(`/api/home/user/favorites/${user._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}` // Add token if required
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }

        const data = await response.json();
        setFavorites(data); // Store favorite books in the state
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites(); 
  }, [user]);

  const handleMoreClick = (book) => {
      navigate('/more', { state: { book } });
  };

  const handleRemoveFavorites = async (bookId) => {
    // Handle removing a book from favorites
    try {
      const response = await fetch(`/api/home/user/favorites/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ userId: user._id, bookId })
      });

      if (response.ok) {
        setFavorites(prevFavorites => prevFavorites.filter(book => book._id !== bookId));
      } else {
        throw new Error('Failed to remove from favorites');
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  return ( 
    <div className=" favPage">
      <h2 className="mt-5">Your Favorite Books:</h2>
      <div className="book-container mt-3">
        <div className="books">
          {favorites.length > 0 ? (
            favorites.map((book) => (
              <div key={book._id} className="book-item">
                <div className="card mb-4">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={book.image || 'default-image-url.jpg'} alt={book.bookName} height="220px" width="140px" />
                    </div>
                    <div className="col-md-8 px-3">
                    <div className="card-body">
                        <div className='headingDiv'>
                        <h5 className="card-title text-danger">{book.bookName}</h5>
                        </div>
                        <p className="card-text authorClass"> <strong> Author : </strong> {book.author}</p>
                        <p className="card-text"> <strong> Genre : </strong> {book.genre || 'N/A'}</p> {/* Show genre if available */}
                        <p className="card-text">Published Year: {book.year}</p> 
                       
                      </div>
                      <div className="cardButtons">
                        <button onClick={() => handleMoreClick(book)} className="add moreButton">
                          More
                        </button>
                        <button className="remove" onClick={() => handleRemoveFavorites(book._id)}>
                           Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No favorite books added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
} 

export default Favorite;
