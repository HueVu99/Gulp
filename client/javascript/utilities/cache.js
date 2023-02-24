const requestCache = {}; // TODO: Support for local storage maybe?
const currentRequest = {};

const defaultCacheTime = 20;
const maxLifeTime = 120;

function getTimestamp() {
  return Math.floor(Date.now() / 1000);
}

function getFromCache(key, lifetime) {
  const cacheObject = requestCache[key];
  const currentTime = getTimestamp();
  if (cacheObject) {
    const isValid = lifetime
      ? cacheObject.timestamp + lifetime > currentTime
      : cacheObject.timestamp + maxLifeTime > currentTime;
    if (isValid) {
      cacheObject.lastAcces = currentTime;
      return cacheObject;
    }
    delete requestCache[key];
  }
  return null;
}

function setCache(key, data) {
  requestCache[key] = {
    timestamp: getTimestamp(),
    data,
    lastAcces: getTimestamp(),
  };
}

function sendRequest(func, key, ...args) {
  if (!currentRequest[key]) {
    currentRequest[key] = func(...args)
      .then((res) => {
        setCache(key, res);
        delete currentRequest[key];
        return res;
      })
      .catch((error) => {
        delete currentRequest[key];
        throw error;
      });
  }
  return currentRequest[key];
}

export function cacheWithTime(lifetime, key, func, ...args) {
  const cacheObject = getFromCache(key, lifetime);
  if (cacheObject) {
    return Promise.resolve(cacheObject.data);
  }
  return sendRequest(func, key, ...args);
}

export function cache(key, func, ...args) {
  return cacheWithTime(defaultCacheTime, key, func, ...args);
}

export function clearCacheItem(key) {
  delete requestCache[key];
}
