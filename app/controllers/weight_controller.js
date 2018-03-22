const mongoose = require('mongoose');
const Weight = require('../models/weight_model.js');

function createMultipleWeights(weights) {
  Weight.insertMany(weights, (err, docs) => {
    if (err) {
      console.log('err: ', err);
    } else {
      console.log('inserted all weights successfully');
    }
  });
}

function findExactWeight(weight) {
  Weight.find({ source: weight.source, target: weight.target })
    .then((foundWeight) => {
      console.log('found this weight', foundWeight);
    })
    .catch((err) => {

    });
}
