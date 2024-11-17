const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true 
  }, 
  password: {
    type: String,
    required: true, 
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }] // Array to store favorite books
});

// Static signup method
userSchema.statics.signup = async function (email, password, username) {
  const normalizedEmail = email.toLowerCase();

  if (!normalizedEmail || !password || !username) { 
    throw Error('All fields must be filled');
  }

  if (!validator.isEmail(normalizedEmail)) {
    throw Error('Please provide a valid email');
  }

  const emailExists = await this.findOne({ email: normalizedEmail });
  if (emailExists) {
    throw Error('Email is already in use');
  }

  const usernameExists = await this.findOne({ username });
  if (usernameExists) {
    throw Error('The username is already taken, try a new username');
  }

  if (!validator.isStrongPassword(password, { minLength: 8, minSymbols: 0 })) {
    throw Error('Please provide a stronger password');
  }

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  try {
    const user = await this.create({ email: normalizedEmail, password: hash, username });
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw Error('An error occurred while creating the user. Please try again.');
  }
};

// Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled'); 
  }

  const normalizedEmail = email.toLowerCase();
  const user = await this.findOne({ email: normalizedEmail });

  if (!user) {
    throw Error('Invalid email or password');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {  
    throw Error('Invalid email or password');
  }

  // Return user with username and email
  return user;  // Will include email and username as stored in the database
};
 
module.exports = mongoose.model('User', userSchema);
