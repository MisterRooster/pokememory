import axios from 'axios'
import localForage from "localforage"

const CACHE_PREFIX = "pokeapi-"

function loadUrl(config, url) {
  return new Promise((resolve, reject) => {
    let options = {
      baseURL: `${config.protocol}://${config.hostname}/`,
      timeout: config.timeout
    };
    
    axios.get(url, options).then(response => {
      if (response.status >= 400) { // on error
        reject(response);
      } else {
        // cache the object in browser memory
        if (config.cache) {
          localForage.setItem(`${CACHE_PREFIX}${url}`, response.data);
        }
        resolve(response.data);
      }
    }).catch(error => { reject(error)});
  });
}

function loadResource(config, url) {
  return new Promise((resolve, reject) => {
    localForage.ready()
      .then(() => {
        localForage.getItem(`${CACHE_PREFIX}${url}`)
          .then(value => {
            if (value === null) {
              loadUrl(config, url)
                .then(res => {resolve(res)})
                .catch(error => {reject(error)});
            } else {
              resolve(addCacheMark(value));
            }
          })
          .catch(error => {
            loadUrl(config, url)
              .then(res => {resolve(res)})
              .catch(error => {reject(error)});
          })
      })
      .catch(error => {
        loadUrl(config, url)
          .then(res => {resolve(res)})
          .catch(error => {reject(error)});
      });
  });
}

export { loadResource }