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
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const getPoetByName = (req, res) => {
  console.log('getPoetByName');
  Poet.findOne({ name: req.params.name })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const getPoetById = (req, res) => {
  console.log('getPoetByName');
  Poet.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const getPoetLocalByName = (params) => {
  console.log('getPoetLocalByName');
  return new Promise((fulfill, reject) => {
    Poet.findOne({ name: params.name })
      .then((result) => {
        fulfill(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const updatePoetLocal = (params) => {
  console.log('updatePoetLocal');
  return new Promise((fulfill, reject) => {
    getPoetLocalByName({ name: params.name })
      .then((res) => {
        if (!res) {
          createPoetLocal(params).then((createdPoet) => {
            fulfill(createdPoet);
          });
        } else {
          res.name = params.name ? params.name : undefined;
          res.books = params.books ? params.books : undefined;
          res.weights = params.weights ? params.weights : undefined;
        }
        res.save()
          .then((result) => {
            fulfill(result);
          })
          .catch((error) => {
            reject(error);
          });
      });
  }); // promises
};

module.exports = {
  createPoet, getPoetById, getPoetByName, getPoets, getPoetsLocal, createPoetLocal, updatePoetLocal, getPoetLocalByName,
};
