const mongoose = require('mongoose');
// create a PostSchema with a title field
const BookSchema = new Schema({
  title: { type: String, default: '' },
  author: { type: String, default: '' },
  publisher: { type: String, default: '' },
  publish_place: { type: String, default: '' },
  id_goodreads: { type: Number, default: undefined },
  isbn: { type: Number, default: undefined },
  ratings: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  average_rating: { type: Number, default: 0 },
  first_publish_year: { type: Number, default: 0 },
}, {
  toJSON: {
    virtuals: true,
  },
});

// create PostModel class from schema
const BookModel = mongoose.model('Book', BookSchema);

export default BookModel;
