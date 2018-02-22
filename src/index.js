const https = require('https');
const xmljs = require('xml-js');
const fs = require('fs');


console.log('hello world');

// https://codeburst.io/4-ways-for-making-http-s-requests-with-node-js-c524f999942d
const url = 'https://poet.tips/graph/xml/?dl=1';
https.get(url, (res) => {
  res.setEncoding('utf8');
  let body = '';
  res.on('data', (data) => {
    body += data;
  });
  res.on('end', () => {
    let result1 = xmljs.xml2json(body, { compact: true, spaces: 4 });
    result1 = JSON.parse(result1);

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
    console.log(listOfPoets);

    fs.writeFile('tmp/test', result1, (err) => {
      if (err) {
        return console.log(err);
      }
    });
  });
});
