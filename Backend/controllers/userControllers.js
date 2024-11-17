const userModel = require('../models/userModel');
const bookModel = require('../models/bookModel'); // Assuming you have a Book model
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Retrieve the user, making sure to get username and other info
    const oldUser = await userModel.login(email, password); 
    
    // Create token
    const token = createToken(oldUser._id);
     
    // Send back the username along with email and token
    res.status(200).json({ 
      _id: oldUser._id,
      email: oldUser.email, 
      username: oldUser.username, // Include username in response
      token 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup user
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await userModel.signup(email, password, username);
    const token = createToken(newUser._id);
    
    // Send back the username along with email and token
    res.status(200).json({ 
      email: newUser.email, 
      username: newUser.username, 
      token 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add book to user's favorites
const addFavoriteBook = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const user = await userModel.findById(userId);
    const book = await bookModel.findById(bookId);

    if (!user || !book) {
      return res.status(404).json({ message: "User or book not found" });
    }

    if (!user.favorites.includes(bookId)) {
      user.favorites.unshift(bookId);
      await user.save();
    }

    res.status(200).json({ message: 'Book added to favorites', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ error: 'Error adding to favorites' });
  }
};

// Get user's favorite books
const getFavoriteBooks = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userModel.findById(userId).populate('favorites');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching favorites' });
  }
};

const removeFavoriteBook = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the book is in the user's favorites
    if (user.favorites.includes(bookId)) {
      // Remove the book from favorites
      user.favorites = user.favorites.filter(favorite => favorite.toString() !== bookId);
      await user.save();
      return res.status(200).json({ message: 'Book removed from favorites', favorites: user.favorites });
    } else {
      return res.status(404).json({ message: "Book not found in favorites" });
    }
  } catch (error) { 
    res.status(500).json({ error: 'Error removing from favorites' });
  }
};

module.exports = { signupUser, loginUser, addFavoriteBook, getFavoriteBooks,removeFavoriteBook };
 