const mongoose = require('mongoose');
const reviewSchema = require('./reviewModel'); // Import the comment schema

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookName: {
        type: String,
        required: true,
        unique: true
    },
    year: { 
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true
    }, 
    genre: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: false
    },
    about: {
        type: String,           
        required: true    
    }, 
    image: {
        type: String
    },
    comments: [reviewSchema] ,
    username: {
        type: String,
        required: true
      }
}, { timestamps: true });

// Static method to add a new book
bookSchema.statics.newBook = async function(bookDetails) {
    const { bookName } = bookDetails;

    // Check if book already exists
    const bookNameExists = await this.findOne({ bookName });
    if (bookNameExists) {
        throw Error('The book is already in our website');
    }

    // Create a new book
    const newBook = new this(bookDetails);
    
    // Save the new book to the database
    return newBook.save();
};

module.exports = mongoose.model('Book', bookSchema);
