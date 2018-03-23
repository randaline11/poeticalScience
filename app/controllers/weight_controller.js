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

export const findWeight = (req, res) => {
  Weight.find({ source: req.body.weight, target: req.body.target })
    .then((foundWeight) => {
      console.log('found this weight', foundWeight);
    })
    .catch((err) => {

    });
};

export const getWeights = (req, res) => {
  console.log('getWeights');
  Weight.find({})
    .then((result) => {
      console.log('result of getting weight: ', result);
      //  const newClean = cleanBooks(result);
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const createWeight = (req, res) => {
  console.log('createWeight');
  const newWeight = {
    source: { type: String, default: '' },
    target: { type: String, default: '' },
    weight: { type: Number, default: 0 },
    source: req.body.source ? req.body.source : '',
    target: req.body.target ? req.body.target : '',
    weight: req.body.weight ? req.body.weight : 0,
  };
  const weight = new Weight(newWeight);
  weight.save()
    .then((result) => {
      res.json(post);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};