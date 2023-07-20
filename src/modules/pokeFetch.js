import { PokeAPI } from './pokeapi/pokeAPI';

const _pokeApi = new PokeAPI({
  cache: false,
  cacheImages: false
});

/**
 * fetches random a random number of pokemons through the pokeAPI
 */
export default async function getPokemon(pokedex_idx) {
  let data = [];

  try {
    const response = await _pokeApi.getPokemonByName(pokedex_idx);  
    data = response;

  } catch (error) {
    throw new Error("Could not fetch pokemons from pokeAPI!", error);
  }
  
  return data;
}