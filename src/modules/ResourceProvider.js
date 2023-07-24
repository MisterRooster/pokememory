import { Pokedex } from 'pokeapi-js-wrapper';

class ResourceProvider {
  static _pokeApi = new Pokedex({ cache: true, cacheImages: true });

  static #usedIndices = new Set();

  static #TOTAL_POKEMON = 1010;

  static get pokemonCount() { return ResourceProvider.#TOTAL_POKEMON; }

  /*
   * Refreshes the pokemon count from the pokeAPI.
   */
  static async _refreshNumOfPokemon() {
    try {
      const response = await ResourceProvider._pokeApi.getPokemonSpeciesList({ offset: 0, limit: 1 });
      ResourceProvider.#TOTAL_POKEMON = response.count;
    } catch (error) {
      console.warning("Could not update number of pokemons from pokeAPI!", error);
    }
  }

  /**
   * Fetches a pokemon through the pokeAPI.
   * 
   * @param {Number} pokeIdx Index of pokemon to fetch
   * @return {Promise} pokemon
   */
  static async getPokemon(pokeIdx) {
    let data = {
      id: 0,
      name: `Missingno.`,
      height: 1,
      weight: 10,
      types: ["normal", "bird"],
      sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png",
    };

    /*/ uncomment this to use mocking api call
    return new Promise(resolve => {
      setTimeout(() => resolve(data), 1000);
    });
    //*/

    try {
      const response = await ResourceProvider._pokeApi.getPokemonByName(pokeIdx);  
      data = {
        id: response.id,
        name: response.name,
        height: response.height/10,
        weight: response.weight/10,
        types: response.types.map(t => t.type.name),
        sprite: response.sprites.front_default,
      };
    } catch (error) {
      throw new Error("Could not fetch pokemons from pokeAPI!", error);
    }

    return data;
  }

  /**
   * Fetches a random pokemon through the pokeAPI.
   * 
   * @param {boolean} unique If true, gets a pokemon never fetched before
   * @return {Promise} pokemon 
   */
  static async getRandomPokemon(unique=true) {
    const getNextRandomNum = () => {
      const val = Math.floor(Math.random() * ResourceProvider.pokemonCount);
      if (unique && ResourceProvider.#usedIndices.has(val)) return getNextRandomNum();
      return val;
    }
    const nextIdx = getNextRandomNum()
    ResourceProvider.#usedIndices.add(nextIdx)

    return this.getPokemon(nextIdx)
  }

  /**
   * Resets the list of fetched random pokemon.
   */
  static forgetRandomHistory = () => {
    ResourceProvider.#usedIndices.clear();
  }
}

// refreshes on module import
ResourceProvider._refreshNumOfPokemon();

export { ResourceProvider }