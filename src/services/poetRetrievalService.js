const https = require('https');
const xmljs = require('xml-js');
const constants = require('../constants/constants.js');
const utils = require('../constants/utils.js');

function getPoets() {
  // https://codeburst.io/4-ways-for-making-http-s-requests-with-node-js-c524f999942d
  https.get(constants.url, (res) => {
    res.setEncoding('utf8');
    let body = '';
    res.on('data', (data) => {
      body += data;
    });
    res.on('end', () => {
      let result1 = xmljs.xml2json(body, { compact: true, spaces: 4 });
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
      //   console.log(listOfPoets);

      const justNames = listOfPoets.map((poet) => {
        return poet.name;
      });
      // x  console.log(justNames);
      utils.writeToFile('poets', justNames);
      utils.writeToFile('weights', listOfWeights);
    });
  });
}

module.exports = { getPoets };
