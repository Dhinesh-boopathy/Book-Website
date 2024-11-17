import { useUser } from "../context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewBook() {
    const [bookName, setBookName] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [link, setLink] = useState('');
    const [year, setYear] = useState('');
    const [about, setAbout] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user } = useUser(); // Destructure user from context

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error before submission

        // Construct the book object with all fields, including the user.username
        const book = { 
            bookName, 
            year, 
            author, 
            genre, 
            link, 
            about, 
            image, 
            username: user?.username // Ensure username is valid
        };

        try {
            const response = await fetch('/api/home/books', {
                method: 'POST',
                body: JSON.stringify(book),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}` // Include token if necessary
                }
            });

            const json = await response.json(); // Parse response as JSON

            if (!response.ok) {
                // Set error message from backend or a default message
                setError(json.error || 'Something went wrong. Please try again.');
                return;
            }

            // Reset form fields on successful submission
            setBookName('');
            setAuthor('');
            setLink('');
            setYear('');
            setAbout('');
            setImage('');
            setError(null); // Clear any error messages
            console.log('New book is added.', json);
            
            navigate('/books'); // Redirect to books page after success
        } catch (err) {
            // Handle any unexpected errors
            setError('Failed to submit the form. Please check your inputs or try again later.');
            console.error('Error:', err);
        }
    };

    return (
        <div className="newBook">
            <form onSubmit={handleSubmit} className="form">
                <h1>Add a new book:</h1>

                <div>
                    <label htmlFor="bookName">Book Name: </label>
                    <input
                        type="text"
                        required
                        name="bookName"
                        id="bookName"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="year">Published Year: </label>
                    <input
                        type="number"
                        required
                        name="year"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author Name: </label>
                    <input
                        type="text"
                        required
                        name="author"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="genre">Genre :</label>
                    <input 
                        type="text"
                        required
                        name="genre"
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="order">Order Link:</label>
                    <input
                        type="text"
                        name="order"
                        id="order"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="about">About: </label>
                    <textarea
                        className="textarea"
                        name="about"
                        required
                        id="about"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="image">Image: </label>
                    <input
                        name="image"
                        placeholder="Image url"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                
                <div>
                    <button className="mb-5" type="submit">Save</button>
                </div>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
}

export default NewBook;
