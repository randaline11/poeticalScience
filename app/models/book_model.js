const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, default: '' },
  author: { type: String, default: '' },
  publisher: { type: String, default: '' },
  publish_place: { type: String, default: '' },
  isbn: { type: String, default: undefined },
  first_publish_year: { type: Number, default: 0 },
  ratings: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  average_rating: { type: Number, default: 0 },
  cover_url: { type: String, default: '' },
}, {
  toJSON: {
    virtuals: true,
  },
});

// create PostModel class from schema
const BookModel = mongoose.model('Book', BookSchema);

module.exports = BookModel;
