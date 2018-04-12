const WeightController = require('../../controllers/weight_controller.js');

function createCrowdsourceGraph(filteredPoets, graphml) {
  console.log('gathering list of weights..');
  console.log('list of filtered poets: ', filteredPoets);
  const listOfWeights =
    graphml.graph.edge.reduce((filtered, edge) => {
      if (filteredPoets[edge._attributes.source] &&
        filteredPoets[edge._attributes.target]) {
        const toPush = {
          source: edge._attributes.source,
          target: edge._attributes.target,
          weight: edge.data._text,
        };
        filtered.push(toPush);
      }
      return filtered;
    }, []);
  return listOfWeights;
}

// function createAllWeights(listOfWeights) {
//   return new Promise((fulfill, reject) => {
//     const weightsByPoet = {};
//     const promiseArray = listOfWeights.map((weight) => {
//       return new Promise((fulfill2, reject) => {
//         WeightController.updateWeightLocal(weight)
//           .then((res) => {
//             weightsByPoet[res.source];
//             fulfill2(book);
//           })
//           .catch((err) => {
//             console.log('error posting book: ', err);
//             reject();
//           });
//       });
//     });
//   });
// }

/*
- for each one in list, either create new weight or update old findOne.. sort by
source + target for each poet poetName
- go through hashtable.
  - get poet lcoal and update poet with these weights instead
*/


module.exports = { createCrowdsourceGraph };
