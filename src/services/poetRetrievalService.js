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

      filterPoets(justNames);
    });
}

function filterPoets(listOfPoetNames) {
  console.log('filter poets');
  const filteredListOfPoets = listOfPoetNames.filter((poet) => {
    console.log('in the filter');
    const shouldIncludePoet = { s: false };
    setTimeout(() => {
      console.log('in the timeout');
      // let shouldIncludePoet = false;
      return axios.get(constants.filterurl, {
        params: {
          q: poet,
        },
      })
        .then((body) => {
          if (body.data.numFound !== 0) {
            shouldIncludePoet.s = true;
            console.log('should return this poet');
          } else {
            console.log('shoud not include this poet');
          }
        })
        .catch((err) => {
          console.log('error fetching poet: ', err);
        });

      // if (Math.random() <= 0.5) {
      //   shouldIncludePoet = true;
      // }
    }, 2000);

    return shouldIncludePoet;
  // http://openlibrary.org/search.json?q=charles+simic
  });

  console.log('list: ', filteredListOfPoets);
}

module.exports = {
  getPoets,
  filterPoets,
};
