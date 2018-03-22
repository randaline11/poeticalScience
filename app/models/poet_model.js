const mongoose = require('mongoose');
// create a PostSchema with a title field
const PoetSchema = new Schema({
  name: { type: String, default: '' },
  hits: { type: String, default: '' },
  weights: {{ type: Schema.Types.ObjectId, ref: 'Weight' }},
  books: {[]}
}, {
  toJSON: {
    virtuals: true,
  },
});

// create PostModel class from schema
const PoetModel = mongoose.model('Poet', PoetSchema);

export default PoetModel;
