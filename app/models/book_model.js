const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, default: '' },
  author: { type: String, default: '' },
  publisher: { type: String, default: '' },
  publish_place: { type: String, default: '' },
  isbn: { type: Number, default: 0 },
  first_publish_year: { type: Number, default: 0 },
  ratings: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  average_rating: { type: Number, default: 0 },
}, {
  toJSON: {
    virtuals: true,
  },
});

// create PostModel class from schema
const BookModel = mongoose.model('Book', BookSchema);

module.exports = BookModel;
