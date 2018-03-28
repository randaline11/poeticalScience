const mongoose = require('mongoose');
const Poet = require('../models/poet_model.js');

const createPoet = (req, res) => {
  console.log('createPoet');
  const newPoet = {
    name: req.body.name ? req.body.name : undefined,
    weights: req.body.weights ? req.body.weights : '',
    books: req.body.books ? req.body.books : '',
  };
  const poet = new Poet(newPoet);
  poet.save()
    .then((result) => {
      res.json(poet);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const getPoets = (req, res) => {
  console.log('getPoets');
  Poet.find({})
    .then((result) => {
      console.log('result of getting poet: ', result);
      //  const newClean = cleanPoets(result);
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

module.exports = { createPoet, getPoets };
