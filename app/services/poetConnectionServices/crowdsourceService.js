
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

module.exports = { createCrowdsourceGraph };
