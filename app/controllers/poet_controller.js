const mongoose = require('mongoose');
const Poet = require('../models/poet_model.js');

const createPoetLocal = (params) => {
  return new Promise((fulfill, reject) => {
    const newPoet = {
      name: params.name ? params.name : undefined,
      weights: params.weights ? params.weights : undefined,
      books: params.books ? params.books : undefined,
    };
    Poet.create(newPoet)
      .then((result) => {
        console.log('got a result? ', result);
        fulfill(result);
      })
      .catch((error) => {
        console.log('error in createPoetLocal: ', error);
        reject(error);
      });
  });
};

const createPoet = (req, res) => {
  console.log('createPoet');
  const newPoet = {
    name: req.body.name ? req.body.name : undefined,
    weights: req.body.weights ? req.body.weights : undefined,
    books: req.body.books ? req.body.books : undefined,
  };
  Poet.create(newPoet)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const getPoetsLocal = (req, res) => {
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

module.exports = {
  createPoet, getPoets, getPoetsLocal, createPoetLocal,
};
