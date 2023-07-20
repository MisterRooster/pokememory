import { PokeAPI } from './pokeapi/pokeAPI';

const _pokeApi = new PokeAPI.PokeAPI();

/**
 * fetches random a random number of pokemons through the pokeAPI
 */
export default async function getRandomPokemons(amount) {
  let randPokemons;

  try {
    const response = await _pokeApi.getPokemonByName("golduck");
    randPokemons = await response.json();
  } catch (error) {
    throw new Error(`Could not fetch pokemon from pokeAPI!`, error);
  }
  
  return [randPokemons];
}