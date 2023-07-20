import localForage from "localforage"

import { PokeConfig } from './pokeConfig'
import { loadResource } from './pokeResource'
import endpoints from './endpoints.json'
import rootEndpoints from './rootEndpoints.json'

localForage.config({
  name: 'pokeapi'
})

function capitalize([first,...rest]) {
  return first.toUpperCase() + rest.join('').toLowerCase()
}

function getEndpointFullName(endpoint) {
  return `${endpoint[0]}By${capitalize(endpoint[1])}`
}

function getEndpointName(endpoint) {
  return `${endpoint[0]}`
}

function getRootEndpointFullName(endpoint) {
  return `${endpoint[0]}List`
}

export class PokeAPI {
  constructor(config) {
    this.config = new PokeConfig(config);

    // add all endpoint functions to prototype
    endpoints.forEach(endpoint => {
      const epFullName = getEndpointFullName(endpoint);
      this[epFullName] = input => {
        if (input) {
          // if user has submitted a name or Id, return the JSON promise
          if (typeof input === 'number' || typeof input === 'string') {
            return loadResource(this.config, `${this.config.versionPath}${endpoint[2].replace(':id', input)}`);
          }
          
          // if the user has submitted an Array
          // return a new promise which will resolve when all loadResource calls are ended
          else if (typeof input === 'object') {
            return Promise.all(input.map(inpElem => {
              return loadResource(config, `${config.versionPath}${endpoint[2].replace(':id', inpElem)}`);
            }));
          }
        }
      };

      this[getEndpointName(endpoint)] = this[epFullName];
    });

    // add all root endpoint functions to prototype
    rootEndpoints.forEach(rootEndpoint => {
      const repFullName = getRootEndpointFullName(rootEndpoint);
      this[repFullName] = config => {
        var limit = this.config.limit;
        var offset = this.config.offset;
        if (config) {
          if (config.hasOwnProperty('offset')) {
            offset = config.offset;
          }
          if (config.hasOwnProperty('limit')) {
            limit = config.limit;
          }
        }
        return loadResource(this.config, `${this.config.versionPath}${rootEndpoint[1]}?limit=${limit}&offset=${offset}`);
      };

      this[rootEndpoint[0]] = this[repFullName];
    });

    // install a serviceworker when cache is enabled
    if (this.config.cacheImages) {
      // TODO: install serviceworker
    }
  }

  getConfig() {
    return this.config;
  }

  getCacheLength() {
    return localForage.lenght();
  }

  clearCache() {
    return localForage.clear();
  }

  resource(path) {
    if (typeof path === 'string') {
      return loadResource(this.config, path)
    } else if (Array.isArray(path)) {
      return Promise.all(path.map(p => loadResource(this.config, p)))
    } else {
      return 'String or Array is required'
    }
  }
}