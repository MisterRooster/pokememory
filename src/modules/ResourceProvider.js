import Pokedex from 'pokedex-promise-v2';

class ResourceProvider {
  static _pokeApi = new Pokedex();

  static #usedIndices = new Set();

  static #TOTAL_POKEMON = 1281;

  static get pokemonCount() { return ResourceProvider.#TOTAL_POKEMON; }

  /*
   * Refreshes the pokemon count from the pokeAPI.
   */
  static async _refreshNumOfPokemon() {
    try {
      const response = await ResourceProvider._pokeApi.getPokemonsList({ offset: 0, limit: 1 });
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
    const dummyObj = {
      name: `missingNo.${pokeIdx}`,
      sprites: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png",
      }
    };
    return new Promise(resolve => {
      setTimeout(() => resolve(dummyObj), 1000);
    });

    /*/
    let data = {};
    try {
      const response = await ResourceProvider._pokeApi.getPokemonByName(pokedex_idx);  
      data = response;
    } catch (error) {
      throw new Error("Could not fetch pokemons from pokeAPI!", error);
    }

    return data;//*/
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

    console.log(ResourceProvider.#usedIndices)
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