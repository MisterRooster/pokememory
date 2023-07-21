import { PokeAPI } from './pokeapi/pokeAPI';

class ResourceProvider {
  static _pokeApi = new PokeAPI({
    cache: true,
    cacheImages: true
  });

  static #totalPokeCount_cache = undefined;
  static #usedIndices = new Set();

  /**
   * fetches the total number of available pokemons
   */
  static async getTotalNumberOfPokemons() {
    if (ResourceProvider.#totalPokeCount_cache === undefined)
    {
      let data;
      try {
        const response = await ResourceProvider._pokeApi.getPokemonsList({ offset: 0, limit: 1 });
        console.log(response);
        data = response.count;
        ResourceProvider.#totalPokeCount_cache = data;
      } catch (error) {
        throw new Error("Could not fetch number of pokemons from pokeAPI!", error);
      }

      return data;
    }
    
    return ResourceProvider.#totalPokeCount_cache;
  }

  /**
   * fetches a single pokemon through the pokeAPI
   */
  static async getPokemon(pokedex_idx) {
    const dummyObj = {
      name: `missingNo.${pokedex_idx}`,
    };
    return new Promise(resolve => {
      setTimeout(() => resolve(dummyObj), 1000);
    });

    /*/
    let data = [];
    try {
      const response = await ResourceProvider._pokeApi.getPokemonByName(pokedex_idx);  
      data = response;
    } catch (error) {
      throw new Error("Could not fetch pokemons from pokeAPI!", error);
    }

    return data;//*/
  }

  /**
   * fetches a random pokemon through the pokeAPI.
   * If unique it return a pokemon never fetched before.
   */
  static async getRandomPokemon(unique=true) {
    let totalCount = 0;
    try {
      const resp = await ResourceProvider.getTotalNumberOfPokemons();
      if (resp) totalCount = resp;
    } catch (error) {
      console.log(error);
    }

    const getNextRandomNum = () => {
      const val = Math.floor(Math.random() * totalCount);
      if (unique && ResourceProvider.#usedIndices.has(val)) return getNextRandomNum();
      return val;
    }
    const nextIdx = getNextRandomNum()
    ResourceProvider.#usedIndices.add(nextIdx)

    console.log(ResourceProvider.#usedIndices)
    return this.getPokemon(nextIdx)
  }

  /**
   * Resets the list of fetched random pokemon
   */
  static forgetRandomHistory = () => {
    ResourceProvider.#usedIndices.clear();
  }
}

ResourceProvider.getTotalNumberOfPokemons();

export { ResourceProvider }