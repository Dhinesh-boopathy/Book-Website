const bookModel = require('../models/bookModel');
const mongoose = require('mongoose');

// To home page
const homePage = (req, res) => {
    res.send(`
        <h1>Welcome to the book path</h1>
    `);
};

// To get all books
const getAllBooks = async (req, res) => { 
    const Books = await bookModel.find({}).sort({ createdAt: -1 });
    res.status(200).json(Books);
};

// To get a single book
const getSingleBook = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such a book" });
    }

    const singleBook = await bookModel.findById(id);

    if (!singleBook) {
        return res.status(404).json({ error: "No such book" });
    }
    res.status(200).json(singleBook);
};

// To post a new book
const createBook = async (req, res) => {
    const { bookName, year, author, genre, link, about, image, username } = req.body; // Ensure username is included
    try {
        const book = await bookModel.create({
            bookName,
            year,
            author,
            genre,
            link,
            about,
            image,
            username
        });
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// To get books added by a specific user
const getUserBooks = async (req, res) => {
    const { username } = req.query; // Get username from query params

    try {
        const userBooks = await bookModel.find({ username }); // Filter books by username
        res.status(200).json(userBooks);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch user books' });
    }
};

// To delete a book
const deleteBook = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Please provide valid id" });
    }

    const removeBook = await bookModel.findOneAndDelete({ _id: id });

    if (!removeBook) {
        return res.status(404).json({ error: "No such a book" });
    }

    res.status(200).json(removeBook);
};

// To update a book
const updateBook = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Please provide valid id" });
    }

    const update = await bookModel.findOneAndUpdate({ _id: id }, {
        ...req.body
    });

    if (!update) {
        return res.status(404).json({ error: "No such book" });
    }

    res.status(200).json(update);
};

// Add a comment to a book
const postComment = async (req, res) => {
    const { id } = req.params; // Book ID
    const { comment, username } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid book ID' });
    }

    if (!comment || !username) {
        return res.status(400).json({ error: 'Comment and username are required' });
    }

    try {
        const book = await bookModel.findById(id);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        // Create the new comment object
        const newComment = { username, comment };

        // Add the new comment to the comments array
        book.comments.unshift(newComment);
        await book.save();

        // Return the new comment in the response
        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    homePage,
    createBook,
    getAllBooks,
    getSingleBook,
    getUserBooks, // Export the new function
    deleteBook, 
    updateBook,
    postComment
};
   