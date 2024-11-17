import '../book.css';
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import image from '../images/image.png';

function MyFiles() {
  const { user } = useUser();
  const [userBooks, setUserBooks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserBooks = async () => {
      if (!user || !user.username) {
        navigate('/login'); // Redirect to login if the user is not logged in
        return;
      }

      try {
        const response = await fetch(`/api/home/user/books?username=${user.username}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`, // Pass token for authorization
          },
        });

        if (response.ok) {
          const books = await response.json();
          setUserBooks(books);
        } else {
          const data = await response.json();
          setError(data.error || 'Failed to fetch user books');
        }
      } catch (err) {
        setError('Failed to connect to the server');
      }
    };

    fetchUserBooks();
  }, [user, navigate]);

  const handleMoreClick = (book) => {
    navigate('/more', { state: { book } });
  };

  const handleDelete = async (bookId) => {
    if (!user || !user.token) {
      alert('You must be logged in to delete a book.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await fetch(`/api/home/books/${bookId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`, // Pass token for authorization
          },
        });

        if (response.ok) {
          // Remove the deleted book from the userBooks state
          setUserBooks(userBooks.filter((book) => book._id !== bookId));
          alert('Book deleted successfully');
        } else {
          const data = await response.json();
          setError(data.error || 'Failed to delete book');
        }
      } catch (err) {
        setError('Failed to connect to the server');
      }
    }
  };

  return (
    <div className="container myfiles">
      <h1 className='mt-5'>My Files :</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error */}
      <div className="book-container mt-3">
        <div className="books">
          {userBooks.length > 0 ? (
            userBooks.map((book) => (
              <div key={book._id} className="book-item">
                <div className="card mb-4">
                  <div className="row g-0">
                    <div className="col-md-4 mt-3">
                      <img src={book.image || image} alt={book.bookName} height="220px" width="140px" />
                    </div>
                    <div className="col-md-8 px-3">
                      <div className="card-body">
                        <h5 className="card-title text-danger">{book.bookName}</h5>
                        <p className="card-text mt-3"><strong>Author:</strong> {book.author}</p>
                        <p className="card-text"><strong>Genre:</strong> {book.genre || 'N/A'}</p>
                        <p className="card-text">Published Year: {book.year}</p>
                        <p className="card-text">
                          <small className="text-muted">Last updated 3 mins ago</small>
                        </p>
                      </div>
                      <div className="cardButtons">
                        <button onClick={() => handleMoreClick(book)} className="add moreButton">
                          More
                        </button>
                        <button onClick={() => handleDelete(book._id)} className="addToFav delete">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No books found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyFiles;
