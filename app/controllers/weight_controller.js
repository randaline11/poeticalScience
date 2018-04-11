const mongoose = require('mongoose');
const Weight = require('../models/weight_model.js');

// function createMultipleWeights(weights) {
//   console.log('create multiple weights');
//   Weight.insertMany(weights, (err, docs) => {
//     if (err) {
//       console.log('err: ', err);
//     } else {
//       console.log('inserted all weights successfully');
//     }
//   });
// }

const findWeight = (req, res) => {
  console.log('findWeight');
  Weight.find({ source: req.body.weight, target: req.body.target })
    .then((foundWeight) => {
      console.log('found this weight', foundWeight);
    })
    .catch((err) => {
      console.log('err');
    });
};

const getWeights = (req, res) => {
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

const getWeightsBySourceOrTargetLocal = (poetName) => {
  console.log('getWeightsBySourceOrTargetLocal');
  return new Promise((fulfill, reject) => {
    Weight.find({
      $or:
  [
    { source: poetName },
    { target: poetName },
  ],
    })
      .then((results) => {
        console.log('result of getting weight: ', results);
        fulfill(results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getWeightsBySourceLocal = (poetName) => {
  console.log('getWeightsBySourceLocal');
  return new Promise((fulfill, reject) => {
    Weight.find({ source: poetName })
      .then((results) => {
        console.log('result of getting weight: ', results);
        fulfill(results);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const createWeight = (req, res) => {
  console.log('createWeight');
  const newWeight = {
    source: req.body.source ? req.body.source : '',
    target: req.body.target ? req.body.target : '',
    weight: req.body.weight ? req.body.weight : 0,
  };
  const weight = new Weight(newWeight);
  weight.save()
    .then((result) => {
      res.json(weight);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const createWeightLocal = (params) => {
  return new Promise((fulfill, reject) => {
    const newWeight = {
      source: params.source ? params.source : '',
      target: params.target ? params.target : '',
      weight: params.weight ? params.weight : 0,
    };
    Weight.create(newWeight)
      .then((result) => {
        console.log('got a result? ', result);
        fulfill(result);
      })
      .catch((error) => {
        console.log('error in createWeightLocal: ', error);
        reject(error);
      });
  });
};

const updateWeightLocal = (params) => {
  console.log('updateWeightLocal');
  return new Promise((fulfill, reject) => {
    getWeightsBySourceLocal({ source: params.source })
      .then((res) => {
        if (!res) {
          createWeightLocal(params).then((createdWeight) => {
            fulfill(createdWeight);
          });
        } else {
          res.source = params.source ? params.source : '';
          res.target = params.target ? params.target : '';
          res.weight = params.weight ? params.weight : 0;
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
  createWeight, getWeights, findWeight, createWeightLocal, updateWeightLocal,
};
