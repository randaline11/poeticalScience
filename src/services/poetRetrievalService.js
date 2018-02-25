const xmljs = require('xml-js');
const axios = require('axios');
const constants = require('../constants/constants.js');
const utils = require('../constants/utils.js');

function getPoets() {
  // https://codeburst.io/4-ways-for-making-http-s-requests-with-node-js-c524f999942d
  axios.get(constants.poeturl)
    .then((body) => {
    //  console.log(Object.keys(body));
      let result1 = xmljs.xml2json(body.data, { compact: true, spaces: 4 });
      result1 = JSON.parse(result1);

      // maybe hold off on this until poets are filtered??
      const listOfWeights = result1.graphml.graph.edge.map((edge) => {
        return {
          source: edge._attributes.source,
          target: edge._attributes.target,
          weight: edge.data._text,
        };
      });

      const listOfPoets = result1.graphml.graph.node.map((myNode) => {
        return { name: myNode._attributes.id, data: myNode.data };
      });

      const justNames = listOfPoets.map((poet) => {
        return poet.name;
      });
      utils.writeToFile('poets', justNames);
      utils.writeToFile('weights', listOfWeights);
    });
}

function filterPoets(listOfPoetNames) {
  /*
  1. filter through poets
  2. for each poet:
    - add + instead fo spaces
    - make request to open library
  */

  // http://openlibrary.org/search.json?q=charles+simic
}

module.exports = {
  getPoets,
  filterPoets,
};
