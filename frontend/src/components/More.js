import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { formatDistanceToNow } from 'date-fns';

function More() {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;

  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [error, setError] = useState("");

  const fetchComments = useCallback(async () => {
    if (!book) return;

    try {
      const response = await fetch(`/api/home/books/${book._id}`);
      const data = await response.json();

      if (response.ok) {
        setCommentsList(data.comments || []);
      } else {
        setError(data.error || 'Failed to fetch comments');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    }
  }, [book]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleBackClick = () => {
    navigate('/books');
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.username) {
      setError('You must be logged in to add a comment.');
      return;
    }

    if (!comment.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    try {
      const response = await fetch(`/api/home/books/${book._id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: comment.trim(),
          username: user.username,
          createdAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCommentsList(prevComments => [data.comment, ...prevComments]);
        setComment('');
        setError('');
      } else {
        setError(data.error || "Failed to post comment");
      }
    } catch (err) {
      setError("Failed to connect to the server");
    }
  };

  if (!book) {
    navigate('/books');
    return null;
  }

  return (
    <>
      <div className="container my-5">
        <div className="row align-items-start mt-5">
          <div className="col-md-8 mt-5">
            <h1 className='mt-5 text-warning'>{book.bookName}</h1>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Published Year:</strong> {book.year}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            {book.link && (
              <p className='mt-3'><strong>Order Link: </strong>
                <a href={book.link} target="_blank" rel="noopener noreferrer">Click here to order</a>
              </p>
            )}
            <p className='mt-3'><strong>About: </strong> {book.about}</p>
            <button onClick={handleBackClick} className="btn btn-primary">Back</button>
          </div>

          <div className="col-md-4 mt-5 d-flex justify-content-end">
            <img src={book.image} alt={book.bookName} className="img-fluid mt-5 morePageImage" style={{ height: '350px', width: '230px', border: '1px solid' }} />
          </div>
        </div>

        <hr className='hrTag' />
      </div>

      {/* Comments */}
      <div className="comments">
        <div className="commentsContainer" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          <div className="commentsListContainer" style={{ flex: '1', minWidth: '300px', marginRight: '20px' }}>
            <h1 className='text-primary'>Comments:</h1>
            <div className='commentsList mt-4' style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
              {commentsList.map((item, index) => (
                <div key={index} className="commentContainer" style={{ position: 'relative', paddingBottom: '30px' }}>
                  {item && item.username ? (
                    <h4 className='commentUser'>{item.username}</h4>
                  ) : (
                    <h4 className='commentUser'>Anonymous</h4>
                  )}
                  <p className='eachComment'>{item?.comment || 'No comment provided'}</p>
                  {item.createdAt && (
                    <p className='commentTime' style={{ position: 'absolute', bottom: '0', right: '0', fontSize: '12px', color: '#888' }}>
                      {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="commentFormContainer" style={{ flex: '0 0 300px', maxWidth: '100%' }}>
            <div className="commentForm" style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
              <h4>Add your comment:</h4>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="about">Comment: </label>
                  <textarea
                    className="commentTextarea"
                    name="about"
                    required
                    id="about"
                    value={comment}
                    onChange={handleCommentChange}
                    style={{ width: '100%', height: '100px', resize: 'vertical', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Save</button>
              </form>
            </div>
          </div> 
        </div>
      </div>
    </>
  );
}

export default More;
 