const express = require('express');
const router = express.Router();

// controllers
const { loginUser, signupUser,addFavoriteBook,getFavoriteBooks,removeFavoriteBook } = require('../controllers/userControllers');


// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// route to add a book to user's favorites
router.post('/favorites',addFavoriteBook);

// get user favorite
router.get('/favorites/:userId',getFavoriteBooks) 

//to remove the favorite
router.delete('/favorites/remove', removeFavoriteBook);

module.exports = router; 
