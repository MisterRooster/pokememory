import axios from 'axios'
import localForage from "localforage"

import endpoints from './endpoints.json'

const CACHE_PREFIX = "pokeapi-"

function loadUrl(config, url) {
  return new Promise((resolve, reject) => {
    let options = {
      baseURL: `${config.protocol}://${config.hostname}/`,
      timeout: config.timeout
    };
    
    axios.get(url, options).then(response => {
      if (response.status >= 400) {
        reject(response);
      } else {
        if (config.cache) {
          localForage.setItem(`${CACHE_PREFIX}${url}`, response.data);
        }
        resolve(response.data);
      }
    }).catch(error => { reject(error)});
  });
}

class Config {
  constructor(config={}) {
    this.protocol = 'https',
    this.hostname = 'pokeapi.co'
    this.versionPath = '/api/v2/'
    this.offset = 0
    this.limit = 10000;
    this.timeout = 10*1000; // 2s
    this.cache = true;
    this.cacheImages = true;

    if (config.hasOwnProperty('protocol')) {
      this.protocol = config.protocol
    }
    if (config.hasOwnProperty('hostName')) {
      this.hostName = config.hostName
    }
    if (config.hasOwnProperty('versionPath')) {
      this.versionPath = config.versionPath
    }
    if (config.hasOwnProperty('offset')) {
      this.offset = config.offset - 1
    }
    if (config.hasOwnProperty('limit')) {
      this.limit = config.limit
    }
    if (config.hasOwnProperty('timeout')) {
      this.timeout = config.timeout
    }
    if (config.hasOwnProperty('cache')) {
      this.cache = config.cache
    }
    if (config.hasOwnProperty('cacheImages')) {
      this.cacheImages = config.cacheImages
    }
  }
}

export class PokeAPI {
  constructor(config) {
    this.config = new config();

    // add all endpoint functions
    endpoints.forEach(endpoint =>{
      const ep_name = getFullName(endpoint);
      this[ep_name] = input => {
        if (input) {
          // if user has submitted a name or Id, return the JSON promise
          if (typeof input === 'number' || typeof input === 'string') {
            return loadResource(this.config, `${this.config.versionPath}${endpoint[2].replace(':id', input)}`);
          }
          
          // if the user has submitted an Array
          // return a new promise which will resolve when all loadResource calls are ended
          else if (typeof input === 'object') {
            return Promise.all(mapResources(this.config, enpoint, input));
          }
        }
      };

      this[builtEndpointName(endpoint)] = this[ep_name];
    });

    if (this.config.cacheImages) {
      //installSW();
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