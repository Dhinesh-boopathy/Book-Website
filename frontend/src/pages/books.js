import '../book.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import image from '../images/image.png';
import { formatDistanceToNow } from 'date-fns'; // Import date-fns for date formatting
import Footer from '../components/Footer';

function Books() {
  const { user } = useUser(); // Destructure user from the context
  const [Books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('/api/home/books');
      const json = await response.json();

      if (response.ok) {
        setBooks(json);
      }
    };

    fetchBooks();
  }, []);

  const handleAddToFavorites = async (bookId) => {
    console.log('Current user:', user);
 
    if (!user || !user._id || !user.token) {
        alert('You must be logged in to add a book to favorites.');
        return; // Early return
    }
 
    try {
        const response = await fetch('/api/home/user/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}` // Ensure the token is being passed
            },
            body: JSON.stringify({ userId: user._id, bookId })
        });
 
        if (!response.ok) {
            const errorText = await response.text(); // Log more specific error from the server
            console.error('Failed to add book to favorites:', errorText);
            return;
        }
 
        const json = await response.json(); // Directly parse as JSON
        console.log('Book added to favorites:', json);
        navigate('/favorites'); // Redirect to favorites
    } catch (error) {
        console.error('Error:', error);
    }
 };
 
  const handleMoreClick = (book) => {
    navigate('/more', { state: { book } });
  };

  const filteredBooks = Books.filter(book =>
    book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (book.genre && book.genre.toLowerCase().includes(searchTerm.toLowerCase())) // Check for genre if available
  );

  return (
    <div className="whole">
      <div className="searchAdd"> 
        <h1 className='mx-4 bookPageHeading text-secondary'>Explore your Books:</h1>
        <div className="search">
          <input
            className="searchInput"
            placeholder=" Search by book name, author, or genre"
            type="text"
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
      </div>
      <div className="book-container mt-3">
        <div className="books">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book._id} className="book-item">
                <div className="card mb-4">
                  <div className="row g-0">
                    <div className="col-md-4 mt-3">
                      <img src={book.image || image}  alt={book.bookName} height="220px" width="140px" />
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
                        <button className="addToFav" onClick={() => handleAddToFavorites(book._id)}>
                          <i className="bi bi-heart"></i>
                        </button>
                      </div>
                      <div  className='addedTime'>
                      <p className="card-text">
                        <small> {book.createdAt 
                            ? formatDistanceToNow(new Date(book.createdAt), { addSuffix: true }) 
                            : 'Date not available'}</small>
                        </p>
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
      <Footer/>
    </div>
    
  );
}

export default Books;
