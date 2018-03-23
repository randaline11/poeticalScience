const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PoetSchema = new Schema({
  name: { type: String, default: '' },
  weights: [{ type: Schema.Types.ObjectId, ref: 'Poet' }],
  books: [{ type: Schema.Types.ObjectId, ref: 'Poet' }],
}, {
  toJSON: {
    virtuals: true,
  },
});

// create PostModel class from schema
const PoetModel = mongoose.model('Poet', PoetSchema);

module.exports = { PoetModel };
