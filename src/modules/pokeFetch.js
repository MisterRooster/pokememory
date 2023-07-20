import { PokeAPI } from './pokeapi/pokeAPI';

const _pokeApi = new PokeAPI({
  cache: false,
  cacheImages: false
});

/**
 * fetches random a random number of pokemons through the pokeAPI
 */
export default async function getRandomPokemons(amount) {
  let randPokemons;

  try {
    const response = await _pokeApi.getPokemonByName("golduck");
    randPokemons = [response];

  } catch (error) {
    throw new Error("Could not fetch pokemons from pokeAPI!", error);
  }
  
  return randPokemons;
}