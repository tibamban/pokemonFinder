
const fetch = require('node-fetch');
const {performance} = require('perf_hooks');
// fetch the pokemon api for names, heights, weights and types using their names .
async function fetchPokemons(name){
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
  .then(response => response.json())
  .then((pokemons) => ({
    'name': pokemons.name,
    'height':pokemons.height,
    'weight': pokemons.weight,
    'type(s)': pokemons.types.map((val) => val.type.name)
  })).catch( err => ({
      type: err.statusText, payload: err
    })); 
  }
  // find pokemon's name and url with limit and offset parameters
async function findPokemons(limit, offset) {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`).then((res) => res.json()).then((val) => val.results.map((pokemon) => ({
  'name': pokemon.name,
  'url': pokemon.url
  }))).catch( err => ({
      type: err.statusText, payload: err
    }));
}

// find details about pokemons with limit and offset parameters
async function findDetails(limit, offset) {
  let pokemons = await findPokemons(limit, offset);
  let promises = await pokemons.map(async(val) => await fetchPokemons(val.name));
  const values =await Promise.all(promises);
  return values
}
// Print the averages(height and weight) .
async function findAverages(limit, offset) {
  const avgDetails = await findDetails(limit,offset);
  const height = findAverageHeight(avgDetails);
  const weight = findAverageWeight(avgDetails);
  // const avgTypeHeight = pokemonTypes(findAverageWeight(avgDetails),type)
  console.info(`The average height for the ${avgDetails.length} pokemon(s) listed is ${!isNaN(height) ? Math.round((height) * 100) / 100 : ''} decimeters !`);
  console.info(`The average Weight for the ${avgDetails.length} pokemon(s) listed is ${!isNaN(height) ? Math.round((weight) * 100) / 100 : ''} hectograms !`);

}
// find Pokemon by types .

// find average height.
function findAverageHeight(avgDetails) {
  const avgHeight = avgDetails.map((val) => val.height).reduce((a, b) => (a + b)) / avgDetails.length;
  return avgHeight;
}

// find average weight.
function findAverageWeight(avgDetails) {
  const avgWeight = avgDetails.map((val) => val.weight).reduce((a, b) => (a + b)) / avgDetails.length;
  return avgWeight;
}


// Execution Time for the entire service .
async function performaceSensitiveFunc(limit, offset) {
	const start1 = performance.now();
	const averages = await findAverages(limit, offset);
	const totalDuration = performance.now() - start1;
  const time = totalDuration/1000;
  console.info(`It took ${Math.round((time + Number.EPSILON) * 1000) / 1000} seconds to execute the entire service.`);
}

module.exports = {
  performaceSensitiveFunc,
  findAverages,
  fetchPokemons,
  findDetails,
  findAverageHeight,
  findAverageWeight,
  findPokemons

};
