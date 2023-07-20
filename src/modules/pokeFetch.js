import { PokeAPI } from './pokeapi/pokeAPI';

const _pokeApi = new PokeAPI({
  cache: false,
  cacheImages: false
});

/**
 * fetches random a random number of pokemons through the pokeAPI
 */
export default async function getRandomPokemons(amount) {
  const pokeIds = [1, 5, 65];
  const baseURL = "/api/v2/pokemon/";
  let randPokemons = [];

  try {
    /*
    const response = await _pokeApi.resource(pokeIds.map((value) => {
      return baseURL + value;
    }));
  
    randPokemons = response;*/
    randPokemons = [];
  } catch (error) {
    throw new Error("Could not fetch pokemons from pokeAPI!", error);
  }
  
  return randPokemons;
}