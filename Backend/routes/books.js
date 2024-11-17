const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
    homePage,
    createBook,
    getAllBooks,
    getSingleBook,
    deleteBook,
    updateBook,
    postComment,
    getUserBooks // Import the new controller function
} = require('../controllers/bookControllers');

const router = express.Router();

// To get the home page 
router.get('/', homePage); 

// To get all books
router.get('/books', getAllBooks);

// To get a specific book 
router.get('/books/:id', getSingleBook);

// To post a new book
router.post('/books', createBook);

// To get books added by a specific user
router.get('/user/books', getUserBooks); // Add this line for fetching user-specific books

// To delete a book
router.delete('/books/:id', deleteBook);

// To update a book
router.patch('/books/:id', updateBook);

// To post a comment to a specific book
router.post('/books/:id/comments', postComment); 

module.exports = router;
