const mongoose = require('mongoose');
// create a PostSchema with a title field
const WeightSchema = new Schema({
  source: { type: String, default: '' },
  target: { type: String, default: '' },
  weight: { type: Number, default: 0 },
}, {
  toJSON: {
    virtuals: true,
  },
});

// create PostModel class from schema
const WeightModel = mongoose.model('Weight', WeightSchema);

export default WeightModel;
