const xmljs = require('xml-js');
const axios = require('axios');
const promiseRetry = require('promise-retry');
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
  // const lastFew = listOfPoetNames.slice(0, 1000);
  const copy = [];

  listOfPoetNames.forEach((poet) => {
    copy.push(timeoutFilter(poet, copy));
  });

  Promise.all(copy).then((tada) => {
    console.log('tada? ', tada);
    const filteredPoets = tada.filter((poet) => {
      return (poet);
    });
    console.log('filteredPoets: ', filteredPoets);
  });
}


function timeoutFilter(poet, copy) {
  return new Promise((fulfill, reject) => {
    setTimeout(() => {
      console.log('in the timeout');
      // shouldFilterPoet(poet).then((res) => {

      retryPoets(poet, shouldFilterPoet).then((res) => {
        console.log('res: ', res);
        if (res) {
          fulfill(poet);
        } else {
          fulfill(res);
        }
      });
    }, 5000);
  });
}

async function findAuthor(docs, poet) {
  const hasAuthor = await docs.find((doc) => {
    return (doc.author_name == poet);
  });
  // console.log('hasAuthor in findAuthor function:', hasAuthor);
  return (!!hasAuthor);
}

async function shouldFilterPoet(poet) {
  return axios.get(constants.filterurl, {
    params: {
      q: poet,
    },
  })
    .then((body) => {
      const docs = body.data.docs;
      // search for whether the poet has authored at least one work.
      // serves to rule out musicians and poets not widely known.
      // if (poet == 'Big Boi') {
      //   console.log(body.data.docs);
      // }
      return findAuthor(docs, poet)
        .then((hasAuthor) => {
          console.log('found an author)', hasAuthor);
          return hasAuthor;
        });
    });
  //  .catch((err) => {
  // if (err.code == 'ETIMEDOUT') {
  //   console.log('ETIMEDOUT error for ', poet);
  // } else if (err.response.status == 503) {
  //   // retry request
  //   console.log(err.response.status);
  //   // console.log('error fetching poet: ', err);
  // } else {
  //   console.log('error fetching post', err.statusCode);
  // }
  //  });
}

function retryPoets(poet, shouldFilterPoet) {
  // Conditional example
  return promiseRetry((retry, number) => {
    console.log('attempt number', number);

    return shouldFilterPoet(poet)
      .catch((err) => {
        console.log('catching an error.....');
        console.log('error code:', err.code);
        if (err.code == 'ETIMEDOUT' || err.code == 'ECONNRESET' || err.response.status == 503) {
          console.log('found etimedout error');
          retry(err);
        }

        throw err;
      });
  })
    .then((value) => {
      console.log('success in retryPoets: ', value);
      return value;
    }, (err) => {
      console.log('error in retryPoets: ', err);
      return err;
    });
}

module.exports = {
  getPoets,
  filterPoets,
};
